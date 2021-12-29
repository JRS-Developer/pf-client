import NotasProfesForm from './NotasProfesForm.jsx'
import Table from '../Table/Table.jsx'
// import { TableHead, TableRow, TableCell } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {
  getUsers as listUsers,
  getDataById,
  modifiedUser,
} from '../../actions/user'
// import {format} from 'date-fns'
// import { TableContainer } from '@mui/material'

const columns = [
  
  {
    field: 'firstName',
    headerName: 'Nombre',
    width: 120,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Apellido',
    width: 120,
    editable: true,
  },
  
  {
    field: 'cp1',
    headerName: 'CP 1',
    width: 90,
    editable: true,
  },
  {
    field: 'cp2',
    headerName: 'CP 2',
    width: 90,
    editable: true,
  },
  {
    field: 'cp3',
    headerName: 'CP 3',
    width: 90,
    editable: true,
  },
  {
    field: 'cp4',
    headerName: 'CP 4',
    width: 90,
    editable: true,
  },
  {
    field: 'cp5',
    headerName: 'CP 5',
    width: 90,
    editable: true,
  },
  {
    field: 'cp6',
    headerName: 'CP 6',
    width: 90,
    editable: true,
  },
  {
    field: 'cp7',
    headerName: 'CP 7',
    width: 90,
    editable: true,
  },
  {
    field: 'cp8',
    headerName: 'CP 8',
    width: 90,
    editable: true,
  },
  {
    field: 'cp9',
    headerName: 'CP 9',
    width: 90,
    editable: true,
  },
]
const rows = [{
  id: 'ab11729b-d0f1-4976-821d-8a30c3c178e8',
  firstName:"Juan",
  lastName:"Daniele",
  cp1:10,
  cp2:10,
  cp3:4,
  cp4:10,
  cp5:10,
  cp6:"-",
  cp7:10,
  cp8:10,
  cp9:"-",
},
{
  id: 'ab11729b-d0f1-4976-821d-8a30c3c178e7',
  firstName:"Lean",
  lastName:"Villafuerte",
  cp1:10,
  cp2:10,
  cp3:4,
  cp4:10,
  cp5:10,
  cp6:"-",
  cp7:10,
  cp8:10,
  cp9:"-",
},
{
  id: '32c00bdf-a19f-48b1-bc5c-de123567c18a',
  firstName:"Edwin",
  lastName:"Arias",
  cp1:10,
  cp2:10,
  cp3:"-",
  cp4:10,
  cp5:10,
  cp6:"-",
  cp7:10,
  cp8:10,
  cp9:"-",

}];

const form = NotasProfesForm

export default function UserIndex() {
  const dispatch = useDispatch()

  const getUsers = useSelector((state) => state.usersReducer)

  const data = { columns, rows: rows }

  useEffect(() => {
    dispatch(listUsers())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    
    <Table
      data={data}
      DialogForm={form}
      title="Notas"
      getDataById={getDataById}
      getActions={getUsers}
      modifiedAction={modifiedUser}
      listData={listUsers}
    />
    
  )
}
