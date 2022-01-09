import TeacherForm from './TeacherForm/TeacherForm';
import Table from '../Table/Table.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getTeachers as listTeachers, getDataById, modifiedTeacher } from "../../actions/teacher";

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
      return format(new Date(params.value), 'dd/MM/yyyy')
    }
  },
  {
    field: 'country',
    headerName: 'País',
    width: 120,
    editable: true,
  },
]
const form = TeacherForm

export default function TeacherIndex() {
  const dispatch = useDispatch()

  const getTeachersState = useSelector(state => state.teacherReducer)
  const { teachers } = getTeachersState;

  const data = { columns, rows: teachers }

  useEffect(() => {
    const role = {role_id: '606c0802-5332-4531-9189-eac84e6fcceb'};
    dispatch(listTeachers(role))
  }, [dispatch])

  return (
    <Table
      data={data}
      DialogForm={form}
      title="TEACHERS"
      getDataById={getDataById}
      getActions={getTeachersState}
      modifiedAction={modifiedTeacher}
      listData={listTeachers}
    />
  )
}
