import React from 'react'
// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import CardStatisticsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'

const VendorOverView = () => {
    return (
        <Grid container spacing={6} >
            <Grid item xs={6} sm={3} md={4} >
                <CardStatisticsHorizontal
                    stats='155k'
                    color='primary'
                    trendNumber='+22%'
                    title='Total Orders'
                    chipText='Last 4 Month'
                    icon={<Icon icon='mdi:cart-plus' />}
                />
            </Grid>
            <Grid item xs={6} sm={3} md={4}>
                <CardStatisticsHorizontal
                    stats='$13.4k'
                    color='success'
                    trendNumber='+38%'
                    title='Total Sales'
                    chipText='Last Six Month'
                    icon={<Icon icon='mdi:graph-bar' />}
                />
            </Grid>
            <Grid item xs={6} sm={3} md={4}>
                {/* <CrmTotalProfit /> */}
                <CardStatisticsHorizontal
                    stats='$13.4k'
                    color='success'
                    trendNumber='+38%'
                    title='Total Profit'
                    chipText='Last Six Month'
                    icon={<Icon icon='mdi:graph-line' />}
                />
            </Grid>
            <Grid item xs={6} sm={3} md={4}>
                {/* <CrmTotalGrowth /> */}
                <CardStatisticsHorizontal
                    stats='$13.4k'
                    color='success'
                    trendNumber='+38%'
                    title='Total Growth'
                    chipText='Last Six Month'
                    icon={<Icon icon='mdi:currency-usd' />}
                />
            </Grid>
        </Grid>
    )
}

export default VendorOverView
