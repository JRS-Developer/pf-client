import UserForm from "./UserForm.jsx";
import Table from "../Table/Table.jsx";
import { useDispatch , useSelector } from "react-redux"
import { useEffect } from "react";
import { getUsers } from "../../actions/user/index.js";


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
  {
    field: 'email',
    headerName: 'Correo Electronico',
    width: 150,
    editable: true,
  },
];




// const rows = [
//   { id: 1, firstName: 'Bart', lastName: "Simpson" , role:"Estudiante",birthday:"1995-08-02",country:"USA", email: "asd@hotmail.com"},
//   { id: 2, firstName: 'Edna', lastName: "Krabappel" , role:"Profesor",birthday:"1978-02-19",country:"USA"},
//   { id: 3, firstName: 'Bob', lastName: "Patiño" , role:"Estudiante", birthday:"1971-12-16", country:"USA"},
//   { id: 4, firstName: 'Marge', lastName: "Simpson" , role:"Administrador", birthday:"1968-05-24", country:"USA"},
//   { id: 5, firstName: 'Homero', lastName: "Simpson" , role:"Super Usuario", birthday:"1965-10-11", country:"USA"},
//   { id: 6, firstName: 'Seymour', lastName: "Skinner" , role:"Administrador", birthday:"1960-10-30", country:"USA"},
// ];

// const data = {
//   columns, rows
// }

const form = UserForm


export default function UserIndex(){

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers())
  },[])

  const rows = useSelector(state => state.users)

  const data = {columns,rows:rows.users}
  console.log("usuarios",rows)


  return (
    <Table data={data} DialogForm={form} title="USUARIOS"/>
  )
}