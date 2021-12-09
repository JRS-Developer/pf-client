import React, {useState} from "react";
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import {
  DataGrid,
  GridToolbarDensitySelector,
  GridToolbarFilterButton
} from '@mui/x-data-grid';
import Icon from '@mui/material/Icon';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import {AddCircle, Edit, Delete } from '@mui/icons-material';
import {Box} from "@mui/material";
import ActionForm from "./ActionForm";
import AlertDialog from "../alert/AlertDialog";
import ConfirmDialog from "../alert/ConfirmDialog";
import Tooltip from '@mui/material/Tooltip';

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

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function QuickSearchToolbar(props) {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      }}
    >
      <div>
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </div>
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? 'visible' : 'hidden' }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
        sx={{
          width: {
            xs: 1,
            sm: 'auto',
          },
          m: (theme) => theme.spacing(1, 0.5, 1.5),
          '& .MuiSvgIcon-root': {
            mr: 0,
          },
          '& .MuiInput-underline:before': {
            borderBottom: 1,
            borderColor: 'divider',
          },
        }}
      />
    </Box>
  );
}

QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

const ActionIndex = () => {

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
  const [titleForm, setTitleForm] = React.useState('Add Action');
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
      setTitleForm('Add Action');
      setOpen(true);
    }else if(selection.id){
      setTitleForm('Edit Action')
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
      {open && <ActionForm open={open} handleClose={handleClose} titleForm={titleForm} dataAction={selection}/>}
      <Box style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', }}>
        <Box>
          <h3>LISTA DE ACCIONES</h3>
        </Box>
        <Box>
          <Tooltip title="Add">
            <IconButton aria-label="add" size="large" onClick={() => handleClickOpen('add')} >
              <Icon fontSize="inherit" >
                add_circle
              </Icon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton aria-label="edit" size="large" onClick={() => handleClickOpen('edit')} >
              <Icon fontSize="inherit" >
                edit
              </Icon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton aria-label="delete" size="large" onClick={() => handleOpenConfirm()}>
              <Icon fontSize="inherit" >
                delete
              </Icon>
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

export default ActionIndex