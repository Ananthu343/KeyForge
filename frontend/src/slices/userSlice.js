import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const users_url = ""

const initialState = {
    userInfo: localStorage.getItem('userInfoKeyForge')
    ? JSON.parse(localStorage.getItem('userInfoKeyForge'))
    : null
}

export const loginUser = createAsyncThunk("user/login", async (data) => {
    const response = await axios.post(`${users_url}/login`, data, {
        withCredentials: true
    });
    return response.data;
})

export const logoutUser = createAsyncThunk("user/logout", async () => {
    const response = await axios.get(`${users_url}/logout`, {
        withCredentials: true
    });
    return response.status === 200;
})



const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfoKeyForge", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfoKeyForge');
        },
    },
})

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;