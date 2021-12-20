import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import ClassForm from "./ClassForm";
import Table from "../Table/Table"

//importamos los métodos
import { getClases as listClass, getDataById, modifiedClase } from "../../actions/clase";

const columns = [
  { field: 'id', headerName: 'ID', width: 350 },
  { field: 'name', headerName: 'Name', width: 300},
  { field: 'status', headerName: 'Status', width: 300},

];

const form = ClassForm

export default function ClassIndex() {
  const dispatch = useDispatch();

  const getStatusReducer = useSelector(state => state.clasesReducer);
  const { clases, /* loading, error */ } = getStatusReducer;

  const data = {
    columns,
    rows: clases
  }

  useEffect(() => {
    const school_id = "b3ea8d8a-36f3-4c6c-8937-c37641aaa005"
    dispatch(listClass(school_id))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      { <Table
        data={data}
        DialogForm={form}
        title="CICLO ELECTIVO"
        getDataById={getDataById}
        getActions={getStatusReducer}
        modifiedAction={modifiedClase}
        listData={listClass}
      /> }
    </>
  )
}
