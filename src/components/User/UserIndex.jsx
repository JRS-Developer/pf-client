import UserForm from "./UserForm.jsx";
import Table from "../Table/Table.jsx"


const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'firstName',
    headerName: 'Nombre',
    width: 300,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Apellido',
    width: 300,
    editable: true,
  },
  {
    field: 'role',
    headerName: 'Rol',
    width: 300,
    editable: true,
  },
  {
    field: 'birthday',
    headerName: 'Fecha de Nacimiento',
    width: 300,
    editable: true,
  },
  {
    field: 'country',
    headerName: 'País',
    width: 300,
    editable: true,
  },
];
const rows = [
  { id: 1, firstName: 'Bart', lastName: "Simpson" , role:"Estudiante",birthday:"1995-08-02",country:"USA"},
  { id: 2, firstName: 'Edna', lastName: "Krabappel" , role:"Profesor",birthday:"1978-02-19",country:"USA"},
  { id: 3, firstName: 'Bob', lastName: "Patiño" , role:"Estudiante", birthday:"1971-12-16", country:"USA"},
  { id: 4, firstName: 'Marge', lastName: "Simpson" , role:"Administrador", birthday:"1968-05-24", country:"USA"},
  { id: 5, firstName: 'Homero', lastName: "Simpson" , role:"Super Usuario", birthday:"1965-10-11", country:"USA"},
  { id: 6, firstName: 'Seymour', lastName: "Skinner" , role:"Administrador", birthday:"1960-10-30", country:"USA"},
];

const data = {
  columns, rows
}

const form = UserForm


export default function UserIndex(){

  return (
    <Table data={data} DialogForm={form} title="USUARIOS"/>
  )
}