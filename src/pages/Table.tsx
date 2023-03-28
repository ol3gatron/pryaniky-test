import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"
import TableComponent from "../components/TableComponent"
import { fetchDocs, Doc } from "../features/docsSlice"
import { useAppDispatch, useAppSelector } from "../redux/redux"
import Box from '@mui/material/Box';

const Table = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(true)

  const docs: Doc[] = useAppSelector(state => state.docsReducer)



  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/")
    } else {
      const token = localStorage.getItem("token")?.slice(1, 28)
      dispatch(fetchDocs(token))

      setIsLoading(false)
    }
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <Box>
      <TableComponent data={docs} />
    </Box>
  )
}
export default Table