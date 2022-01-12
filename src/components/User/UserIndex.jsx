import UserForm from './UserForm.jsx'
import Table from '../Table/Table.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {
  getUsers as listUsers,
  getDataById,
  modifiedUser,
} from '../../actions/user'
import { format } from 'date-fns'

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
    // Con esto obtengo el nombre del role
    valueGetter: (params) => {
      const role = params.row.role
      if (role?.name) return role.name

      return
    },
  },
  {
    field: 'birthdate',
    headerName: 'Fecha de Nacimiento',
    width: 170,
    editable: true,
    valueFormatter: (params) => {
      return format(new Date(params.value), 'dd/mm/yyyy')
    },
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      loading={getUsers.loading}
    />
  )
}
