import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import IconButton from '@mui/material/IconButton'
import Icon from '@mui/material/Icon'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from '@mui/x-data-grid'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'

import { Box, Paper } from '@mui/material'
import AlertDialog from '../alert/AlertDialog'
import ConfirmDialog from '../alert/ConfirmDialog'
import Tooltip from '@mui/material/Tooltip'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import AccessForm from '../access/AccessForm'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
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
        <GridToolbarColumnsButton />
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
  )
}

QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

/*
 * data: "La data que se mostrará en la grilla" => data = {columns[array de objetos], rows[array de objetos]}
 * DialogForm: "Formulario para registrar y editar el registro" [componente]
 * title: Es el título de la DataGrid [array]
 * getDataById: Es una función que nos traerá la data por Id [action],
 * getActions: Es el estado del componente traido de la store. [useState]
 * modifiedAction: Es una función que nos permite modificar el status del registro [action]
 * listData: Es una función que nos permite traer la lista de registros [action]
 * */
const Table = ({
  data,
  DialogForm,
  title,
  getDataById,
  getActions,
  modifiedAction,
  listData,
  loading,
}) => {
  const dispatch = useDispatch()

  const { dataEdit, /* loading, */ error, message } = getActions
  const [openMessage, setOpenMessage] = React.useState(false)
  const [pageSize, setPageSize] = React.useState(25)
  const [searchText, setSearchText] = React.useState('')
  const [rows, setRows] = React.useState(data.rows)

  const requestSearch = (searchValue) => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
    const filteredRows = data.rows.filter((row) => {
      return Object.keys(row).some((field) => {
        // Algunos valores son null e undefined y causaban un error
        const result =
          row[field] !== null &&
          row[field] !== undefined &&
          searchRegex.test(row[field].toString())
        return result
      })
    })
    setRows(filteredRows)
  }

  //Obtenemos las acciones por módulos
  const getActionsModule = useSelector((state) => state.actionsModuleReducer)
  const { actionsModule, loadingActions, errorActions } = getActionsModule

  React.useEffect(() => {
    setRows(data.rows)
  }, [data.rows])

  const [selection, setSelection] = useState({})
  /*Dialog Form*/
  const [open, setOpen] = React.useState(false)
  const [titleForm, setTitleForm] = React.useState('Add Role')
  /*Dialog Alert*/
  const [openAlert, setOpenAlert] = React.useState(false)
  /* Dialog Confirm */
  const [openConfirm, setOpenConfirm] = React.useState(false)
  /* Dialog Confirm */
  const [openAccess, setOpenAccess] = React.useState(false)

  // Close DialogAlert
  const handleCloseAlert = () => {
    setOpenAlert(false)
  }

  /*Open DialogForm*/
  const handleClickOpen = (action) => {
    if (action === 'add') {
      setSelection({})
      setTitleForm('Add')
      setOpen(true)
    } else if (action === 'delete') {
      /* Open DialogConfirm Delete*/
      selection.id ? setOpenConfirm(true) : setOpenAlert(true)
    } else if (action === 'access') {
      /* Open DialogConfirm Access*/
      selection.id ? setOpenAccess(true) : setOpenAlert(true)
    } else if (selection.id) {
      setTitleForm('Edit')
      setOpen(true)
    } else {
      setOpenAlert(true)
    }
  }
  /** Close DialogForm*/
  const handleClose = () => {
    setOpen(false)
  }

  /* Close DialogConfirm */
  const handleCloseConfirm = () => {
    setOpenConfirm(false)
  }

  /* Close DialogAccess */
  const handleCloseAccess = () => {
    setOpenAccess(false)
  }

  const handleClickGetData = (id) => {
    dispatch(getDataById(id))
  }

  //Open message
  const handleClickMessage = () => {
    setOpenMessage(true)
  }
  //Close message
  const handleCloseMessage = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenMessage(false)
  }

  return (
    <Box>
      {
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar
            open={openMessage}
            autoHideDuration={6000}
            onClose={handleCloseMessage}
          >
            <Alert
              onClose={handleCloseMessage}
              severity={error ? 'error' : 'success'}
              sx={{ width: '100%' }}
            >
              {error ? error : message.message}
            </Alert>
          </Snackbar>
        </Stack>
      }
      {openAccess && (
        <AccessForm
          openAccess={openAccess}
          handleCloseAccess={handleCloseAccess}
          dataForm={dataEdit}
          listData={listData}
          handleClickMessage={handleClickMessage}
        />
      )}
      {openConfirm && (
        <ConfirmDialog
          openConfirm={openConfirm}
          handleCloseConfirm={handleCloseConfirm}
          message="¿ Esta seguro de eliminar el registro ?"
          dataForm={dataEdit}
          fnModifiedStatus={modifiedAction}
          listData={listData}
          handleClickMessage={handleClickMessage}
        />
      )}
      {openAlert && (
        <AlertDialog
          title="ADVERTENCIA"
          message="Seleccione un registro para poder continuar"
          openAlert={openAlert}
          handleCloseAlert={handleCloseAlert}
        />
      )}
      {open && (
        <DialogForm
          open={open}
          handleClose={handleClose}
          titleForm={titleForm}
          dataForm={selection.id ? dataEdit : {}}
          handleClickMessage={handleClickMessage}
        />
      )}
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          paddingTop: '5px',
        }}
      >
        <Box
          sx={{
            marginBottom: '10px',
          }}
        >
          <h3>{`LISTA DE ${title}`}</h3>
        </Box>
        <Box>
          {loadingActions ? (
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          ) : errorActions ? (
            <h4>{errorActions}</h4>
          ) : (
            actionsModule.map((act, i) => (
              <Tooltip title={act.name} key={`t${i}`}>
                <IconButton
                  aria-label={act.name}
                  size="large"
                  onClick={() => handleClickOpen(`${act.action_param}`)}
                >
                  <Icon fontSize="inherit">{act.icon}</Icon>
                </IconButton>
              </Tooltip>
            ))
          )}
        </Box>
      </Box>
      <Paper elevation={24}>
        <Box sx={{ height: 'calc(100vh - 132px)', width: 1 }}>
          <DataGrid
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            pagination
            rowsPerPageOptions={[25, 50, 100]}
            loading={loading || loadingActions}
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
              setSelection(newSelection.row)
              handleClickGetData(newSelection.row.id)
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
            getRowClassName={(params) => {
              return params.row.status === false ? 'error' : ''
            }}
          />
        </Box>
      </Paper>
    </Box>
  )
}

export default Table
