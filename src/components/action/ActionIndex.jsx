import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ActionForm from './ActionForm'
import Table from '../Table/Table'

//importamos los métodos
import {
  getActions as listActions,
  getDataById,
  modifiedAction,
} from '../../actions/action'

const columns = [
  { field: 'name', headerName: 'Name', width: 300 },
  { field: 'onclick', headerName: 'onClick', width: 300 },
  { field: 'action_param', headerName: 'Action Param', width: 300 },
  { field: 'icon', headerName: 'Icon', width: 300 },
]

const form = ActionForm

export default function ActionIndex() {
  const dispatch = useDispatch()

  const getActions = useSelector((state) => state.actionsReducer)
  const { actions, loading } = getActions

  const data = {
    columns,
    rows: actions,
  }

  useEffect(() => {
    dispatch(listActions())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {
        <Table
          data={data}
          DialogForm={form}
          title="ACCIONES"
          getDataById={getDataById}
          getActions={getActions}
          modifiedAction={modifiedAction}
          listData={listActions}
          loading={loading}
        />
      }
    </>
  )
}
