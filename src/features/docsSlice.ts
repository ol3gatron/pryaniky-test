import { createSlice, createAsyncThunk, nanoid, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { HOST } from "./authSlice";

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
  docs: Doc[],
  status: "loading" | "ready"
}

const event = new Date()

const initialState: DocsState = {
  docs: [
    {
      id: nanoid(),
      documentStatus: "ready",
      employeeNumber: "hired",
      documentType: "decree",
      documentName: "yeah",
      companySignatureName: "pryaniky",
      employeeSignatureName: "oleg",
      employeeSigDate: event.toISOString(),
      companySigDate: event.toISOString(),
    },
    {
      id: nanoid(),
      documentStatus: "ready",
      employeeNumber: "hired",
      documentType: "decree",
      documentName: "yeah",
      companySignatureName: "pryaniky",
      employeeSignatureName: "oleg",
      employeeSigDate: event.toISOString(),
      companySigDate: event.toISOString(),
    },
    {
      id: nanoid(),
      documentStatus: "ready",
      employeeNumber: "hired",
      documentType: "decree",
      documentName: "yeah",
      companySignatureName: "pryaniky",
      employeeSignatureName: "oleg",
      employeeSigDate: event.toISOString(),
      companySigDate: event.toISOString(),
    },
    {
      id: nanoid(),
      documentStatus: "ready",
      employeeNumber: "hired",
      documentType: "decree",
      documentName: "yeah",
      companySignatureName: "pryaniky",
      employeeSignatureName: "oleg",
      employeeSigDate: event.toISOString(),
      companySigDate: event.toISOString(),
    },
    {
      id: nanoid(),
      documentStatus: "ready",
      employeeNumber: "hired",
      documentType: "decree",
      documentName: "yeah",
      companySignatureName: "pryaniky",
      employeeSignatureName: "oleg",
      employeeSigDate: event.toISOString(),
      companySigDate: event.toISOString(),
    },
    {
      id: nanoid(),
      documentStatus: "ready",
      employeeNumber: "hired",
      documentType: "decree",
      documentName: "yeah",
      companySignatureName: "pryaniky",
      employeeSignatureName: "oleg",
      employeeSigDate: event.toISOString(),
      companySigDate: event.toISOString(),
    },
  ],
  status: "ready"
}

export const docsSlice = createSlice({
  name: "docs",
  initialState,
  reducers: {
    docAdded: (state, action) => {
      action.payload.id = nanoid()
      state.docs.push(action.payload)
    },
    docDeleted: (state, action) => {
      const docs = state.docs.filter((doc) => doc.id !== action.payload.id)
      state.docs = docs
    },
    docEdit: (state, action) => {
      const { id } = action.payload
      action.payload.employeeSigDate = new Date().toISOString()
      action.payload.companySigDate = new Date().toISOString()

      const docs = state.docs.filter((doc) => doc.id !== id)
      console.log(action.payload)
      state.docs = [...docs, action.payload]
    }
  },
  extraReducers(builder) {
    builder
    .addCase(fetchDocs.fulfilled, (state, action) => {
      state.docs = action.payload.data
      state.status = "ready"
    })
    .addCase(addDoc.fulfilled, (state, action) => {
      state.docs.push(action.payload.data)
    })
    .addCase(deleteDoc.fulfilled, (state, action) => {
    })
  },
})

export default docsSlice.reducer

export const { docAdded, docEdit, docDeleted } = docsSlice.actions