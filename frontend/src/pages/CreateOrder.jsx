import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const CreateOrder = () => {
    const navigate = useNavigate();
    const [telecallers, setTelecallers] = useState([]);

    const [form, setForm] = useState({
        customerName: "",
        phone: "",
        product: "",
        quantity: "",
        amount: "",
        city: "",
        telecaller: "",
    });

    const getTelecallers = async () => {
        try {
            const res = await api.get("/telecallers");
            setTelecallers(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getTelecallers();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.phone.length !== 10) {
            return alert("Phone number must be exactly 10 digits");
        }
        try {
            await api.post("/orders", {
                ...form,
                status: "NEW",
            });

            alert("Order Created Successfully");
            navigate("/");
        } catch (err) {
            alert(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">

            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow">

                <h1 className="text-3xl font-bold mb-8">
                    Create Order
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <input
                        name="customerName"
                        placeholder="Customer Name"
                        value={form.customerName}
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        value={form.phone}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");

                            if (value.length <= 10) {
                                setForm({
                                    ...form,
                                    phone: value,
                                });
                            }
                        }}
                        className="w-full border p-3 rounded"
                        required
                    />

                    <input
                        name="product"
                        placeholder="Product"
                        value={form.product}
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                        required
                    />
                    <input
                        type="number"
                        name="quantity"
                        placeholder="Quantity"
                        value={form.quantity}
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                        required
                    />
                    <input
                        type="number"
                        name="amount"
                        placeholder="Amount"
                        value={form.amount}
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                        required
                    />
                    <input
                        name="city"
                        placeholder="City"
                        value={form.city}
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                        required
                    />

                    <select
                        name="telecaller"
                        value={form.telecaller}
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                        required
                    >
                        <option value="">Select Telecaller</option>

                        {telecallers.map((item) => (
                            <option
                                key={item._id}
                                value={item._id}
                            >
                                {item.name}
                            </option>
                        ))}
                    </select>

                    <button
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                    >
                        Create Order
                    </button>

                </form>

            </div>

        </div>
    );
};

export default CreateOrder;