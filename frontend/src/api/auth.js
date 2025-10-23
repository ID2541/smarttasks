import { api, setAuthToken } from "./api";

export const loginUser = async (username, password) => {
    const res = await api.post("/token/", { username, password });
    setAuthToken(res.data.access);
    return res.data;
};

export const registerUser = async (username, password) => {
    const res = await api.post("/register/", { username, password });
    setAuthToken(res.data.access);
    return res.data;
};
