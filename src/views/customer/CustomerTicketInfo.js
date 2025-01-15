import { useEffect, useCallback, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData } from 'src/store/apps/lead'

// ** Custom Components Imports
import TableHeader from 'src/views/apps/roles/TableHeader'
import Chip from 'src/@core/components/mui/chip'
import { useRouter } from 'next/router'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
// ** Vars
const userRoleObj = {
    admin: { icon: 'mdi:laptop', color: 'error.main' },
    author: { icon: 'mdi:cog-outline', color: 'warning.main' },
    editor: { icon: 'mdi:pencil-outline', color: 'info.main' },
    maintainer: { icon: 'mdi:chart-donut', color: 'success.main' },
    subscriber: { icon: 'mdi:account-outline', color: 'primary.main' }
}

const userStatusObj = {
    Active: 'success',
    pending: 'warning',
    inactive: 'secondary',
    Deleted: 'error',
    Archived: 'warning'
}

const leadSourceObject = {
    Email: { icon: 'ic:baseline-email', color: '#86888A' },
    Facebook: { icon: 'ic:baseline-facebook', color: '#2374e1' },
    Instagram: { icon: 'uil:instagram-alt', color: '#F56040' },
    Whatsapp: { icon: 'logos:whatsapp-icon', color: '#2374e1' },
    Webform: { icon: 'mdi:web', color: '#abc298' },
    LinkedIn: { icon: 'mdi:linkedin', color: '#00A0DC' },
    Twitter: { icon: 'ant-design:twitter-circle-filled', color: '#1DA1F2' }
}

const CustomerTicketInfo = () => {
    const [plan, setPlan] = useState('')
    // const [value, setValue] = useState('')
    const [value, setValue] = useState('1')
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    const [pageSize, setPageSize] = useState(10)
    const columns = [
        {
            flex: 0.2,
            minWidth: 170,
            maxWidth: 325,
            field: 'Ticket Number',
            headerName: 'Ticket Number',
            renderCell: ({ row }) => {
                const { categoryName } = row

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
                                {categoryName}
                                {/* Invoice */}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.2,
            minWidth: 125,
            maxWidth: 325,
            field: 'Subject/Title',
            headerName: 'Subject/Title',
            renderCell: ({ row }) => {
                const { categoryName } = row

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
                                {categoryName}
                                {/* Invoice */}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.2,
            minWidth: 175,
            field: 'Status',
            headerName: 'Status',
            renderCell: ({ row }) => {
                const { serviceName } = row

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
                                {serviceName}
                                {/* 30/11/2023 */}
                            </Typography>
                            {/* <Typography
                    noWrap
                    variant='body2'
                    component={Link}
                    href={`${email}`}
                    sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
                  >
                    {`@${email}`}
                  </Typography> */}
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.2,
            minWidth: 150,
            field: 'Category/Type',
            headerName: 'Category/Type',
            renderCell: ({ row }) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Typography
                                noWrap
                                variant='subtitle2'
                                sx={{
                                    fontWeight: 600,
                                    color: 'text.primary',
                                    textDecoration: 'none'
                                }}
                            >
                                {row.tableReq}
                                {/* 1/1/2024 */}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.2,
            minWidth: 150,
            field: 'Creation Date',
            headerName: 'Creation Date',
            renderCell: ({ row }) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Typography
                                noWrap
                                variant='subtitle2'
                                sx={{
                                    fontWeight: 600,
                                    color: 'text.primary',
                                    textDecoration: 'none'
                                }}
                            >
                                {row.tableReq}
                                {/* 1/1/2024 */}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.2,
            minWidth: 150,
            field: 'Last Updated',
            headerName: 'Last Updated',
            renderCell: ({ row }) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Typography
                                noWrap
                                variant='subtitle2'
                                sx={{
                                    fontWeight: 600,
                                    color: 'text.primary',
                                    textDecoration: 'none'
                                }}
                            >
                                {row.tableReq}
                                {/* 1/1/2024 */}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.2,
            minWidth: 150,
            field: 'Assigned To',
            headerName: 'Assigned To',
            renderCell: ({ row }) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Typography
                                noWrap
                                variant='subtitle2'
                                sx={{
                                    fontWeight: 600,
                                    color: 'text.primary',
                                    textDecoration: 'none'
                                }}
                            >
                                {row.tableReq}
                                {/* 1/1/2024 */}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.2,
            minWidth: 150,
            field: 'Updates',
            headerName: 'Updates',
            renderCell: ({ row }) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Typography
                                noWrap
                                variant='subtitle2'
                                sx={{
                                    fontWeight: 600,
                                    color: 'text.primary',
                                    textDecoration: 'none'
                                }}
                            >
                                {row.tableReq}
                                {/* 1/1/2024 */}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        // {
        //     flex: 0.2,
        //     minWidth: 150,
        //     field: 'Country ',
        //     headerName: 'Country ',
        //     renderCell: ({ row }) => {
        //         return (
        //             <Box sx={{ display: 'flex', alignItems: 'center' }}>
        //                 <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
        //                     <Typography
        //                         noWrap
        //                         variant='subtitle2'
        //                         sx={{
        //                             fontWeight: 600,
        //                             color: 'text.primary',
        //                             textDecoration: 'none'
        //                         }}
        //                     >
        //                         {row.tableReq}
        //                         {/* xyz */}
        //                     </Typography>
        //                 </Box>
        //             </Box>
        //         )
        //     }
        // },

        // {
        //     flex: 0.2,
        //     minWidth: 150,
        //     field: 'toggle',
        //     headerName: 'Enable/Disable',
        //     renderCell: ({ row }) => {
        //         return (
        //             <Box sx={{ display: 'flex', alignItems: 'center' }}>
        //                 <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
        //                     <FormControlLabel
        //                         sx={{
        //                             display: 'block',
        //                         }}
        //                         control={
        //                             <Switch
        //                                 checked={rowChecked[row.id] || false}
        //                                 onChange={() => handleToggle(row.id)}
        //                                 name={`toggle-${row.id}`}
        //                                 color="primary"
        //                             />
        //                         }
        //                     />

        //                 </Box>
        //             </Box>
        //         )
        //     }
        // },

    ]
    // ** Hooks
    // ** Hooks
    const dispatch = useDispatch()

    useEffect(
        () => {
            dispatch(fetchData())
        },
        () => { },
        []
    )

    const store = useSelector(state => state.service)
    console.log(store.data.data)

    const handleFilter = useCallback(val => {
        setValue(val)
    }, [])

    const handlePlanChange = useCallback(e => {
        setPlan(e.target.value)
    }, [])
    return (
        <>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <TableHeader handleFilter={handleFilter} handlePlanChange={handlePlanChange} />
                        {/* {console.log("store.data.data", store.data.data)} */}
                        {/* {store.data.data && (
                            < DataGrid
                                autoHeight
                                rows={store.data.data}
                                columns={columns}
                                checkboxSelection
                                pageSize={pageSize}
                                disableSelectionOnClick
                                rowsPerPageOptions={[10, 25, 50]}
                                onPageSizeChange={newPageSize => setPageSize(newPageSize)}
                                sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
                            />
                        )} */}
                        <TabContext value={value}>
                            <TabList onChange={handleChange} aria-label='simple tabs example'>
                                <Tab value='1' label='All Tickets' />
                                <Tab value='2' label='Active' />
                                <Tab value='3' label='Inactive' />

                            </TabList>
                            <TabPanel value='1'>
                                {store.data.data && (
                                    < DataGrid
                                        autoHeight
                                        rows={store.data.data}
                                        columns={columns}
                                        checkboxSelection
                                        pageSize={pageSize}
                                        disableSelectionOnClick
                                        rowsPerPageOptions={[10, 25, 50]}
                                        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
                                        sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
                                    />
                                )}
                            </TabPanel>
                            <TabPanel value='2'>
                                {store.data.data && (
                                    < DataGrid
                                        autoHeight
                                        rows={store.data.data}
                                        columns={columns}
                                        checkboxSelection
                                        pageSize={pageSize}
                                        disableSelectionOnClick
                                        rowsPerPageOptions={[10, 25, 50]}
                                        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
                                        sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
                                    />
                                )}
                            </TabPanel>
                            <TabPanel value='3'>
                                {store.data.data && (
                                    < DataGrid
                                        autoHeight
                                        rows={store.data.data}
                                        columns={columns}
                                        checkboxSelection
                                        pageSize={pageSize}
                                        disableSelectionOnClick
                                        rowsPerPageOptions={[10, 25, 50]}
                                        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
                                        sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
                                    />
                                )}
                            </TabPanel>

                        </TabContext>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export default CustomerTicketInfo