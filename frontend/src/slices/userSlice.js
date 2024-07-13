import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const users_url = "https://keyforge.onrender.com/api/users"

const initialState = {
    userInfo: localStorage.getItem('userInfoKeyForge')
        ? JSON.parse(localStorage.getItem('userInfoKeyForge'))
        : null,
    passwords: []
}

export const loginUser = createAsyncThunk("user/login", async (data) => {
    const response = await axios.post(`${users_url}/login`, data, {
        withCredentials: true
    });
    return response.data;
})

export const signup = createAsyncThunk("user/signup", async (data) => {
    const response = await axios.post(`${users_url}/signup`, data, {
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

export const getPasswords = createAsyncThunk("user/getPasswords", async () => {
    try {
        const response = await axios.get(`${users_url}/getPasswords`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
});

export const savePassword = createAsyncThunk("user/savePassword", async (data) => {
    const response = await axios.post(`${users_url}/savePassword`, data, {
        withCredentials: true
    });
    return response.data;
})

export const editPassword = createAsyncThunk("user/editPassword", async (data) => {
    try {
        const response = await axios.patch(`${users_url}/editPassword`, data, {
            withCredentials: true,
        });
        return response.data
    } catch (error) {
        console.log(error.message);
    }
});

export const deletePassword = createAsyncThunk("user/deletePassword", async (id) => {
    try {
        await axios.delete(`${users_url}/deletePassword`, {
            params: { id },
            withCredentials: true,
        });

        return id;
    } catch (error) {
        console.log(error.message);
    }
});

const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.userInfo = action.payload.token;
                localStorage.setItem("userInfoKeyForge", JSON.stringify(action.payload.token));
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.userInfo = null;
                localStorage.removeItem('userInfoKeyForge');
            })
            .addCase(getPasswords.fulfilled, (state, action) => {
                state.passwords = action.payload;
            })
            .addCase(savePassword.fulfilled, (state, action) => {
                state.passwords.push(action.payload)
            })
            .addCase(editPassword.fulfilled, (state, action) => {
                const index = state.passwords.findIndex(password => password.id === action.payload.id);
                if (index !== -1) {
                    const newPasswords = [...state.passwords];
                    newPasswords[index] = action.payload;
                    state.passwords = newPasswords;
                }
            })
            .addCase(deletePassword.fulfilled,(state,action)=>{
                const newPasswords = state.passwords.filter(ele => ele._id !== action.payload)
                state.passwords = newPasswords;
            })
    }
})


export default authSlice.reducer;