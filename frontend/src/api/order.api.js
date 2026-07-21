import api from "./axios";

export const getOrders = async (params) => {
    try {
        const { data } = await api.get("/orders", { params });
        return data;
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to fetch orders");
    }
};

export const getStats = async () => {
    try {
        const { data } = await api.get("/orders/stats");
        return data;
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to fetch stats");
    }
};

export const createOrder = async (payload) => {
    try {
        const { data } = await api.post("/orders", payload);
        return data;
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to create order");
    }
};

export const updateOrderStatus = async (id, status) => {
    try {
        const { data } = await api.patch(`/orders/${id}/status`, {
            status,
        });
        return data;
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to update status");
    }
};