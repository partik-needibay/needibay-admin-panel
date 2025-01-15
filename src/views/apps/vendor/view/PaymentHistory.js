// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Avatar from '@mui/material/Avatar'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import TableContainer from '@mui/material/TableContainer'

// ** Custom Components Imports
import OptionsMenu from 'src/@core/components/option-menu'

const data = [
  {
    imgWidth: 30,
    imgHeight: 10,
    title: '9654464903',
    subtitle: 'UPI Phone',
    imgAlt: 'visa',
    date: '7:45 PM, Monday, 23rd 2023',
    debitAmount: '-$2,820',
    balance: '$10,450',
    imgSrc: '/images/cards/upi.webp',
    description: 'Event Advance payment'
  }
]

const PaymentHistory = () => {
  return (
    <Card>
      <CardHeader
        title='Payment History'
        titleTypographyProps={{ sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' } }}
        action={
          <OptionsMenu
            options={['Last 28 Days', 'Last Month', 'Last Year']}
            iconButtonProps={{ size: 'small', className: 'card-more-options' }}
          />
        }
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ '& .MuiTableCell-root': { py: theme => `${theme.spacing(2.5)} !important` } }}>
              <TableCell>
                <Typography variant='subtitle2' sx={{ textTransform: 'capitalize' }}>
                  Card
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='subtitle2' sx={{ textTransform: 'capitalize' }}>
                  Date & Time
                </Typography>
              </TableCell>
              <TableCell align='right'>
                <Typography variant='subtitle2' sx={{ textTransform: 'capitalize' }}>
                  Amount
                </Typography>
              </TableCell>
              <TableCell align='right'>
                <Typography variant='subtitle2' sx={{ textTransform: 'capitalize' }}>
                  Description
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{ '& .MuiTableCell-root': { border: 0, py: theme => `${theme.spacing(3)} !important` } }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        sx={{
                          mr: 3,
                          width: 50,
                          height: 30,
                          borderRadius: '6px',
                          backgroundColor: 'background.default'
                        }}
                      >
                        <img alt={row.imgAlt} src={row.imgSrc} width={row.imgWidth} height={row.imgHeight} />
                      </Avatar>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                          {row.title}
                        </Typography>
                        <Typography variant='caption' sx={{ whiteSpace: 'nowrap' }}>
                          {row.subtitle}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant='caption'>{row.date}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                        {row.debitAmount}
                      </Typography>
                      <Typography variant='caption'>{row.balance}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <Typography variant='body2' sx={{ color: 'text.primary' }}>
                        {row.description}
                      </Typography>
                      {/* <Typography variant='caption'>{row.balance}</Typography> */}
                    </Box>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default PaymentHistory
