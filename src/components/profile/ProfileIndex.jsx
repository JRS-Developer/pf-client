import React, {useState} from "react";
import MaterialTable from "material-table";
import ProfileForm from "./ProfileForm";

const ProfileIndex = () => {
  const tableRef = React.createRef();
  const [selection, setSelection] = useState([]);
  /*Dialog*/
  const [open, setOpen] = React.useState(false);

  const columns = [
    {
      title : 'Id',
      field : 'id'
    },{
      title : 'Roles',
      field : 'roles'
    }
  ];

  const data = [
    {
      id: 1,
      roles: 'Super Administrado',
    }, {
      id: 2,
      roles: 'Alumno',
    },{
      id: 3,
      roles: 'Profesor',
    },{
      id: 4,
      roles: 'Administrativo',
    }
  ]

  const forceReset = () => {
    tableRef.current.onAllSelected(true);
  };

  /*Open Dialog*/
  const handleClickOpen = () => {
    setOpen(true);
  };

  /** Close Dialog*/
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ maxWidth: "100%" }}>
      <ProfileForm open={open} handleClose={handleClose}/>
      <MaterialTable
        title="Lista de Roles"
        columns={columns}
        tableRef={tableRef}
        data={data} style={{width: '100%'}}
        //onRowClick={(evt, rowData) => setSelection(selectedRow)}
        onRowClick={(event, rowData) => {
          setSelection(rowData);
          //console.log(rowData)
          /*
          console.log(event.target, rowData);
          console.log(
            "Row Selection State Before: " + rowData.tableData.checked
          );*/
          rowData.tableData.checked = !rowData.tableData.checked;

          /*
          console.log(
            "Row Section State After: " + rowData.tableData.checked
          );*/
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
            onClick: handleClickOpen,
          },{
            tooltip: 'Edit Rol',
            icon: 'edit',
            isFreeAction: true,
            //onClick: (evt, rowData) => setSelection(rowData[0])
            onClick: (event) => alert("Edit Rol"),
          },{
            tooltip: 'Delete Rol',
            icon: 'delete',
            isFreeAction: true,
            //onClick: (evt, rowData) => setSelection(rowData[0])
            onClick: (event) => alert("Delete Rol"),
          }
        ]}
        //onSelectionChange={(rows) => forceReset}
      />
    </div>
  )
}

export default ProfileIndex