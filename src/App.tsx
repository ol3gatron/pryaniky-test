import './App.css'
import Login from './pages/Login'
import Table from './pages/Table'
import {Route, Routes} from "react-router-dom"

function App() {
  return (
    <div className='container'>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/table' element={<Table />}/>
      </Routes>
    </div>
  )
}

export default App
