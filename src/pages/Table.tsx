import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"
import TableComponent from "../components/TableComponent"
import { fetchDocs, Doc } from "../features/docsSlice"
import { useAppDispatch, useAppSelector } from "../redux/redux"
import Box from '@mui/material/Box';
import { Button } from "@mui/material"
import ModalDialog from "../components/ModalDialog"

const Table = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const docs: Doc[] = useAppSelector(state => state.docsReducer)

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

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
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
      >
        Добавить
      </Button>
      <ModalDialog open={isOpen} handleClose={handleClose} />
    </Box>
  )
}
export default Table