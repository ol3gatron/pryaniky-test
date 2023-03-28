import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"

const Table = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/")
    } else {
      setIsLoading(false)
    }
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>Table</div>
  )
}
export default Table