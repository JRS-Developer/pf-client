import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import SchoolForm from "./SchoolForm";
import Table from "../Table/Table"

//importamos los métodos
import { getSchools as listSchools, getDataById, modifiedSchool } from "../../actions/school";

const columns = [
  { field: 'id', headerName: 'ID', width: 350 },
  { field: 'name', headerName: 'Name', width: 300},
  { field: 'status', headerName: 'Status', width: 300},

];

const form = SchoolForm

export default function SchoolIndex() {
  const dispatch = useDispatch();

  const getStatusReducer = useSelector(state => state.schoolReducer);
  const { schools, loadingSchool, error } = getStatusReducer;

  const data = {
    columns,
    rows: schools
  }

  useEffect(() => {
    dispatch(listSchools())
  }, [])

  return (
    <>
      { <Table
        data={data}
        DialogForm={form}
        title="SCHOOLS"
        getDataById={getDataById}
        getActions={getStatusReducer}
        modifiedAction={modifiedSchool}
        listData={listSchools}
      /> }
    </>
  )
}
