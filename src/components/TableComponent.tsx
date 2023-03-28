import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Doc } from "../features/docsSlice"

const TableComponent = (data: any) => {
  console.log(data)

  return (
    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
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
          </TableRow>
        </TableHead>
        <TableBody>
          {data.data.map((doc: Doc) => (
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default TableComponent