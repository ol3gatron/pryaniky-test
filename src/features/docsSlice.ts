import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { HOST } from "./authSlice";

export interface Doc {
  id: string,
  documentStatus: string,
  employeeNumber: string,
  documentType: string,
  documentName: string,
  companySignatureName: string,
  employeeSignatureName: string,
  employeeSigDate: string,
  companySigDate: string,
}

export const fetchDocs = createAsyncThunk("docs/fetchDocs", async (token: any) => {
  try {
    const res = await axios.get(`${HOST}/ru/data/v3/testmethods/docs/userdocs/get`,
    {headers: {
      "x-auth": token
    }})
    return res.data
  } catch (error) {
    // return console.log(error)
  }
})

export const docsSlice = createSlice({
  name: "docs",
  initialState: [],
  reducers: {

  },
  extraReducers(builder) {
    builder.addCase(fetchDocs.fulfilled, (state, action) => {
      // state.push(action.payload.data)
      return action.payload.data
    })
  },
})

export default docsSlice.reducer