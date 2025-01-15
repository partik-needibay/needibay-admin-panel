import React from 'react'

import Box from '@mui/material/Box'

import { useState } from 'react'
import { useRouter } from 'next/router'
import { tableIcons } from 'src/views/apps/product/ExampleCrud'
import MaterialTable, { MTableToolbar, MTableHeader, MTableGroupbar, MTableBodyRow } from 'material-table'

import Typography from '@mui/material/Typography'
const Attribute = () => {
  const router = useRouter()

    const handleRowClick = (id) => {
    router.push({
        pathname: `/attributes/product/${id.tableData.id}`,
        query: {data: JSON.stringify(id)}
    })
  }

  const [columns, setColumns] = useState([
    { title: 'Attribute Code', field: 'atcode' },
    { title: 'Default Label', field: 'label' },
    { title: 'Required', field: 'required', lookup: { 1: 'Yes', 2: 'No' } },
    {
      title: 'System',
      field: 'system',
      lookup: { 1: 'Yes', 2: 'No' }
    },
    {
      title: 'Scope',
      field: 'scope',
      lookup: { 1: 'Global', 2: 'Website', 3: 'Store View' }
    },
    {
      title: 'Searchable',
      field: 'searchable',
      lookup: { 1: 'Yes', 2: 'No' }
    },
    {
      title: 'Used in layered navigation',
      field: 'used',
      lookup: { 1: 'Yes', 2: 'No' }
    },
    {
      title: 'Comparable',
      field: 'comparable',
      lookup: { 1: 'Yes', 2: 'No' }
    }
  ])

  const [data, setData] = useState([
    {
      atcode: 'color',
      label: 'Color',
      required: 1,
      system: 2,
      scope: 1,
      searchable: 1,
      used: 1,
      comparable: 1
    },
    {
      atcode: 'size',
      label: 'Size',
      required: 1,
      system: 2,
      scope: 1,
      searchable: 1,
      used: 1,
      comparable: 1
    },
    {
      atcode: 'price',
      label: 'Price',
      required: 1,
      system: 2,
      scope: 1,
      searchable: 1,
      used: 1,
      comparable: 1
    }
  ])

  return (
    <>
      {' '}
      <Box sx={{ mb: 3, display: 'flex' }}>
        <Box>
          <Typography variant='h5' gutterBottom>
            Product Attributes
          </Typography>
          <Typography variant='body2' gutterBottom>
            Product Attributes are the characteristics of a product. They are used to further define a product and can
            be used to create product variations.
          </Typography>
        </Box>
      </Box>
      <MaterialTable
        title=' Attributes List'
        columns={columns}
        onRowClick={(evt, selectedRow) => handleRowClick(selectedRow)}
        components={{
          Row: props => (
            <MTableBodyRow
              {...props}
              style={{
                backgroundColor: '#000'
              }}
            />
          )
        }}
        data={data}
        icons={tableIcons}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData])

                resolve()
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data]
                const index = oldData.tableData.id
                dataUpdate[index] = newData
                setData([...dataUpdate])

                resolve()
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data]
                const index = oldData.tableData.id
                dataDelete.splice(index, 1)
                setData([...dataDelete])

                resolve()
              }, 1000)
            })
        }}
      />
    </>
  )
}

export default Attribute
