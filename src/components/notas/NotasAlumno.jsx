import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'name', label: 'Materia', minWidth: 170 },
  { id: 'code', label: 'Check 1', minWidth: 100 },
  {
    id: 'population',
    label: 'Check 2',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Check 3',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'promedio',
    label: 'Promedio',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const promedio = 10 / 2;
  return { name, code, population, size, promedio };
}

const rows = [
  createData('Biologia', 10, 9, 10, 9),
  createData('Matematicas', 10, 9, 10, 9),
  createData('Educacion Fisica', 10, 9, 10, 9),
  createData('Historia', 10, 9, 10, 9),
  createData('Ingles', 10, 9, 10, 9),
  createData('Quimica', 10, 9, 10, 9),
  createData('Fisica', 10, 9, 10, 9),
  createData('Ireland', 10, 9, 10, 9),
  createData('Mexico', 10, 9, 10, 9),
  createData('Japan', 10, 9, 10, 9),
  createData('France', 10, 9, 10, 9),
  createData('United Kingdom', 10, 9, 10, 9),
  createData('Russia', 10, 9, 10, 9),
  createData('Nigeria', 10, 9, 10, 9),
  createData('Brazil', 10, 9, 10, 9),
  createData('Brazil', 10, 9, 10, 9),
  createData('Brazil', 10, 9, 10, 9),
  createData('Brazil', 10, 9, 10, 9),
  createData('Brazil', 10, 9, 10, 9),
  createData('Brazil', 10, 9, 10, 9),
  createData('Brazil', 10, 9, 10, 9),
  createData('Brazil', 10, 9, 10, 9),
  createData('Brazil', 10, 9, 10, 9),
];

export default function NotasAlumnos() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={`m${index}`}>
                    {columns.map((column, i) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={`n${i}`} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      
    </Paper>
  );
}