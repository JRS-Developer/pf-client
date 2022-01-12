import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ExamenNotasForm from './ExamenNotasForm'
import Table from '../Table/Table'
import Divider from '@mui/material/Divider';

//importamos los métodos
import {
  getNotasExamen as listExamenNotas,
  getDataById,
  editNotasExamen,
} from '../../actions/examenNotas'

const form = ExamenNotasForm

export default function ExamenNotasIndex({student = false}) {
  const param = useParams()

  const columns = [
    { field: 'id', headerName: 'ID', width: 300, hide: true },
    { field: 'fecha', headerName: 'FECHA EVALUACIÓN', width: 200 },
    { field: 'school', headerName: 'ESCUELA', width: 300 },
    { field: 'clase', headerName: 'CLASE', width: 200 },
    { field: 'ciclo_lectivo', headerName: 'CICLO LECTIVO', width: 200 },
    { field: 'student', headerName: 'ALUMNO', width: 300 },
    { field: 'examen', headerName: 'EXAMEN', width: 200 },
    { field: 'nota', headerName: 'NOTA', width: 100 },
    { field: 'periodo', headerName: 'PERIODO', width: 100 },
  ]

  const dispatch = useDispatch()

  const getStatusReducer = useSelector((state) => state.examenNotasReducer)
  const { examenNotas, loadingExamenNotas } = getStatusReducer

  const data = {
    columns,
    rows: examenNotas,
  }

  let promedio = 0;
  let suma = 0;
  examenNotas?.map(nt => (
    suma += parseFloat(nt.nota)
  ));
  promedio = suma / examenNotas?.length;

  useEffect(() => {
    const body = {
      school_id: param.school_id || param.schoolId,
      clase_id : param.clase_id || param.claseId,
      ciclo_lectivo_id: param.ciclo_lectivo_id || param.cicloLectivoId,
      id: param.materia_id || param.materiaId,
    }

 
    dispatch(listExamenNotas(body, student))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])


  return (
    <>
      {student && <><h3>Promedio: {promedio.toFixed(2)}</h3> <Divider /></> }
      
      {examenNotas &&
        <Table
          data={data}
          DialogForm={form}
          title="NOTAS"
          getDataById={getDataById}
          getActions={getStatusReducer}
          modifiedExamenNota={editNotasExamen}
          listData={listExamenNotas}
          loading={loadingExamenNotas}
        />
      }
      
    </>
  )
}
