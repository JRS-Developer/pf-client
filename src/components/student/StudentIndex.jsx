import StudentForm from './StudentForm.jsx'
import Table from '../Table/Table.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getStudents as listStudents, getDataById, modifiedStudent } from "../../actions/student";

import {format} from 'date-fns'

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
    headerName: 'Correo Electrónico',
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
    }
  },
  {
    field: 'country',
    headerName: 'País',
    width: 120,
    editable: true,
  },
]
const form = StudentForm

export default function StudentIndex() {
  const dispatch = useDispatch()

  const getStudentsState = useSelector(state => state.studentReducer)
  const { /* loading, error, message, */ students } = getStudentsState;

  const data = { columns, rows: students }

  useEffect(() => {
    const role = {role_id: '5d3709ba-3a27-48cc-8a75-256338684cee'};
    dispatch(listStudents(role))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Table
      data={data}
      DialogForm={form}
      title="ESTUDIANTES"
      getDataById={getDataById}
      getActions={getStudentsState}
      modifiedAction={modifiedStudent}
      listData={listStudents}
    />
  )
}
