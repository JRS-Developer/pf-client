import React, {useState} from "react";
import MaterialTable from "material-table";
import ProfileForm from "./ProfileForm";
import AlertDialog from "../alert/AlertDialog";
import ConfirmDialog from "../alert/ConfirmDialog";

const ProfileIndex = () => {
  const tableRef = React.createRef();
  const [selection, setSelection] = useState({});
  /*Dialog Form*/
  const [open, setOpen] = React.useState(false);
  const [titleForm, setTitleForm] = React.useState('Add Role');
  /*Dialog Alert*/
  const [openAlert, setOpenAlert] = React.useState(false);
  /* Dialog Confirm */
  const [openConfirm, setOpenConfirm] = React.useState(false);

  const columns = [
    {
      title : 'Id',
      field : 'id'
    },{
      title : 'Name',
      field : 'name'
    }
  ];

  const data = [
    {
      id: 1,
      name: 'Super Administrado',
    }, {
      id: 2,
      name: 'Alumno',
    },{
      id: 3,
      name: 'Profesor',
    },{
      id: 4,
      name: 'Administrativo',
    }
  ]

  const forceReset = () => {
    tableRef.current.onAllSelected(true);
  };

  // Open DialogAlert
  const handleOpenAlert = () => {
    setOpenAlert(true);
  };
  // Close DialogAlert
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  /*Open DialogForm*/
  const handleClickOpen = (action) => {
    if(action === 'add'){
      setSelection({})
      setTitleForm('Add Role');
      setOpen(true);
    }else if(selection.id){
      setTitleForm('Edit Role')
      setOpen(true);
    }else{
      setOpenAlert(true);
    }
  };
  /** Close DialogForm*/
  const handleClose = () => {
    setOpen(false);
  };

  /* Open DialogConfirm */
  const handleOpenConfirm = () => {
    selection.id ? setOpenConfirm(true) : setOpenAlert(true);
  };
  /* Close DialogConfirm */
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  return (
    <div style={{ maxWidth: "100%" }}>
      {openConfirm && <ConfirmDialog
        openConfirm={openConfirm}
        handleCloseConfirm={handleCloseConfirm}
        message="¿ Esta seguro de eliminar el registro ?"
        dataRole={selection}
      />}
      {openAlert && <AlertDialog
        title="ADVERTENCIA"
        message="Seleccione un registro para poder continuar"
        openAlert={openAlert}
        handleCloseAlert={handleCloseAlert}
      />}
      {open && <ProfileForm open={open} handleClose={handleClose} titleForm={titleForm} dataRole={selection}/>}
      <MaterialTable
        title="Lista de Roles"
        columns={columns}
        tableRef={tableRef}
        data={data} style={{width: '100%'}}
        //onRowClick={(evt, rowData) => setSelection(selectedRow)}
        onRowClick={(event, rowData) => {
          setSelection(rowData);
          rowData.tableData.checked = !rowData.tableData.checked;
        }}

        options={{
          selection: true,
          selectionProps: (rowData) => ({
            checked: rowData.id === selection.id,
            disabled: true,
            color: 'primary',
          }),
          //pageSizeOptions: [5, 10, 20, 50],
          showSelectAllCheckbox: false,
          actionsColumnIndex: -1,
          rowStyle: (rowData) => ({
            backgroundColor:
              selection.id === rowData.id ? 'rgba(145, 158, 171, 0.16)' : 'rgba(255, 255, 255, 1)'
          })
        }}

        actions={[
          {
            icon: 'add_circle_outline',
            tooltip: "Add Rol",
            isFreeAction: true,
            onClick: (event) => handleClickOpen('add'),
          },{
            tooltip: 'Edit Rol',
            icon: 'edit',
            isFreeAction: true,
            //onClick: (evt, rowData) => setSelection(rowData[0])
            onClick: (event) => handleClickOpen('edit'),
          },{
            tooltip: 'Delete Rol',
            icon: 'delete',
            isFreeAction: true,
            //onClick: (evt, rowData) => setSelection(rowData[0])
            onClick: (event) => handleOpenConfirm(),
          }
        ]}
        //onSelectionChange={(rows) => forceReset}
      />
    </div>
  )
}

export default ProfileIndex