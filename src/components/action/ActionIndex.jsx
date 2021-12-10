import React from "react";
import ActionForm from "./ActionForm";
import Table from "../Table/Table"


const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Name', width: 300},
  { field: 'onclick', headerName: 'onClick', width: 300},
  { field: 'action_param', headerName: 'Action Param', width: 300},
  { field: 'icon', headerName: 'Icon', width: 300}
];
const rows = [
  { id: 1, name: 'Nuevo', onclick: 'handleClickOpen', action_param: 'add', icon: 'add_circle' },
  { id: 2, name: 'Editar', onclick: 'handleClickOpen', action_param: 'edit', icon: 'edit'},
  { id: 3, name: 'Delete', onclick: 'handleOpenConfirm', action_param: '', icon: 'delete'},
];

const data = {
  columns, rows
}

const form = ActionForm

export default function ActionIndex() {
  return <Table data={data} DialogForm={form} title="ACCIONES" />
}
