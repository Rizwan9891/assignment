import { useEffect, useState } from "react";
import api from "../api/axios";
import StatsCard from "../components/StatsCard";
import OrderTable from "../components/OrderTable";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [orders, setOrders] = useState([]);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const getStats = async () => {
        try {
            const res = await api.get("/orders/stats");
            setStats(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getOrders = async (currentPage = page) => {
        try {
            const res = await api.get("/orders", {
                params: {
                    page: currentPage,
                    limit: 10,
                    search,
                    status,
                },
            });

            setOrders(res.data.data);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getStats();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            getOrders(page);
        }, 500);

        return () => clearTimeout(timer);
    }, [page, search, status]);

    const handleSearch = () => {
        setPage(1);
        getOrders(1);
    };

    if (!stats) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h2 className="text-2xl font-semibold text-gray-500">
                    Loading Dashboard...
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-5">
                <div className="flex justify-between items-center mb-8">

                    <h1 className="text-4xl font-bold">
                        Telecaller Dashboard
                    </h1>

                    <Link
                        to="/create-order"
                        className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
                    >
                        + Create Order
                    </Link>

                </div>

                {/* Stats Cards */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    <StatsCard title="Orders" value={stats.totalOrders} />
                    <StatsCard
                        title="Revenue"
                        value={`₹ ${stats.totalRevenue.toLocaleString()}`}
                    />
                    <StatsCard
                        title="New"
                        value={
                            stats.statusBreakdown.find((x) => x._id === "NEW")?.count || 0
                        }
                    />
                    <StatsCard
                        title="Confirmed"
                        value={
                            stats.statusBreakdown.find((x) => x._id === "CONFIRMED")?.count ||
                            0
                        }
                    />
                    <StatsCard
                        title="Dispatched"
                        value={
                            stats.statusBreakdown.find((x) => x._id === "DISPATCHED")?.count ||
                            0
                        }
                    />
                    <StatsCard
                        title="Delivered"
                        value={
                            stats.statusBreakdown.find((x) => x._id === "DELIVERED")?.count ||
                            0
                        }
                    />
                    <StatsCard
                        title="Cancelled"
                        value={
                            stats.statusBreakdown.find((x) => x._id === "CANCELED")?.count ||
                            0
                        }
                    />
                    <StatsCard
                        title="RTO"
                        value={
                            stats.statusBreakdown.find((x) => x._id === "RTO")?.count || 0
                        }
                    />
                </div>

                {/* Search & Filter */}

                <div className="flex flex-wrap items-center gap-4 mt-10 mb-6">
                    <input
                        type="text"
                        placeholder="Search Customer / Phone"
                        value={search}
                        onChange={(e) => {
                            setPage(1);
                            setSearch(e.target.value);
                        }}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-80 bg-white"
                    />

                    <select
                        value={status}
                        onChange={(e) => {
                            setPage(1);
                            setStatus(e.target.value);
                        }}
                        className="border border-gray-300 rounded-lg px-4 py-2 bg-white"
                    >
                        <option value="">All Status</option>
                        <option value="NEW">NEW</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="DISPATCHED">DISPATCHED</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELED">CANCELED</option>
                        <option value="RTO">RTO</option>
                    </select>
                </div>

                {/* Orders Table */}

                <OrderTable orders={orders} />

                {/* Pagination */}

                <div className="flex justify-center items-center gap-4 mt-8">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((prev) => prev - 1)}
                        className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
                    >
                        Previous
                    </button>

                    <span className="font-semibold">
                        Page {page} of {totalPages}
                    </span>

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage((prev) => prev + 1)}
                        className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;