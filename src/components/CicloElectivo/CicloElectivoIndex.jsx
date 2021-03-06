import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CicloElectivoForm from './CicloElectivoForm'
import Table from '../Table/Table'

//importamos los métodos
import {
  getCicloElectivos as listCicloElectivos,
  getDataById,
  modifiedCicloElectivo,
} from '../../actions/cicloElectivo'

const columns = [
  { field: 'name', headerName: 'Name', width: 300 },
  { field: 'status', headerName: 'Status', width: 300 },
]

const form = CicloElectivoForm

export default function CicloElectivoIndex() {
  const dispatch = useDispatch()

  const getStatusReducer = useSelector((state) => state.cicloElectivoReducer)
  const { cicloElectivos, loadingElectivo } = getStatusReducer

  const data = {
    columns,
    rows: cicloElectivos.map(m => Object.assign({...m, status: m.status ? "Activo" : "Inactivo"})),
  }

  useEffect(() => {
    dispatch(listCicloElectivos('false'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {
        <Table
          data={data}
          DialogForm={form}
          title="CICLO ELECTIVO"
          getDataById={getDataById}
          getActions={getStatusReducer}
          modifiedAction={modifiedCicloElectivo}
          listData={listCicloElectivos}
          loading={loadingElectivo}
        />
      }
    </>
  )
}
