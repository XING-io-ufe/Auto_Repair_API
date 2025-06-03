import api from "./axios";


export const signUpPhone = async ({ phone }) => {
    const response = await api.post("/auth/signup", {
        phone
    });
    return response.data;
};
export const signInPhone = async ({ phone }) => {
    const response = await api.post("/auth/signin", {
        phone
    });
    return response.data;
};
export const verifySignInOTP = async ({ phone, otp }) => {
    const response = await api.post("/auth/signin/verify", {
        phone,
        otp,
    });
    return response.data;
};
export const verifySignUpOTP = async ({ phone, otp }) => {
    const response = await api.post("/auth/signup/verify", {
        phone,
        otp,
    });
    return response.data;
};
export const checkToken = async ({ token }) => {
    const response = await api.get("/user/token", {
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
export const userUpdate = async ({ token, lastName, firstName, phone, email }) => {
    const response = await api.put("/user/update", {
        lastName, firstName, phone, email,
    }, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
export const phoneUpdate = async ({ token, newPhone }) => {
    const response = await api.put("/user/phoneUpdate", {
        newPhone
    }, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};


