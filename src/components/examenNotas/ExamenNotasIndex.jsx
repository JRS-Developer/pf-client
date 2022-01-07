import React, {useEffect} from "react";
import {useParams} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import ExamenNotasForm from "./ExamenNotasForm";
import Table from "../Table/Table"

//importamos los métodos
import {
  getNotasExamen as listExamenNotas,
  getDataById,
  editNotasExamen,
} from "../../actions/examenNotas";

const columns = [
  { field: 'id', headerName: 'ID', width: 300 },
  { field: 'fecha', headerName: 'FECHA EVALUACIÓN', width: 200},
  { field: 'school', headerName: 'ESCUELA', width: 300},
  { field: 'clase', headerName: 'CLASE', width: 200},
  { field: 'ciclo_lectivo', headerName: 'CICLO LECTIVO', width: 200},
  { field: 'student', headerName: 'ALUMNO', width: 300},
  { field: 'examen', headerName: 'EXAMEN', width: 200},
  { field: 'nota', headerName: 'NOTA', width: 100},
  { field: 'periodo', headerName: 'PERIODO', width: 100}
];

const form = ExamenNotasForm

export default function ExamenNotasIndex() {
  const {school_id, clase_id, ciclo_lectivo_id, id} = useParams();

  const dispatch = useDispatch();

  const getStatusReducer = useSelector(state => state.examenNotasReducer);
  const { examenNotas} = getStatusReducer;

  const data = {
    columns,
    rows: examenNotas
  }

  useEffect(() => {
    const body = {
      school_id, clase_id, ciclo_lectivo_id, id
    }
    //console.log(body)
    dispatch(listExamenNotas(body))
  }, [])

  return (
    <>
      { <Table
        data={data}
        DialogForm={form}
        title="NOTAS"
        getDataById={getDataById}
        getActions={getStatusReducer}
        modifiedExamenNota={editNotasExamen}
        listData={listExamenNotas}
      /> }
    </>
  )
}
