import api from "./axios";

export const getmanufacturer = async () => {
    const response = await api.get("/seed/manufacturerView");
    return response.data;
};