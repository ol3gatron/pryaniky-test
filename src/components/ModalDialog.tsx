import { Dialog } from "@mui/material"
import Form from "./Form"

interface Props {
  open: boolean,
  handleClose: () => void
}

const ModalDialog = ({ open, handleClose}: Props ) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <Form handleClose={handleClose}/>
    </Dialog>
  )
}
export default ModalDialog