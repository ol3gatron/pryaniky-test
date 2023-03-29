import { Typography, Button, Container, TextField, RadioGroup, Radio, FormControlLabel, FormControl, FormLabel } from "@mui/material"
import { useState } from "react"
import { addDoc } from "../features/docsSlice"
import { useAppDispatch } from "../redux/redux"

interface Props {
  handleClose: () => void
}

const Form = ({ handleClose }: Props) => {
  const dispatch = useAppDispatch()

  const event = new Date()
  const token = localStorage.getItem("token")?.slice(1, 28)

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

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    console.log(formData)
    handleClose()
    dispatch(addDoc(formData))
  }

  const handleChange = (e: any) => {
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
      {/* <TextField
        label="employeeSigDate"
        name="employeeSigDate"
        variant="filled"
        required
        fullWidth
        sx={{margin: "1rem", width: 300}}
      />
      <TextField
        label="companySigDate"
        name="companySigDate"
        variant="filled"
        required
        fullWidth sx={{margin: "1rem", width: 300}}
      /> */}
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
          Добавить
        </Button>
      </div>
    </form>
  )
}
export default Form