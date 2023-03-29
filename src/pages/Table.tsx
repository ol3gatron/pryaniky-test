import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"
import TableComponent from "../components/TableComponent"
import { fetchDocs, Doc } from "../features/docsSlice"
import { useAppDispatch, useAppSelector } from "../redux/redux"
import Box from '@mui/material/Box';
import { Button } from "@mui/material"
import ModalDialog from "../components/ModalDialog"
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Table = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const docs = useAppSelector(state => state.docsReducer.docs)

  console.log(docs)

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

      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <Box>
      <TableComponent data={docs} />
      {/* <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
      >
        Добавить
      </Button> */}
      <IconButton
        aria-label="add"
        color="primary"
        onClick={handleOpen}
        sx={{position: "fixed", right: 0, bottom: 0}}
      >
        <AddCircleIcon fontSize="large"/>
      </IconButton>
      <ModalDialog open={isOpen} handleClose={handleClose} />
    </Box>
  )
}
export default Table