import api from "./axios";

export const getcar = async () => {
    const response = await api.get("/seed/carView");
    return response.data;
};
export const addedcar = async ({ userId, manufacturer, brand, year, plate, token }) => {
    const response = await api.post(
        "/user/addedCar",
        { userId, manufacturer, brand, year, plate },
        {
            headers: {
                authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};