import { Grid, Typography } from '@mui/material'
import React from 'react'
import PageHeader from 'src/@core/components/page-header'
import CartTable from 'src/views/cart/CartTable'

function CartList() {
    return (
        <>
            <CartTable headerName='Cart' />

        </>
    )
}

export default CartList