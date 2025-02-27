// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'

const salesData = [
  {
    stats: '8,458',
    color: 'primary',
    title: 'Total Customers',
    icon: <Icon icon='mdi:account-outline' />
  },
  {
    stats: '$28.5k',
    color: 'warning',
    title: 'Customer Aquisition Cost',
    icon: <Icon icon='mdi:poll' />
  },
  {
    color: 'info',
    stats: '2,450k',
    title: 'Customer Lifetime Value',
    icon: <Icon icon='mdi:trending-up' />
  },
  {
    color: 'info',
    stats: '2,450k',
    title: 'Bounce Rate',
    icon: <Icon icon='mdi:trending-up' />
  },
  {
    color: 'info',
    stats: '2,450k',
    title: 'Abandoned Cart Rate',
    icon: <Icon icon='mdi:trending-up' />
  },
  {
    color: 'info',
    stats: '2,450k',
    title: 'Customer Statisfaction',
    icon: <Icon icon='mdi:trending-up' />
  },
  {
    color: 'info',
    stats: '2,450k',
    title: 'Monthly Recurring Revenue',
    icon: <Icon icon='mdi:trending-up' />
  },
  {
    color: 'info',
    stats: '2,450k',
    title: 'Anual Recurring Revenue',
    icon: <Icon icon='mdi:trending-up' />
  },
  {
    color: 'info',
    stats: '2,450k',
    title: 'Gross Margin',
    icon: <Icon icon='mdi:trending-up' />
  },
  {
    color: 'warning',
    stats: '27',
    title: 'Total Open Tickets',
    icon: <Icon icon='mdi:trending-down' />
  },
  {
    color: 'warning',
    stats: '8',
    title: 'Assigned Tickets',
    icon: <Icon icon='mdi:trending-down' />
  },
  {
    color: 'success',
    stats: '15 mins',
    title: 'Average Ticket Resolution',
    icon: <Icon icon='mdi:trending-down' />
  },

]

const renderStats = () => {
  return salesData.map((sale, index) => (
    <Grid item xs={12} sm={4} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <CustomAvatar skin='light' variant='rounded' color={sale.color} sx={{ mr: 4 }}>
          {sale.icon}
        </CustomAvatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h6' sx={{ fontWeight: 600 }}>
            {sale.stats}
          </Typography>
          <Typography variant='caption'>{sale.title}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const EcommerceSalesOverview = () => {
  return (
    <Card>
      <CardHeader
        sx={{ pb: 3.25 }}
        title='Sales Overview'
        titleTypographyProps={{ variant: 'h6' }}
        action={
          <OptionsMenu
            options={['Last 28 Days', 'Last Month', 'Last Year']}
            iconButtonProps={{ size: 'small', className: 'card-more-options' }}
          />
        }
        subheader={
          <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { color: 'success.main' } }}>
            <Typography variant='caption' sx={{ mr: 1.5 }}>
              Total 42.5k Sales
            </Typography>
            <Typography variant='subtitle2' sx={{ color: 'success.main' }}>
              +18%
            </Typography>
            <Icon icon='mdi:chevron-up' fontSize={20} />
          </Box>
        }
      />
      <CardContent>
        <Grid container spacing={6}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default EcommerceSalesOverview
