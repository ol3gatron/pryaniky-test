import { useState, useEffect, ChangeEvent, SyntheticEvent } from "react"
import { Button, TextField } from "@mui/material"
import { addDoc, changeStatus, editDoc, Doc } from "../features/docsSlice"
import { useAppDispatch } from "../redux/redux"

interface Props {
  handleClose: () => void,
  data: Doc,
}

const Form = ({ handleClose, data }: Props) => {
  const dispatch = useAppDispatch()

  const event = new Date()

  const [formData, setFormData] = useState({
    documentStatus: "",
    employeeNumber: "",
    documentType: "",
    documentName: "",
    companySignatureName: "",
    employeeSignatureName: "",
    employeeSigDate: event.toISOString(),
    companySigDate: event.toISOString(),
  })

  const [mode, setMode] = useState("add")

  useEffect(() => {
    if (data && data.documentName.length > 0) {
      setMode("edit")
      setFormData(data)
    }
  }, [])

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    handleClose()

    if (mode === "add") {
      dispatch(changeStatus("loading"))
      dispatch(addDoc(formData))
    } else if (mode === "edit") {
      dispatch(changeStatus("loading"))
      dispatch(editDoc(formData))
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      style={{padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}
    >
      <TextField
        label="documentStatus"
        name="documentStatus"
        variant="filled"
        required
        fullWidth sx={{margin: "1rem", width: 300}}
        onChange={handleChange}
        value={formData.documentStatus}
      />
      <TextField
        label="employeeNumber"
        name="employeeNumber"
        variant="filled"
        required
        fullWidth
        sx={{margin: "1rem", width: 300}}
        onChange={handleChange}
        value={formData.employeeNumber}
      />
      <TextField
        label="documentType"
        name="documentType"
        variant="filled"
        required
        fullWidth
        sx={{margin: "1rem", width: 300}}
        onChange={handleChange}
        value={formData.documentType}
      />
      <TextField
        label="documentName"
        name="documentName"
        variant="filled"
        required
        fullWidth sx={{margin: "1rem", width: 300}}
        onChange={handleChange}
        value={formData.documentName}
      />
      <TextField
        label="companySignatureName"
        name="companySignatureName"
        variant="filled"
        required
        fullWidth
        sx={{margin: "1rem", width: 300}}
        onChange={handleChange}
        value={formData.companySignatureName}
      />
      <TextField
        label="employeeSignatureName"
        name="employeeSignatureName"
        variant="filled"
        required
        fullWidth sx={{margin: "1rem", width: 300}}
        onChange={handleChange}
        value={formData.employeeSignatureName}
      />
      <div>
        <Button
          variant="contained"
          color="secondary"
          sx={{margin: "1rem"}}
          onClick={handleClose}
        >
          Закрыть
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{margin: "1rem"}}
        >
          {mode === "edit" ? "Изменить" : "Добавить"}
        </Button>
      </div>
    </form>
  )
}
export default Form