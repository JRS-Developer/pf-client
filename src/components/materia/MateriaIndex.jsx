import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import MateriaForm from "./MateriaForm";
import Table from "../Table/Table"

//importamos los métodos
import { getMaterias as listMaterias, getDataById, modifiedMateria } from "../../actions/materia";

const columns = [
  { field: 'name', headerName: 'Name', width: 300},
  { field: 'description', headerName: 'Descripción', width: 300},
  { field: 'status', headerName: 'Estado', width: 300},
];

const form = MateriaForm

export default function MateriaIndex() {
  const dispatch = useDispatch();

  const getStatusReducer = useSelector(state => state.materiasReducer);
  const { materias, loadingMaterias  } = getStatusReducer;

  const data = {
    columns,
    rows: materias.map(m => Object.assign({...m, status: m.status ? "Activo" : "Inactivo"}))
  }

  useEffect(() => {
    dispatch(listMaterias())
  }, [dispatch])

  return materias && 
      ( <Table
        data={data}
        DialogForm={form}
        title="MATERIAS"
        getDataById={getDataById}
        getActions={getStatusReducer}
        modifiedAction={modifiedMateria}
        listData={listMaterias}
        loading={loadingMaterias}
      />
  )
}
