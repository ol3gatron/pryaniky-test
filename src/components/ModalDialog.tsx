import { Dialog } from "@mui/material"
import Form from "./Form"

interface Props {
  open: boolean,
  data?: any,
  handleClose: () => void
}

const ModalDialog = ({ open, handleClose, data}: Props ) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <Form handleClose={handleClose} data={data}/>
    </Dialog>
  )
}
export default ModalDialog