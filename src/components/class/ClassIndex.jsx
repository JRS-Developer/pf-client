import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import ClassForm from "./ClassForm";
import Table from "../Table/Table"

//importamos los métodos
import { getClases as listClass, getDataById, modifiedClase } from "../../actions/clase";

const columns = [
  { field: 'id', headerName: 'ID', width: 350 },
  { field: 'name', headerName: 'Name', width: 300},
  { field: 'school', headerName: 'School', width: 300},
  { field: 'status', headerName: 'Status Clase', width: 300},

];

const form = ClassForm

export default function ClassIndex() {
  const dispatch = useDispatch();

  const getStatusReducer = useSelector(state => state.clasesReducer);
  const { clases, loading, error } = getStatusReducer;

  const data = {
    columns,
    rows: clases
  }

  useEffect(() => {
    dispatch(listClass())
  }, [])

  return (
    <>
      { <Table
        data={data}
        DialogForm={form}
        title="CLASES"
        getDataById={getDataById}
        getActions={getStatusReducer}
        modifiedAction={modifiedClase}
        listData={listClass}
      /> }
    </>
  )
}
