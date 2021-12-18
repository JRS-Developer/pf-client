import NotasProfesForm from './NotasProfesForm.jsx'
import Table from '../Table/Table.jsx'
import { TableHead, TableRow, TableCell } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {
  getUsers as listUsers,
  getDataById,
  modifiedUser,
} from '../../actions/user'
import {format} from 'date-fns'
import { TableContainer } from '@mui/material'

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

const form = NotasProfesForm

export default function UserIndex() {
  const dispatch = useDispatch()

  const getUsers = useSelector((state) => state.usersReducer)

  const data = { columns, rows: getUsers.users }

  useEffect(() => {
    dispatch(listUsers())
  }, [])

  return (
    
    <Table
      data={data}
      DialogForm={form}
      title="USUARIOS"
      getDataById={getDataById}
      getActions={getUsers}
      modifiedAction={modifiedUser}
      listData={listUsers}
    />
    
  )
}
