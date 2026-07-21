import api from "./axios";

export const getTelecallers = async () => {
    try {
        const { data } = await api.get("/telecallers");
        return data;
    } catch (err) {
        throw new Error(
            err.response?.data?.message || "Failed to fetch telecallers"
        );
    }
};