import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ClassForm from './ClassForm'
import Table from '../Table/Table'

//importamos los métodos
import {
  getClases as listClass,
  getDataById,
  modifiedClase,
} from '../../actions/clase'

const columns = [
  { field: 'name', headerName: 'Nombre', width: 300 },
  {
    field: 'schools',
    headerName: 'Escuelas',
    width: 300,
    valueGetter: (params) => {
      return params.row.schools?.map((school) => school.name).join(', ') || ''
    },
  },
  { field: 'status', headerName: 'Estado', width: 300 },
]

const form = ClassForm

export default function ClassIndex() {
  const dispatch = useDispatch()

  const getStatusReducer = useSelector((state) => state.clasesReducer)
  const { clases, loadingClases } = getStatusReducer

  const data = {
    columns,
    rows: clases.map(m => Object.assign({...m, status: m.status ? "Activo" : "Inactivo"})),
  }

  useEffect(() => {
    dispatch(listClass())
  }, [dispatch])

  return (
    <>
      {
        <Table
          data={data}
          DialogForm={form}
          title="CLASES"
          getDataById={getDataById}
          getActions={getStatusReducer}
          modifiedAction={modifiedClase}
          listData={listClass}
          loading={loadingClases}
        />
      }
    </>
  )
}
