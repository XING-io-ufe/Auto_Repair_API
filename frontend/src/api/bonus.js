import api from "./axios";

export const getUserBonus = async (token) => {
    const response = await api.get("/user/bonus", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.data?.[0]?.Bonus_point;
};