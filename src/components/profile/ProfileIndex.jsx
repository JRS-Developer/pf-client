import ProfileForm from './ProfileForm'
import Table from '../Table/Table.jsx'

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'name',
    headerName: 'Roles',
    width: 300,
    editable: true,
  },
]
const rows = [
  { id: 1, name: 'Super Administrador' },
  { id: 2, name: 'Administrador' },
  { id: 3, name: 'Profesor' },
  { id: 4, name: 'Alumno' },
  { id: 5, name: 'Administrativo' },
]

const data = {
  columns,
  rows,
}

const form = ProfileForm

export default function ProfileIndex() {
  return <Table data={data} DialogForm={form} title="ROLES" />
}