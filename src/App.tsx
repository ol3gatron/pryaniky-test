import './App.css'
import Login from './pages/Login'
import Table from './pages/Table'
import {Route, Routes} from "react-router-dom"
import ResponsiveAppBar from './components/Header'
import { useAppSelector } from './redux/redux'

function App() {
  const status = useAppSelector(state => state.docsReducer.status)

  return (
    <>
      {status === "ready" && <ResponsiveAppBar />}
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/table' element={<Table />}/>
      </Routes>
    </>
  )
}

export default App
