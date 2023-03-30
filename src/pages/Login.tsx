import { Typography, Button, Container, TextField } from "@mui/material"
import { useState, ChangeEvent, SyntheticEvent } from "react"
import { useNavigate } from "react-router-dom"
import { LoginData, sendLoginData, setUser } from "../features/authSlice"
import { useAppDispatch } from "../redux/redux"

const Login = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const [formData, setFormData] = useState<LoginData>({
    username: "",
    password: "",
  })

  const [usernameError, setUsernameError] = useState<boolean>(false)
  const [passwordError, setPasswordError] = useState<boolean>(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()

    setUsernameError(false)
    setPasswordError(false)

    const {username, password} = formData
    if (username && password) {
      dispatch(sendLoginData(formData))
      dispatch(setUser(username))
      setTimeout(() => {
        navigate('/table')
      }, 1000)
    } else if (!username && !password) {
      setUsernameError(true)
      setPasswordError(true)
    } else if (!username) {
      setUsernameError(true)
    } else {
      setPasswordError(true)
    }
  }

  return (
    <Container maxWidth="sm">
      <Typography
        variant="h6"
        component="h2"
        color="textSecondary"
        gutterBottom
      >
        Вход
      </Typography>
      <form noValidate onSubmit={handleSubmit}>
        <TextField
            label="Имя пользователя"
            name="username"
            variant="outlined"
            color="secondary"
            required
            fullWidth
            error={usernameError}
            onChange={handleChange}
            value={formData.username}
            helperText={usernameError && "Введите имя пользователя"}
            sx={{marginTop: "20px", marginBottom: "20px", display: "block"}}
          />
          <TextField
            label="Пароль"
            name="password"
            variant="outlined"
            color="secondary"
            required
            fullWidth
            error={passwordError}
            onChange={handleChange}
            value={formData.password}
            helperText={passwordError && "Введите пароль"}
            autoComplete="off"
            type="password"
            sx={{marginTop: "20px", marginBottom: "20px", display: "block"}}
          />
          <div style={{display: "flex", justifyContent: "space-between"}}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Войти
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/table")}
          >
            Таблица
          </Button>
          </div>
      </form>
    </Container>
  )
}
export default Login