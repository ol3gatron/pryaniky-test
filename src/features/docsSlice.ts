import { createSlice, createAsyncThunk, nanoid, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { HOST } from "./authSlice";
import { ToastContainer, toast } from 'react-toastify';

export interface Doc {
  id?: string,
  documentStatus: string,
  employeeNumber: string,
  documentType: string,
  documentName: string,
  companySignatureName: string,
  employeeSignatureName: string,
  employeeSigDate: string,
  companySigDate: string,
}

export const fetchDocs = createAsyncThunk("docs/fetchDocs", async (token: string | undefined) => {
  const res = await axios.get(`${HOST}/ru/data/v3/testmethods/docs/userdocs/get`,
    {headers: {
      "x-auth": token
    }})
    return res.data
})

export const addDoc = createAsyncThunk("docs/addDoc", async (doc: Doc) => {
  try {
    const res = await axios.post(`${HOST}/ru/data/v3/testmethods/docs/userdocs/create`, doc, {headers : {"x-auth": "supersecrettoken_for_user13"}})
    return res.data
  } catch (error) {

  }
})

interface DocsState {
  docs: Doc[]
}

const initialState: DocsState = {
  docs: []
}

export const docsSlice = createSlice({
  name: "docs",
  initialState,
  reducers: {
    docAdded: (state, action) => {
      state.docs.push(action.payload.data)
    }
  },
  extraReducers(builder) {
    builder
    .addCase(fetchDocs.fulfilled, (state, action) => {
      // return action.payload.data

      state.docs = action.payload.data
    })
    .addCase(addDoc.fulfilled, (state, action) => {
      action.payload.id = nanoid()

      state.docs.push(action.payload.data)
      console.log(state.docs)
    })
  },
})

export default docsSlice.reducer