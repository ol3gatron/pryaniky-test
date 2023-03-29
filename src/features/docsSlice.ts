import { createSlice, createAsyncThunk, nanoid, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { HOST } from "./authSlice";
import { ToastContainer, toast } from 'react-toastify';

const token = localStorage.getItem("token")?.slice(1, 28)

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
  const res = await axios.post(`${HOST}/ru/data/v3/testmethods/docs/userdocs/create`, doc, {headers : {"x-auth": token}})

  return res.data
})

export const deleteDoc = createAsyncThunk("docs/deleteDoc", async (doc: Doc) => {
  try {
    const res = await axios.delete(`${HOST}/ru/data/v3/testmethods/docs/userdocs/delete/${doc.id}`, {headers: {"x-auth": "supersecrettoken_for_user13"}})

    return res.data
  } catch (error) {
    return error
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
    },
    docDeleted: (state, action) => {
      console.log(action.payload)

      const docs = state.docs.filter((doc) => doc.id !== action.payload.id)
      state.docs = docs
    }
  },
  extraReducers(builder) {
    builder
    .addCase(fetchDocs.fulfilled, (state, action) => {
      state.docs = action.payload.data
    })
    .addCase(addDoc.fulfilled, (state, action) => {
      console.log(action.payload.data)

      state.docs.push(action.payload.data)
    })
    .addCase(deleteDoc.fulfilled, (state, action) => {
      console.log(action.payload.data)

    })
  },
})

export default docsSlice.reducer

export const { docDeleted } = docsSlice.actions