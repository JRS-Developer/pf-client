import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import MatriculaForm from './MatriculaForm'
import Table from '../Table/Table'

//importamos los métodos
import {
  getMatriculas as listMatriculas,
  getDataById,
  modifiedMatricula,
} from '../../actions/matricula'
import { format } from 'date-fns'

const columns = [
  { field: 'id', headerName: 'ID', width: 350, hide: true },
  {
    field: 'fecha',
    headerName: 'Fecha',
    width: 200,
    valueFormatter: (params) => {
      return format(new Date(params.value), 'dd/MM/yyyy')
    },
  },
  { field: 'student', headerName: 'Estudiante', width: 300 },
  { field: 'identification', headerName: 'Identification', width: 300 },
  { field: 'school', headerName: 'Escuela', width: 300 },
  { field: 'class', headerName: 'Clase', width: 300 },
  { field: 'ciclo_electivo', headerName: 'Ciclo Electivo', width: 200 },
]

const form = MatriculaForm

export default function MatriculaIndex() {
  const dispatch = useDispatch()

  const getStatusReducer = useSelector((state) => state.matriculaReducer)
  const { matriculas, loading } = getStatusReducer

  const data = {
    columns,
    rows: matriculas,
  }

  useEffect(() => {
    dispatch(listMatriculas())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(matriculas)

  return (
    <>
      {
        <Table
          data={data}
          DialogForm={form}
          title="MATRÍCULAS"
          getDataById={getDataById}
          getActions={getStatusReducer}
          modifiedAction={modifiedMatricula}
          listData={listMatriculas}
          loading={loading}
        />
      }
    </>
  )
}
