import api from "./axios";

export const getservice = async () => {
    const response = await api.get("/seed/serviceView");
    return response.data;
};