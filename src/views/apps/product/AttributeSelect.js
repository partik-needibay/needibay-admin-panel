import React from 'react'
import { Drawer } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import { useDemoData } from '@mui/x-data-grid-generator'
const AttributeSelect = ({ ...props }) => {
  const { open, toggle, attributeList } = props
  const [pageSize, setPageSize] = React.useState(5)
  const [rowSelectionModel, setRowSelectionModel] = React.useState([])

  const saveAttributes = () => {
    attributeList(rowSelectionModel)
    toggle()
  }

  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    maxColumns: 10
  })

  return (
    <Drawer
      variant='temporary'
      ModalProps={{ keepMounted: false }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: '75%', sm: '75%', md: '75%', lg: '75%', xl: '75%' } } }}
      anchor='right'
      open={open}
      onClose={toggle}
    >
      <Box sx={{ display: 'flex', m: 5, flexDirection: 'column ' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant='h5' sx={{ mb: 2 }}>
              Select Attributes
            </Typography>

            <Typography variant='caption'>Select attributes to add to your product</Typography>
          </Box>

          <Box>
            <Button sx={{ mt: 2, mr: 2 }} color='primary' variant='outlined'>
              Add Attribute
            </Button>

            <Button sx={{ mt: 2 }} color='primary' variant='contained' onClick={saveAttributes}>
              Save
            </Button>
          </Box>
        </Box>

        <Box height='100vh' width='100%' sx={{ mt: 7 }}>
          <DataGrid
            checkboxSelection
            pageSize={pageSize}
            rowSelectionModel={rowSelectionModel}
            onSelectionModelChange={newSelection => {
              setRowSelectionModel(newSelection)
            }}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            {...data}
          />
        </Box>
      </Box>
    </Drawer>
  )
}

export default AttributeSelect
