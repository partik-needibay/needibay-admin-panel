import React, { useCallback, useState, useEffect } from 'react'
import { Grid, Box, Card, IconButton, Typography } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { useDispatch, useSelector } from 'react-redux'
import TableHeader from 'src/views/apps/roles/TableHeader'
import Link from 'next/link'
// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { fetchData } from 'src/store/apps/service'
import PageHeader from 'src/@core/components/page-header'

const userRoleObj = {
    admin: { icon: 'mdi:laptop', color: 'error.main' },
    author: { icon: 'mdi:cog-outline', color: 'warning.main' },
    editor: { icon: 'mdi:pencil-outline', color: 'info.main' },
    delete: { icon: 'mdi:delete-outline', color: 'info.main' },
    view: { icon: 'lets-icons:view', color: 'info.main' },
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

// ** Columns Definition
const columns = [
    {
        flex: 0.2,
        minWidth: 25,
        maxWidth: 125,
        field: 'customer',
        headerName: 'Customer Info',
        renderCell: ({ row }) => {
            const { customerId } = row || {};

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
                            {customerId || 'N/A'}
                        </Typography>
                    </Box>
                </Box>
            );
        }
    },
    {
        flex: 0.2,
        minWidth: 175,
        field: 'item',
        headerName: 'Item / QTY',
        renderCell: ({ row }) => {
            const cartItems = row?.cartItems || [];
    
            // Calculate total items and total quantity
            const totalItems = cartItems.length;
            const totalQuantity = cartItems.reduce((acc, item) => acc + (item.qty || 0), 0);
    
            return (
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {cartItems.map(item => (
                        <Box key={item.id} sx={{ display: 'flex', alignItems: 'center' }}>
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
                                Items: {totalItems} <br/>
                                Quantity: {totalQuantity}

                            </Typography>
                        </Box>
                    ))}
                </Box>
            );
        }
    },
    
    {
        flex: 0.2,
        minWidth: 125,
        field: 'createdAt',
        headerName: 'Cart Created At',
        renderCell: ({ row }) => {
            const createdAt = row?.createdAt ? new Date(row.createdAt).toLocaleDateString() : 'N/A';

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
                            {createdAt}
                        </Typography>
                    </Box>
                </Box>
            );
        }
    },
    {
        flex: 0.2,
        minWidth: 125,
        field: 'cartLeftAt',
        headerName: 'Cart Left Abandoned',
        renderCell: ({ row }) => {
            const updatedAt = row?.updatedAt ? new Date(row.updatedAt).toLocaleDateString() : 'N/A';

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
                            {updatedAt}
                        </Typography>
                    </Box>
                </Box>
            );
        }
    },
    {
        flex: 0.2,
        minWidth: 125,
        field: 'amount',
        headerName: 'Amount',
        renderCell: ({ row }) => {
            const grandTotal = row?.grandTotal?.toFixed(2) || '0.00';

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
                            Rs. {grandTotal}
                        </Typography>
                    </Box>
                </Box>
            );
        }
    },
    {
        flex: 0.2,
        minWidth: 125,
        field: 'discountApplied',
        headerName: 'Discount Applied',
        renderCell: ({ row }) => {
            const isCouponApplied = row?.isCouponApplied && row.couponDiscountAmount > 0;
            const discountAmount = row?.couponDiscountAmount?.toFixed(2) || '0.00';

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
                            {isCouponApplied ? `Yes (Rs. ${discountAmount})` : 'No'}
                        </Typography>
                    </Box>
                </Box>
            );
        }
    },
    {
        flex: 0.2,
        minWidth: 125,
        padding: 5,
        field: 'actions',
        headerName: 'Actions',
        renderCell: ({ row }) => {
            return (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        component={Link}
                        href={``}
                        color="primary"
                        sx={{ padding: 0 }}
                    >
                        <Icon icon={userRoleObj.view.icon} />

                    </IconButton>
                    <IconButton
                        component={Link}
                        href={`/createproduct`}
                        color="primary"

                    >
                        <Icon icon={userRoleObj.editor.icon} />

                    </IconButton>
                    <IconButton
                        component={Link}
                        href={``}
                        color="primary"

                    >
                        <Icon icon={userRoleObj.delete.icon} />
                    </IconButton>
                </Box>
            );
        },
    },
]

function CartTable({ headerName }) {
    const [pageSize, setPageSize] = useState(10)

    // ** Hooks
    const dispatch = useDispatch()

    useEffect(
        () => {
            dispatch(fetchData())
        },
        [dispatch]
    )

    const store = useSelector(state => state.service)
    console.log(store?.data?.data)

    const handleFilter = useCallback(val => {
        setValue(val)
    }, [])

    const handlePlanChange = useCallback(e => {
        setPlan(e.target.value)
    }, [])
    
    return (
        <Grid container spacing={6}>
            <Grid item xs={12} lg={9}>
                <PageHeader
                    title={<Typography variant='h5'>{headerName}</Typography>}
                    subtitle={<Typography variant='body2'></Typography>}
                />
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <TableHeader handleFilter={handleFilter} handlePlanChange={handlePlanChange} />
                    {store?.data?.data && (
                        <DataGrid
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
                </Card>
            </Grid>
        </Grid>
    )
}

export default CartTable
