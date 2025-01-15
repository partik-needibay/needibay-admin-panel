import React, { useCallback, useState, useEffect } from 'react'

import { Grid, Box, Card, IconButton, Typography } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { useDispatch, useSelector } from 'react-redux'
import TableHeader from 'src/views/apps/roles/TableHeader'
import Link from 'next/link'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { fetchData } from 'src/store/apps/service'
const DocumentsTable = ({ data }) => {
  const [pageSize, setPageSize] = useState(10)
  const columns = [
    {
      flex: 1,
      field: 'pageBlockCode',
      headerName: 'Doc Type',
      renderCell: ({ row }) => {
        const { pageBlockCode } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                variant='subtitle2'
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {pageBlockCode}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 1,
      minWidth: 175,
      field: 'value',
      headerName: 'File Name',
      renderCell: ({ row }) => {
        const { value } = row
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                variant='subtitle2'
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {value}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
        flex: 1,
        minWidth: 175,
        field: 'mediaType',
        headerName: 'File Type',
        renderCell: ({ row }) => {
          const { mediaType } = row
          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                <Typography
                  noWrap
                  variant='subtitle2'
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    textDecoration: 'none',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  {mediaType}
                </Typography>
              </Box>
            </Box>
          )
        }
      },
    {
        flex: 1,
        minWidth: 175,
        field: 'mediaPath',
        headerName: 'Link',
        renderCell: ({ row }) => {
          const { mediaPath } = row
          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                <Typography
                  noWrap
                  variant='subtitle2'
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    textDecoration: 'none',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  {mediaPath}
                </Typography>
              </Box>
            </Box>
          )
        }
      }
      /* {
        flex: 1,
        minWidth: 175,
        field: 'isOwner',
        headerName: 'Is Owner',
        renderCell: ({ row }) => {
          const { isOwner } = row
          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                <Typography
                  noWrap
                  component={Link}
                  variant='subtitle2'
                  href='/apps/user/view/overview/'
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    textDecoration: 'none',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  {isOwner}
                </Typography>
              </Box>
            </Box>
          )
        }
      } */
  ]

  return (
    <>
      {data?.documents?.length > 0 && (
        <DataGrid
          autoHeight
          rows={data?.documents}
          columns={columns}
          pageSize={pageSize}
          disableSelectionOnClick
          rowsPerPageOptions={[10, 25, 50]}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
        />
      )}
    </>
  )
}

export default DocumentsTable
