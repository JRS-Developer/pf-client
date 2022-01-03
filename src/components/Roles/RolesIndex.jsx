import React, {useEffect/* , useState */} from "react";
import {useDispatch, useSelector} from "react-redux";
import RolesForm from './RolesForm'
import Table from '../Table/Table.jsx'

import {getRoles as listRoles, getDataById, modifiedRole } from "../../actions/role";

const columns = [
  { field: 'id', headerName: 'ID', width: 300 },
  {field: 'name', headerName: 'Roles', width: 400}
]

const form = RolesForm

export default function RolesIndex() {
  const dispatch = useDispatch();

  const getRoles = useSelector(state => state.rolesReducer);
  const { roles, /* loading, error, message */ } = getRoles;

  const data = {
    columns,
    rows: roles,
  }

  useEffect(() => {
    dispatch(listRoles())
  }, [dispatch])

  return <Table
    data={data}
    DialogForm={form}
    title="ROLES"
    getDataById={getDataById}
    getActions={getRoles}
    modifiedAction={modifiedRole}
    listData={listRoles}
  />
}