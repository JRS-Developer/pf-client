import UserForm from './UserForm.jsx'
import Table from '../Table/Table.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {
  getUsers as listUsers,
  getDataById,
  modifiedUser,
} from '../../actions/user'

const columns = [
  { field: 'id', headerName: 'ID', width: 300 },
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
    field: 'userName',
    headerName: 'Nombre de usuario',
    width: 120,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Correo Electronico',
    width: 150,
    editable: true,
  },
  {
    field: 'password',
    headerName: 'Contraseña',
    width: 150,
    editable: true,
  },
  {
    field: 'role',
    headerName: 'Rol',
    width: 120,
    editable: true,
  },
  {
    field: 'birthdate',
    headerName: 'Fecha de Nacimiento',
    width: 170,
    editable: true,
  },
  {
    field: 'country',
    headerName: 'País',
    width: 120,
    editable: true,
  },
]

const form = UserForm

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
