// ** React Imports
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
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

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
import { fetchData } from 'src/store/apps/order'

// ** Custom Components Imports
import TableHeader from 'src/views/apps/roles/TableHeader'

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

// ** renders client column

const columns = [
    {
        flex: 0.2,
        minWidth: 100,
        field: 'id',
        headerName: 'ProductID ',
        renderCell: ({ row }) => {
            const { id } = row

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
                            {id}
                        </Typography>
                    </Box>
                </Box>
            )
        }
    },

    {
        flex: 0.2,
        minWidth: 190,
        field: 'ProductName',
        headerName: 'Product Name',
        renderCell: ({ row }) => {
            const { customerEmail, customerPhone, customerFullName } = row

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
                            {customerFullName}
                        </Typography>
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
                            {customerPhone}
                        </Typography>
                        <Typography
                            noWrap
                            variant='body2'
                            component={Link}
                            href={`${customerEmail}`}
                            sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
                        >
                            {`@${customerEmail}`}
                        </Typography>
                    </Box>
                </Box>
            )
        }
    },
    {
        flex: 0.2,
        minWidth: 230,
        field: 'Category',
        headerName: 'Category',
        renderCell: ({ row }) => {
            const { orderAmount } = row

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
                            {`Rs.${orderAmount}/-`}
                        </Typography>
                    </Box>
                </Box>
            )
        }
    },
    {
        flex: 0.2,
        minWidth: 230,
        field: 'QuantityOnHand',
        headerName: 'QuantityOnHand',
        renderCell: ({ row }) => {
            const { orderStatus } = row

            return (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                        <CustomChip
                            skin='light'
                            size='medium'
                            label={`${orderStatus && orderStatus.status}`}
                            color={`${orderStatus && orderStatus.backgroundColorCode}`}
                            sx={{ textTransform: 'capitalize', '& .MuiChip-label': { px: 2.5, lineHeight: 1.385 } }}
                        />
                    </Box>
                </Box>
            )
        }
    },
    {
        flex: 0.2,
        minWidth: 230,
        field: 'UnitCost',
        headerName: 'UnitCost',
        renderCell: ({ row }) => {
            const { paymentMethod } = row

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
                            {`${paymentMethod && paymentMethod.name}`}
                        </Typography>
                    </Box>
                </Box>
            )
        }
    },
    {
        flex: 0.2,
        minWidth: 230,
        field: 'TotalCost',
        headerName: 'Total Cost',
        renderCell: ({ row }) => {
            const { paymentMethod } = row

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
                            {`${paymentMethod && paymentMethod.name}`}
                        </Typography>
                    </Box>
                </Box>
            )
        }
    },
    {
        flex: 0.2,
        minWidth: 230,
        field: 'SellingPrice',
        headerName: 'Selling Price',
        renderCell: ({ row }) => {
            const { paymentMethod } = row

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
                            {`${paymentMethod && paymentMethod.name}`}
                        </Typography>
                    </Box>
                </Box>
            )
        }
    },
    {
        flex: 0.2,
        minWidth: 230,
        field: 'MinStockLevel',
        headerName: 'Min Stock Level',
        renderCell: ({ row }) => {
            const { paymentMethod } = row

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
                            {`${paymentMethod && paymentMethod.name}`}
                        </Typography>
                    </Box>
                </Box>
            )
        }
    },
    {
        flex: 0.2,
        minWidth: 230,
        field: 'MaxStockLevel',
        headerName: 'Max Stock Level',
        renderCell: ({ row }) => {
            const { paymentMethod } = row

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
                            {`${paymentMethod && paymentMethod.name}`}
                        </Typography>
                    </Box>
                </Box>
            )
        }
    },
    {
        flex: 0.2,
        minWidth: 230,
        field: 'SKU',
        headerName: 'SKU',
        renderCell: ({ row }) => {
            const { paymentMethod } = row

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
                            {`${paymentMethod && paymentMethod.name}`}
                        </Typography>
                    </Box>
                </Box>
            )
        }
    },
    {
        flex: 0.1,
        minWidth: 100,
        sortable: false,
        field: 'actions',
        headerName: 'Actions',
        renderCell: row => (
            <IconButton component={Link} href={`/product/${row.id}`}>
                <Icon icon='mdi:eye-outline' />
            </IconButton>
        )
    }
]

const InventroyTable = (props) => {
    const { plan, handlePlanChange, handleFilter } = props
    const [pageSize, setPageSize] = useState(10)
    const dispatch = useDispatch()

    // ** State
    const [value, setValue] = useState('1')

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    useEffect(() => {
        dispatch(fetchData())
    }, [dispatchEvent])

    const store = useSelector(state => state.order.data)
    console.log(store)

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <TableHeader plan={plan} handleFilter={handleFilter} handlePlanChange={handlePlanChange} />
                    <TabContext value={value}>
                        <TabList onChange={handleChange} aria-label='simple tabs example'>
                            <Tab value='1' label='All Items' />
                            <Tab value='2' label='Low Stock' />
                            <Tab value='3' label='Out of Stock' />
                            <Tab value='4' label='Supplier Information' />

                        </TabList>
                        <TabPanel value='1'>
                            {store && store.data && (
                                <DataGrid
                                    autoHeight
                                    rowHeight={75}
                                    rows={store.data}
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
                            {store && store.data && (
                                <DataGrid
                                    autoHeight
                                    rowHeight={75}
                                    rows={store.data}
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
                            {store && store.data && (
                                <DataGrid
                                    autoHeight
                                    rowHeight={75}
                                    rows={store.data}
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
                        <TabPanel value='4'>
                            {store && store.data && (
                                <DataGrid
                                    autoHeight
                                    rowHeight={75}
                                    rows={store.data}
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
    )
}

export default InventroyTable