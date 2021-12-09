import ProfileForm from './ProfileForm'
import Table from '../Table/Table.jsx'

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'name',
    headerName: 'Roles',
    width: 300,
    editable: true,
  },
]
const rows = [
  { id: 1, name: 'Super Administrador' },
  { id: 2, name: 'Administrador' },
  { id: 3, name: 'Profesor' },
  { id: 4, name: 'Alumno' },
  { id: 5, name: 'Administrativo' },
]

const data = {
  columns,
  rows,
}

const form = ProfileForm

export default function ProfileIndex() {
  return <Table data={data} DialogForm={form} title="ROLES" />
}

QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

const ProfileIndex = () => {

  const [pageSize, setPageSize] = React.useState(25);

  const [searchText, setSearchText] = React.useState('');
  const [rows, setRows] = React.useState(data.rows);

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = data.rows.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };

  React.useEffect(() => {
    setRows(data.rows);
  }, [data.rows]);

  const [selection, setSelection] = useState({});
  /*Dialog Form*/
  const [open, setOpen] = React.useState(false);
  const [titleForm, setTitleForm] = React.useState('Add Role');
  /*Dialog Alert*/
  const [openAlert, setOpenAlert] = React.useState(false);
  /* Dialog Confirm */
  const [openConfirm, setOpenConfirm] = React.useState(false);

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
    <Box style={{ maxWidth: "100%" }}>

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
        <Box style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', }}>
          <Box>
            <h3>LISTA DE ROLES</h3>
          </Box>
          <Box>
            <Tooltip title="Add">
              <IconButton aria-label="add" size="large" onClick={() => handleClickOpen('add')} >
                <AddCircle fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton aria-label="edit" size="large" onClick={() => handleClickOpen('edit')} >
                <Edit fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton aria-label="delete" size="large" onClick={() => handleOpenConfirm()}>
                <Delete fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Box sx={{ height: 'calc(100vh - 170px)', width: 1 }}>
          <DataGrid
            //checkboxSelection
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            pagination
            rowsPerPageOptions={[25, 50, 100]}
            //pageSize={2}
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              border: 0,
              borderColor: 'primary.light',
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
              },
            }}
            onRowClick={(newSelection) => {
              setSelection(newSelection.row);
            }}
            components={{ Toolbar: QuickSearchToolbar }}
            rows={rows}
            columns={data.columns}
            componentsProps={{
              toolbar: {
                value: searchText,
                onChange: (event) => requestSearch(event.target.value),
                clearSearch: () => requestSearch(''),
              },
            }}
          />
        </Box>
    </Box>
  )
}

export default ProfileIndex
