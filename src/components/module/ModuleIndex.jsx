import React from "react";
import ModuleForm from "./ModuleForm";
import Table from "../Table/Table"


const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Name', width: 300},
  { field: 'url', headerName: 'Url', width: 300},
  { field: 'icon', headerName: 'Icon', width: 300}
];
const rows = [
  { id: 1, name: 'SEGURIDAD', url: '#', icon: '' },
  { id: 2, name: 'Roles', url: '/roles', icon: 'account_circle'},
  { id: 3, name: 'Usuarios', url: '/users', icon: 'people'},
  { id: 4, name: 'Acciones', url: '/actions', icon: 'format_list_bulleted'},
  { id: 5, name: 'Módulos', url: '/modules', icon: 'recent_actors'},
];

const data = {
  columns, rows
}

const form = ModuleForm

export default function ModuleIndex() {
  return <Table data={data} DialogForm={form} title="MÓDULOS" />
}
