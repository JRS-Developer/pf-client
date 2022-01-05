import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Paper } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'Nombre', width: 130 },
  { field: 'lastName', headerName: 'Apellido', width: 130 },
  { field: 'fechaDeEntrega', headerName: 'fecha de entrega', width:130},
  { field: 'estado', headerName:'estado', width:130}

]

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', fechaDeEntrega: '28-12-21 17:20', estado:'pendiente'},
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', fechaDeEntrega: '28-12-21 17:20' , estado:'aprobado'},
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', fechaDeEntrega: '28-12-21 17:20', estado:'rechazado' },
  { id: 4, lastName: 'Stark', firstName: 'Arya', fechaDeEntrega: '28-12-21 17:20', estado:'aprobado' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', fechaDeEntrega: null , estado:'pendiente'},
  { id: 6, lastName: 'Melisandre', firstName: null, fechaDeEntrega: null, estado:'pendiente' },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', fechaDeEntrega: '28-12-21 17:20', estado:'pendiente' },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', fechaDeEntrega: '28-12-21 17:20', estado:'pendiente' },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', fechaDeEntrega: '28-12-21 17:20' , estado:'pendiente'},
]

export default function TablaEntregas({tareaId,setTareaId}) {

  const handleClick = () => setTareaId(null)

  return (
    <Box>
      <IconButton aria-label="delete" onClick={handleClick}>
                <ArrowBackIcon />
              </IconButton>
      <Box>
        <h3>{`Entregas`}</h3>
      </Box>
      <Paper elevation={24}>
        <Box sx={{ height: 'calc(100vh - 132px)', width: 1 }}>
          <DataGrid
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              border: 0,
              borderColor: 'primary.light',
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
              },
            }}
            rows={rows}
            columns={columns}
            pageSize={30}
            rowsPerPageOptions={[5]}
            checkboxSelection={false}
          />
        </Box>
      </Paper>
    </Box>
  )
}
