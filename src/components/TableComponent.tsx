import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material/';

import { deleteDoc, Doc, docDeleted } from "../features/docsSlice"
import { useAppDispatch } from '../redux/redux';

interface Props {
  data: Doc[]
}


const TableComponent = ({data}: Props) => {
  const dispatch = useAppDispatch()

  const handleDelete = (doc: Doc) => {
    console.log(doc.id)

    dispatch(deleteDoc(doc))
    dispatch(docDeleted(doc))
  }

  return (
    <TableContainer component={Paper}>
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
                <EditIcon onClick={() => console.log(doc)}/>
                <DeleteIcon onClick={() => handleDelete(doc)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default TableComponent