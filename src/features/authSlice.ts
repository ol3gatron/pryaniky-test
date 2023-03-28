import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface LoginData {
  username: string,
  password: string,
}

export interface InitialState {
  token: "",
}

const HOST = "https://test.v5.pryaniky.com"

const initialState: InitialState = {
  token: "",
}

export const sendLoginData = createAsyncThunk("auth/sendLoginData", async (loginData: LoginData) => {
  try {
    const res = await axios.post(`${HOST}/ru/data/v3/testmethods/docs/login`, loginData,
    {headers: {
      "Content-Type": "application/json"
    }})
    return res.data
  } catch (error) {
    // return console.log(error)
  }
})

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(sendLoginData.fulfilled, (state, action) => {
      localStorage.setItem("token", JSON.stringify(action.payload.data.token))
    })
  }
})

export default authSlice.reducer