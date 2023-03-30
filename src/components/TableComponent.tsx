import Table from '@mui/material/Table';
import { useState } from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material/';
import ModalDialog from "../components/ModalDialog"
import { changeStatus, deleteDoc, Doc, docDeleted } from "../features/docsSlice"
import { useAppDispatch, useAppSelector } from '../redux/redux';

interface Props {
  data: Doc[]
}

const TableComponent = ({data}: Props) => {
  const dispatch = useAppDispatch()
  const documents = useAppSelector(state => state.docsReducer.docs)

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [document, setDocument] = useState<any>()

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleDelete = (doc: Doc) => {
    dispatch(changeStatus("loading"))
    dispatch(deleteDoc(doc))
    dispatch(docDeleted(doc))
  }

  const getDocument = (doc: Doc) => {
    const document = documents.find((docu) => docu.id == doc.id)
    setDocument(document)
  }

  const handleEdit = (doc: Doc) => {
    getDocument(doc)
    setIsOpen(true)
  }

  return (
    <TableContainer component={Paper} >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">id</TableCell>
            <TableCell align="center">documentStatus</TableCell>
            <TableCell align="center">employeeNumber</TableCell>
            <TableCell align="center">documentType</TableCell>
            <TableCell align="center">documentName</TableCell>
            <TableCell align="center">companySignatureName</TableCell>
            <TableCell align="center">employeeSignatureName</TableCell>
            <TableCell align="center">employeeSigDate</TableCell>
            <TableCell align="center">companySigDate</TableCell>
            <TableCell align="center">actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((doc: Doc) => (
            <TableRow
              key={doc.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{doc.id}</TableCell>
              <TableCell align="center">{doc.documentStatus}</TableCell>
              <TableCell align="center">{doc.employeeNumber}</TableCell>
              <TableCell align="center">{doc.documentType}</TableCell>
              <TableCell align="center">{doc.documentName}</TableCell>
              <TableCell align="center">{doc.companySignatureName}</TableCell>
              <TableCell align="center">{doc.employeeSignatureName}</TableCell>
              <TableCell align="center">{doc.employeeSigDate}</TableCell>
              <TableCell align="center">{doc.companySigDate}</TableCell>
              <TableCell align="center">
                <EditIcon
                  fontSize='small'
                  sx={{cursor: "pointer"}}
                  color='info'
                  onClick={() => handleEdit(doc)}
                />
                <DeleteIcon
                  fontSize='small'
                  sx={{cursor: "pointer"}}
                  color="error"
                  onClick={() => handleDelete(doc)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ModalDialog open={isOpen} handleClose={handleClose} data={document}/>
    </TableContainer>
  )
}
export default TableComponent