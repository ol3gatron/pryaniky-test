import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"
import TableComponent from "../components/TableComponent"
import { changeStatus, fetchDocs } from "../features/docsSlice"
import { useAppDispatch, useAppSelector } from "../redux/redux"
import Box from '@mui/material/Box';
import ModalDialog from "../components/ModalDialog"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Typography, Button, IconButton } from "@mui/material"
import ResponsiveAppBar from "../components/Header"

const Table = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const docs = useAppSelector(state => state.docsReducer.docs)
  const status = useAppSelector(state => state.docsReducer.status)

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
    } return () => {
      dispatch(changeStatus("loading"))
    }
  }, [])

  if (status === "loading") {
    return <Spinner />
  }

  return (
    <>
      <TableComponent data={docs} />
      <IconButton
        aria-label="add"
        color="primary"
        onClick={handleOpen}
        sx={{position: "fixed", right: 0, bottom: 0}}
      >
        <AddCircleIcon fontSize="large"/>
      </IconButton>
      <ModalDialog open={isOpen} handleClose={handleClose} />
    </>
  )
}
export default Table