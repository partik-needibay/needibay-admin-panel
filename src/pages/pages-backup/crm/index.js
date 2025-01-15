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
import CrmTable from 'src/views/dashboards/crm/CrmTable'
import CrmTotalGrowth from 'src/views/dashboards/crm/CrmTotalGrowth'
import CrmTotalProfit from 'src/views/dashboards/crm/CrmTotalProfit'
import CrmMonthlyBudget from 'src/views/dashboards/crm/CrmMonthlyBudget'
import CrmExternalLinks from 'src/views/dashboards/crm/CrmExternalLinks'
import CrmWeeklyOverview from 'src/views/dashboards/crm/CrmWeeklyOverview'
import CrmPaymentHistory from 'src/views/dashboards/crm/CrmPaymentHistory'
import CrmOrganicSessions from 'src/views/dashboards/crm/CrmOrganicSessions'
import CrmProjectTimeline from 'src/views/dashboards/crm/CrmProjectTimeline'
import CrmMeetingSchedule from 'src/views/dashboards/crm/CrmMeetingSchedule'
import CrmSocialNetworkVisits from 'src/views/dashboards/crm/CrmSocialNetworkVisits'
import CrmMostSalesInCountries from 'src/views/dashboards/crm/CrmMostSalesInCountries'
import CardStatisticsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import { SyntheticEvent, useState } from 'react'

const CrmDashboard = () => {

  const [value, setValue] = useState('1')

  const TabList = styled(MuiTabList)(({ theme }) => ({
    '& .MuiTabs-indicator': {
      display: 'none'
    },
    '& .Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: 'white !important'
    },
    '& .MuiTab-root': {
      minHeight: 38,
      minWidth: 110,
      borderRadius: 8,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2)
    }
  }))

  const handleChange = (value) => {
    setValue(value)
  }
  return (
    <>
      <Grid display={'flex'}  justifyContent={'end'}>
        <TabContext value={value}>
          <TabList aria-label='customized tabs example'>
            <Tab onClick={() => handleChange('1')} value='1' label='Overview Dashboard' />
            <Tab onClick={() => handleChange('2')} value='2' label='Agents Dashboard' />
            <Tab onClick={() => handleChange('3')} value='3' label='Revenue Dashboard' />
            <Tab onClick={() => handleChange('4')} value='4' label='Lead Tracker Board' />
          </TabList>
          {/* <TabPanel value='1'>
        <Typography>
          Cake apple pie chupa chups biscuit liquorice tootsie roll liquorice sugar plum. Cotton candy wafer wafer jelly
          cake caramels brownie gummies.
        </Typography>
      </TabPanel>
      <TabPanel value='2'>
        <Typography>
          Chocolate bar carrot cake candy canes sesame snaps. Cupcake pie gummi bears jujubes candy canes. Chupa chups
          sesame snaps halvah.
        </Typography>
      </TabPanel>
      <TabPanel value='3'>
        <Typography>
          Danish tiramisu jujubes cupcake chocolate bar cake cheesecake chupa chups. Macaroon ice cream tootsie roll
          carrot cake gummi bears.
        </Typography>
      </TabPanel> */}
        </TabContext>
      </Grid>
      <ApexChartWrapper>
        <Grid container spacing={6} className='match-height'>
          {/* <Grid item xs={12} md={4}>
          <CrmAward />
        </Grid> */}
          <Grid item xs={6} sm={3} md={3}>
            <CardStatisticsHorizontal
              stats='155k'
              color='primary'
              trendNumber='+22%'
              title='Total Orders'
              chipText='Last 4 Month'
              icon={<Icon icon='mdi:cart-plus' />}
            />
          </Grid>
          <Grid item xs={6} sm={3} md={3}>
            <CardStatisticsHorizontal
              stats='$13.4k'
              color='success'
              trendNumber='+38%'
              title='Total Sales'
              chipText='Last Six Month'
              icon={<Icon icon='mdi:graph-bar' />}
            />
          </Grid>
          <Grid item xs={6} sm={3} md={3}>
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
          <Grid item xs={6} sm={3} md={3}>
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
          {/* <Grid item xs={6} sm={3} md={3}>
          <CardStatisticsHorizontal
              stats='$565'
              color='primary'
              trendNumber='+22%'
              title='Average Order Value'
              chipText='Last 1 Month'
              icon={<Icon icon='mdi:cart-plus' />}
            />
        </Grid> */}
          <Grid item xs={12} md={4}>
            <CrmMostSalesInCountries />
          </Grid>
          <Grid item xs={12} md={8}>
            <CrmTable />
          </Grid>
          <Grid item xs={12} md={4}>
            <CrmOrganicSessions />
          </Grid>
          <Grid item xs={12} md={8}>
            <CrmProjectTimeline />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CrmWeeklyOverview />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CrmSocialNetworkVisits />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CrmMonthlyBudget />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CrmMeetingSchedule />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CrmExternalLinks />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CrmPaymentHistory />
          </Grid>

        </Grid>
      </ApexChartWrapper>
    </>
  )
}

export default CrmDashboard
