import api from "../api/axios";

const OrderTable = ({ orders }) => {
    const updateStatus = async (id, status) => {
        try {
            await api.patch(`/orders/${id}/status`, {
                status,
            });
            alert("Status Updated Successfully");
            window.location.reload();
        } catch (err) {
            console.log(err);
            alert("Something went wrong");
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-x-auto">

            <table className="w-full">

                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="px-4 py-3 text-left">Customer</th>
                        <th className="px-4 py-3 text-left">Phone</th>
                        <th className="px-4 py-3 text-left">Product</th>
                        <th className="px-4 py-3 text-left">City</th>
                        <th className="px-4 py-3 text-left">Telecaller</th>
                        <th className="px-4 py-3 text-right">Amount</th>
                        <th className="px-4 py-3 text-center">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr
                            key={order._id}
                            className="border-b hover:bg-gray-50"
                        >
                            <td className="px-4 py-3">
                                {order.customerName}
                            </td>
                            <td className="px-4 py-3">
                                {order.phone}
                            </td>
                            <td className="px-4 py-3">
                                {order.product}
                            </td>
                            <td className="px-4 py-3">
                                {order.city}
                            </td>
                            <td className="px-4 py-3">
                                {order.telecaller?.name}
                            </td>
                            <td className="px-4 py-3 text-right">
                                ₹ {order.amount}
                            </td>
                            <td className="px-4 py-3 text-center">
                                <select
                                    value={order.status}
                                    onChange={(e) =>
                                        updateStatus(order._id, e.target.value)
                                    }
                                    className="border rounded-md px-2 py-1"
                                >
                                    <option value="NEW">NEW</option>

                                    <option value="CONFIRMED">
                                        CONFIRMED
                                    </option>
                                    <option value="DISPATCHED">
                                        DISPATCHED
                                    </option>
                                    <option value="DELIVERED">
                                        DELIVERED
                                    </option>
                                    <option value="CANCELED">
                                        CANCELED
                                    </option>
                                    <option value="RTO">
                                        RTO
                                    </option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderTable;