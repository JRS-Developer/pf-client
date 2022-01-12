import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SchoolForm from './SchoolForm'
import Table from '../Table/Table'

//importamos los métodos
import {
  getSchools as listSchools,
  getDataById,
  /* modifiedSchool, */ deleteSchool,
} from '../../actions/school'

const columns = [
  { field: 'id', headerName: 'ID', width: 350, hide: true },
  { field: 'name', headerName: 'Name', width: 300 },
  { field: 'status', headerName: 'Status', width: 300 },
]

const form = SchoolForm

export default function SchoolIndex() {
  const dispatch = useDispatch()

  const getStatusReducer = useSelector((state) => state.schoolReducer)
  const { schools, loadingSchool } = getStatusReducer

  const data = {
    columns,
    rows: schools.map(s => Object.assign({...s, status: s.status ? "Activo" : "Inactivo"})),
  }

  useEffect(() => {
    dispatch(listSchools())
  }, [dispatch])

  return (
    <>
      { schools &&
        <Table
          data={data}
          DialogForm={form}
          title="SCHOOLS"
          getDataById={getDataById}
          getActions={getStatusReducer}
          modifiedAction={deleteSchool}
          listData={listSchools}
          loading={loadingSchool}
        />
      }
    </>
  )
}
