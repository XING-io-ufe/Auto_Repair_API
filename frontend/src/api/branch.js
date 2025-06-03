import api from "./axios";

export const getbranch = async () => {
    const response = await api.get("/seed/branchView");
    return response.data;
};