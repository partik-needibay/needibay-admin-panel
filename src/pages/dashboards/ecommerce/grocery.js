// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Component Import
import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import CrmAward from 'src/views/dashboards/crm/CrmAward'
import TodayPlacedOrder from 'src/views/dashboards/ecommerce/TodayPlacedOrder'
import CrmTotalGrowth from 'src/views/dashboards/crm/CrmTotalGrowth'
import CrmTotalProfit from 'src/views/dashboards/crm/CrmTotalProfit'
import CrmMonthlyBudget from 'src/views/dashboards/crm/CrmMonthlyBudget'
import CrmExternalLinks from 'src/views/dashboards/crm/CrmExternalLinks'
import CrmWeeklyOverview from 'src/views/dashboards/crm/CrmWeeklyOverview'
import CrmPaymentHistory from 'src/views/dashboards/crm/CrmPaymentHistory'
import CrmOrganicSessions from 'src/views/dashboards/crm/CrmOrganicSessions'
import CrmProjectTimeline from 'src/views/dashboards/crm/CrmProjectTimeline'
import CrmMeetingSchedule from 'src/views/dashboards/crm/CrmMeetingSchedule'
import EcommerceTopSellingProducts from 'src/views/dashboards/ecommerce/EcommerceTopSellingProducts'
import CrmMostSalesInCountries from 'src/views/dashboards/crm/CrmMostSalesInCountries'
import EcommerceTotalCustomer from 'src/views/dashboards/ecommerce/EcommerceTotalCustomer'
import EcommerceMostOrdersByCommunity from 'src/views/dashboards/ecommerce/EcommerceMostOrdersByCommunity'
import ApexDonutChart from 'src/views/charts/apex-charts/ApexDonutChart'
import ApexLineChart from 'src/views/charts/apex-charts/ApexLineChart'
import EcommerceSalesOverview from 'src/views/dashboards/ecommerce/EcommerceSalesOverview'
import CardStatisticsCharacter from 'src/@core/components/card-statistics/card-stats-with-image'
import EcommerceSalesOverviewWithTabs from 'src/views/dashboards/ecommerce/EcommerceSalesOverviewWithTabs'
import EcommerceImpressionsOrders from 'src/views/dashboards/ecommerce/EcommerceImpressionsOrders'
import EcommerceMarketingSales from 'src/views/dashboards/ecommerce/EcommerceMarketingSales'
import EcommerceLiveVisitors from 'src/views/dashboards/ecommerce/EcommerceLiveVisitors'
import EcommerceTable from 'src/views/dashboards/ecommerce/EcommerceTable'
import EcommerceVisitsByDay from 'src/views/dashboards/ecommerce/EcommerceVisitsByDay'



const CrmDashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6} className='match-height'>
        {/* <Grid item xs={12} md={4}>
          <CrmAward />
        </Grid> */}
        <Grid item xs={6} sm={3} md={2}>
          <CardStatisticsVertical
            stats='155k'
            color='primary'
            trendNumber='+22%'
            title='Total Orders'
            chipText='Last 4 Month'
            icon={<Icon icon='mdi:cart-plus' />}
          />
        </Grid>
        <Grid item xs={6} sm={3} md={2}>
          <CardStatisticsVertical
            stats='$13.4k'
            color='success'
            trendNumber='+38%'
            title='Total Sales'
            chipText='Last Six Month'
            icon={<Icon icon='mdi:currency-usd' />}
          />
        </Grid>
        <Grid item xs={6} sm={3} md={2}>
            <CardStatisticsVertical
                stats='$13.4k'
                color='success'
                trendNumber='+38%'
                title='Total Profit'
                chipText='Last Six Month'
                icon={<Icon icon='mdi:currency-usd' />}
            />
        </Grid>
        <Grid item xs={6} sm={3} md={3}>
          <CardStatisticsVertical
              stats='$565'
              color='primary'
              trendNumber='+22%'
              title='Average Order Value'
              chipText='Last 1 Month'
              icon={<Icon icon='mdi:cart-plus' />}
            />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <EcommerceTotalCustomer />
        </Grid>
        <Grid item xs={12} md={6}>
            <EcommerceSalesOverview />
        </Grid>
        {/* <Grid item xs={12} sm={6} md={6}>
          <EcommerceLiveVisitors />
        </Grid> */}
        
        <Grid item xs={12} md={6}>
          <EcommerceVisitsByDay />
        </Grid>

        <Grid item xs={12} md={8}>
            <ApexLineChart />
        </Grid>
        <Grid item xs={12} md={4}>
          <ApexDonutChart />
        </Grid>
        <Grid item xs={12} md={8}>
          <TodayPlacedOrder />
        </Grid>
        <Grid item xs={12} md={4}>
          <EcommerceMostOrdersByCommunity />
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <EcommerceTopSellingProducts />
        </Grid>
        <Grid item xs={12} md={8}>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default CrmDashboard
