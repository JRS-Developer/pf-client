import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ModuleForm from "./ModuleForm";
import Table from "../Table/Table"

import {getModules as listModules, getDataById, modifiedModule } from "../../actions/module";

const columns = [
  { field: 'id', headerName: 'ID', width: 200 },
  { field: 'name', headerName: 'Name', width: 300},
  { field: 'url', headerName: 'Url', width: 300},
  { field: 'icon', headerName: 'Icon', width: 300}
];

const form = ModuleForm

export default function ModuleIndex() {

  const dispatch = useDispatch();

  const getModules = useSelector(state => state.modulesReducer);
  const { modules, loading, error, message } = getModules;

  const data = {
    columns,
    rows : modules
  }

  useEffect(() => {
    dispatch(listModules())
  }, [dispatch])

  return (
    <>
      <Table
      data={data}
      DialogForm={form}
      title="MÓDULOS"
      getDataById={getDataById}
      getActions={getModules}
      modifiedAction={modifiedModule}
      listData={listModules}
      />
    </>
  )
}
