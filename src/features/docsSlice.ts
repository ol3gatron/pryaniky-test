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
  try {
    const res = await axios.get(`${HOST}/ru/data/v3/testmethods/docs/userdocs/get`,
    {headers: {
      "x-auth": token
      }
    })

    return res.data
  } catch (error) {
    console.log(error)
  }
})

export const addDoc = createAsyncThunk("docs/addDoc", async (doc: Doc) => {
  try {
    const res = await axios.post(`${HOST}/ru/data/v3/testmethods/docs/userdocs/create`, doc,
    {headers: {
      "x-auth": localStorage.getItem("token")?.slice(1, 28)
      }
    })

    return res.data
  } catch (error) {
    console.log(error)
  }
})

export const deleteDoc = createAsyncThunk("docs/deleteDoc", async (doc: Doc) => {
  try {
    const res = await axios.delete(`${HOST}/ru/data/v3/testmethods/docs/userdocs/delete/${doc.id}`,
    {headers: {
      "x-auth": token
      }
    })

    return res.data
  } catch (error) {
    console.log(error)
  }

})

export const editDoc = createAsyncThunk("docs/editDoc", async (doc: Doc) => {
  try {
    const res = await axios.post(`${HOST}/ru/data/v3/testmethods/docs/userdocs/set/${doc.id}`, doc,
    {headers: {
      "x-auth": token
      }
    })

    return res.data.data
  } catch (error) {
    console.log(error)
  }
})

interface DocsState {
  docs: Doc[],
  status: "loading" | "ready"
}

const initialState: DocsState = {
  docs: [],
  status: "loading"
}

export const docsSlice = createSlice({
  name: "docs",
  initialState,
  reducers: {
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
    },
    changeStatus: (state, action) => {
      state.status = action.payload
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
      state.status = "ready"
    })
    .addCase(deleteDoc.fulfilled, (state, action) => {
      state.status = "ready"
    })
    .addCase(editDoc.fulfilled, (state, action) => {
      const { id } = action.payload
      action.payload.employeeSigDate = new Date().toISOString()
      action.payload.companySigDate = new Date().toISOString()

      const docs = state.docs.filter((doc) => doc.id !== id)
      state.docs = [...docs, action.payload]
      state.status = "ready"
    })
  },
})

export default docsSlice.reducer

export const { docEdit, docDeleted, changeStatus } = docsSlice.actions