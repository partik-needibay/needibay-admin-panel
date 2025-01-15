import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons
} from '@mui/x-data-grid'
import { randomCreatedDate, randomTraderName, randomId, random } from '@mui/x-data-grid-generator'

const initialRows = [
  {
    id: randomId(),
    name: randomTraderName(),
    min: 10,
    max: 100,
    price: 40
  },
  {
    id: randomId(),
    name: randomTraderName(),
    min: 10,
    max: 100,
    price: 40
  },
  {
    id: randomId(),
    name: randomTraderName(),
    min: 10,
    max: 100,
    price: 40
  },
  {
    id: randomId(),
    name: randomTraderName(),
    min: 10,
    max: 100,
    price: 40
  },
  {
    id: randomId(),
    name: randomTraderName(),
    min: 10,
    max: 100,
    price: 40
  },
  {
    id: randomId(),
    name: randomTraderName(),
    min: 10,
    max: 100,
    price: 40
  },
  {
    id: randomId(),
    name: randomTraderName(),
    min: 10,
    max: 100,
    price: 40
  }
]

import { Drawer } from '@mui/material'

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props

  const handleClick = () => {
    const id = randomId()
    setRows(oldRows => [...oldRows, { id, name: '', age: '', isNew: true }])
    setRowModesModel(oldModel => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' }
    }))
  }

  return (
    <Box>
      <Button onClick={handleClick}>Add record</Button>
    </Box>
  )
}

const VendorConfigDrawer = ({ ...props }) => {
  const { open, toggle, handleConfigData } = props

  const [rows, setRows] = React.useState(initialRows)
  const [rowModesModel, setRowModesModel] = React.useState({})

  const [rowSelectionModel, setRowSelectionModel] = React.useState([])
  const [pageSize, setPageSize] = React.useState(10)


  const checkRowSelection = () => {
    console.log("This is from within" + " "+rowSelectionModel)
    handleConfigData(rowSelectionModel)
    handleClose()
  }

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
    }
  }

  const handleEditClick = id => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleSaveClick = id => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
  }

  const handleDeleteClick = id => () => {
    setRows(rows.filter(row => row.id !== id))
  }

  const handleCancelClick = id => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    })

    const editedRow = rows.find(row => row.id === id)
    if (editedRow.isNew) {
      setRows(rows.filter(row => row.id !== id))
    }
  }

  const processRowUpdate = newRow => {
    const updatedRow = { ...newRow, isNew: false }
    setRows(rows.map(row => (row.id === newRow.id ? updatedRow : row)))
    return updatedRow
  }

  const handleRowModesModelChange = newRowModesModel => {
    setRowModesModel(newRowModesModel)
  }

  const columns = [
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    {
      field: 'min',
      headerName: 'Minimum Quantity',
      type: 'number',
      width: 200,
      align: 'left',
      headerAlign: 'left',
      editable: false
    },
    {
      field: 'max',
      headerName: 'Maximum Quantity',
      type: 'number',
      width: 200,
      align: 'left',
      headerAlign: 'left',
      editable: false
    },
    {
      field: 'price',
      headerName: 'Unit Price',
      type: 'number',
      width: 200,
      align: 'left',
      headerAlign: 'left',
      editable: false

    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label='Save'
              sx={{
                color: 'primary.main'
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label='Cancel'
              className='textPrimary'
              onClick={handleCancelClick(id)}
              color='inherit'
            />
          ]
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label='Edit'
            className='textPrimary'
            onClick={handleEditClick(id)}
            color='inherit'
          />,
          <GridActionsCellItem icon={<DeleteIcon />} label='Delete' onClick={handleDeleteClick(id)} color='inherit' />
        ]
      }
    }
  ]

  const handleClose = () => {
    toggle()
  }

  const handleClick = () => {
    const id = randomId()
    setRows(oldRows => [...oldRows, { id, name: '', min: 0, max: 0, price: 0, isNew: true }])
    setRowModesModel(oldModel => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' }
    }))
  }

  return (
    <Drawer
      variant='temporary'
      ModalProps={{ keepMounted: false }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: '75%', sm: '75%', md: '75%', lg: '75%', xl: '50%' } } }}
      anchor='right'
      open={open}
      onClose={handleClose}
    >
      <Box
        sx={{
          height: '75%',
          width: '100%',
          '& .actions': {
            color: 'text.secondary'
          },
          '& .textPrimary': {
            color: 'text.primary'
          }
        }}
      >
        <Box display='flex' justifyContent='space-between' alignItems='center' sx={{ px: 3, py: 2, mb: 5, mt: 3 }}>
          <Box>
            <Typography variant='h5'>Setup Vendor Configurations</Typography>
            <Typography variant='caption'>
              Add various vendor prices for the same product and manage related MOQs and prices respectively
            </Typography>
          </Box>

          <Box>

            <Button sx={{ mr: 2}} color='primary' variant='outline' startIcon={<SaveIcon />} onClick={checkRowSelection}>
              Save
            </Button>
            <Button color='primary' variant='contained' startIcon={<AddIcon />} onClick={handleClick}>
              Add record
            </Button>
          </Box>
        </Box>

        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          rowSelectionModel={rowSelectionModel}
          onSelectionModelChange={newSelection => {
            setRowSelectionModel(newSelection)
          }}
          editMode='row'
          checkboxSelection
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          slots={{
            toolbar: EditToolbar
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel }
          }}
          processRowUpdate={processRowUpdate}
        />
      </Box>
    </Drawer>
  )
}

export default VendorConfigDrawer
