// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { fetchData } from 'src/store/apps/quotations'
// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const roleObj = {
  admin: {
    icon: (
      <Box component='span' sx={{ display: 'flex', mr: 2, color: 'error.main' }}>
        <Icon icon='mdi:laptop' />
      </Box>
    )
  },
  author: {
    icon: (
      <Box component='span' sx={{ display: 'flex', mr: 2, color: 'warning.main' }}>
        <Icon icon='mdi:cog' />
      </Box>
    )
  },
  maintainer: {
    icon: (
      <Box component='span' sx={{ display: 'flex', mr: 2, color: 'success.main' }}>
        <Icon icon='mdi:chart-donut' />
      </Box>
    )
  },
  editor: {
    icon: (
      <Box component='span' sx={{ display: 'flex', mr: 2, color: 'info.main' }}>
        <Icon icon='mdi:pencil-outline' />
      </Box>
    )
  },
  subscriber: {
    icon: (
      <Box component='span' sx={{ display: 'flex', mr: 2, color: 'primary.main' }}>
        <Icon icon='mdi:account-outline' />
      </Box>
    )
  }
}

const statusObj = {
  active: { color: 'success' },
  pending: { color: 'warning' },
  inactive: { color: 'secondary' },
  open: { color: 'success' },
  close: { color: 'secondary' }
}

const rows = [
  {
    id: 1,
    role: 'admin',
    status: 'open',
    paymentStatus: 'pending',
    name: 'Jordan Stevenson',
    username: '@jstevenson5c',
    email: 'susanna.Lind57@gmail.com',
    avatarSrc: '/images/avatars/1.png',
    orderId: '10005623',
    qty: '50000',
    phone: '09876543210',
    estimation: '1,00,000 - 1,10,000',
    product: 'Cello Tapes'
  },
  {
    id: 2,
    role: 'editor',
    status: 'close',
    paymentStatus: 'active',
    name: 'Robert Crawford',
    username: '@rcrawford1d',
    avatarSrc: '/images/avatars/3.png',
    email: 'estelle.Bailey10@gmail.com',
    orderId: '10005623',
    qty: '50000',
    phone: '09876543210',
    estimation: '1,00,000 - 1,10,000',
    product: 'Tapes'
  },
  {
    id: 3,
    role: 'author',
    status: 'open',
    paymentStatus: 'inactive',
    name: 'Lydia Reese',
    username: '@lreese3b',
    email: 'milo86@hotmail.com',
    avatarSrc: '/images/avatars/2.png',
    orderId: '10005623',
    qty: '50000',
    phone: '09876543210',
    estimation: '1,00,000 - 1,10,000',
    product: 'Tapes'
  },
  {
    id: 4,
    role: 'editor',
    status: 'close',
    paymentStatus: 'pending',
    name: 'Richard Sims',
    username: '@rsims6f',
    email: 'lonnie35@hotmail.com',
    avatarSrc: '/images/avatars/5.png',
    orderId: '10005623',
    qty: '50000',
    phone: '09876543210',
    estimation: '1,00,000 - 1,10,000',
    product: 'Paper Tapes'
  },
  {
    id: 5,
    status: 'open',
    paymentStatus: 'active',
    role: 'maintainer',
    name: 'Lucile Young',
    username: '@lyoung4a',
    email: 'ahmad_Collins@yahoo.com',
    avatarSrc: '/images/avatars/4.png',
    orderId: '10005623',
    qty: '50000',
    phone: '09876543210',
    estimation: '1,00,000 - 1,10,000',
    product: '24x24 Box'
  },
  {
    id: 6,
    role: 'editor',
    status: 'close',
    paymentStatus: 'pending',
    name: 'Francis Frank',
    username: '@ffrank7e',
    avatarSrc: '/images/avatars/7.png',
    email: 'tillman.Gleason68@hotmail.com',
    orderId: '10005623',
    qty: '50000',
    phone: '09876543210',
    estimation: '1,00,000 - 1,10,000',
    product: '18x18 Box'
  },
  {
    id: 7,
    role: 'subscriber',
    status: 'inactive',
    paymentStatus: 'inactive',
    name: 'Phoebe Patterson',
    email: 'otho21@gmail.com',
    username: '@ppatterson2g',
    avatarSrc: '/images/avatars/8.png',
    orderId: '10005623',
    qty: '50000',
    phone: '09876543210',
    estimation: '1,00,000 - 1,10,000',
    product: '18x18 Box'
  },
  {
    id: 8,
    status: 'active',
    paymentStatus: 'active',
    role: 'subscriber',
    name: 'Curtis Underwood',
    username: '@cunderwood8h',
    avatarSrc: '/images/avatars/3.png',
    email: 'florencio.Little@hotmail.com',
    orderId: '10005623',
    qty: '50000',
    phone: '09876543210',
    estimation: '1,00,000 - 1,10,000',
    product: 'Tapes'
  }
]

const renderUserAvatar = row => {
  if (row.avatarSrc) {
    return <CustomAvatar src={row.avatarSrc} sx={{ mr: 3, width: 34, height: 34 }} />
  } else {
    return (
      <CustomAvatar skin='light' sx={{ mr: 3, width: 34, height: 34, fontSize: '.8rem' }}>
        {getInitials(row.name ? row.name : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const columns = [
  {
    flex: 0.25,
    field: 'order',
    maxWidth: 35,
    headerName: 'Q.ID',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
              {`#${row.id}`}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.25,
    field: 'name',
    maxWidth: 275,
    headerName: 'Customer Info',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
              {row.name}
            </Typography>
            <Typography variant='caption' sx={{ lineHeight: 1.6667 }}>
              {row.phone}
            </Typography>
            <Typography variant='caption' sx={{ lineHeight: 1.6667 }}>
              {row.email}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.3,
    maxWidth: 225,
    minWidth: 175,
    field: 'quoteItems',
    headerName: 'Services',
    renderCell: ({ row }) => {
      return (
        <Box display={'flex'} flexDirection={'column'}>
          {row.quoteItems.length > 0 &&
            row.quoteItems.map((item, index) => {
              /* return <CustomChip label={item.service.serviceName} skin='light' color='primary' /> */
              return (
                <Typography variant='subtitle' fontSize={12} lineHeight={1.3}>
                  {index + 1}&emsp; {item.service.serviceName}
                </Typography>
              )
            })}
        </Box>
      )
    }
  },
  {
    flex: 0.3,
    maxWidth: 165,
    minWidth: 135,
    field: 'quoteTotal',
    headerName: 'Quote Total',
    renderCell: ({ row }) => (
      <Typography variant='body2'>
        {'Rs.'}
        {row.quoteTotal}
        {'/-'}
      </Typography>
    )
  },
  /* {
    flex: 0.15,
    minWidth: 110,
    field: 'is',
    headerName: 'Bidding Status',
    renderCell: ({ row }) => (
      <CustomChip
        skin='light'
        size='small'
        label={row.status}
        color={statusObj[row.status].color}
        sx={{ textTransform: 'capitalize', '& .MuiChip-label': { px: 2.5, lineHeight: 1.385 } }}
      />
    )
  }, */
  {
    flex: 0.15,
    maxWidth: 110,
    minWidth: 75,
    field: 'isEmailSend',
    headerName: 'Email Send',
    renderCell: ({ row }) => (
      <CustomChip
        skin='light'
        size='small'
        label={row.isEmailSend ? 'Sent' : 'Not Sent'}
        color={row.isEmailSend ? 'success' : 'error'}
        sx={{ textTransform: 'capitalize', '& .MuiChip-label': { px: 2.5, lineHeight: 1.385 } }}
      />
    )
  },
  {
    flex: 0.15,
    maxWidth: 110,
    minWidth: 75,
    field: 'isApproved',
    headerName: 'Approval',
    renderCell: ({ row }) => (
      <CustomChip
        skin='light'
        size='small'
        label={row.isApproved ? 'Approved' : 'Pending'}
        color={row.isApproved ? 'success' : 'warning'}
        sx={{ textTransform: 'capitalize', '& .MuiChip-label': { px: 2.5, lineHeight: 1.385 } }}
      />
    )
  },
  /* {
    flex: 0.15,
    minWidth: 110,
    field: 'isRejected',
    headerName: 'Email Send',
    renderCell: ({ row }) => (
      <CustomChip
        skin='light'
        size='small'
        label={row.isEmailSend ? 'Sent' : 'Not Sent'}
        color={row.isEmailSend ? 'success' : 'error'}
        sx={{ textTransform: 'capitalize', '& .MuiChip-label': { px: 2.5, lineHeight: 1.385 } }}
      />
    )
  } */
  {
    flex: 0.15,
    maxWidth: 110,
    minWidth: 75,
    field: 'adPaymentStatus',
    headerName: 'Ad. Pay Status',
    renderCell: ({ row }) => (
      <Box display={'flex'} flexDirection={'column'} alignItems={'flex-end'}>
        {/* <Box pb={1}>
          <Button size='small' variant='outlined' color={'primary'}>
            Pending
          </Button>
        </Box> */}
        <Box>
          <CustomChip
            skin='light'
            size='small'
            label={'Pending'}
            color={'warning'}
            sx={{ textTransform: 'capitalize', '& .MuiChip-label': { px: 2.5, lineHeight: 1.385 } }}
          />
        </Box>
      </Box>
    )
  },
  {
    flex: 0.15,
    minWidth: 110,
    field: 'generateOrder',
    headerName: 'Ad. Pay Status',
    renderCell: ({ row }) => (
      <Box display={'flex'} flexDirection={'column'} alignItems={'flex-end'}>
        {/* <Box pb={1}>
          <Button size='small' variant='outlined' color={'primary'}>
            Pending
          </Button>
        </Box> */}
        <Box>
          <Button size='small' variant='outlined' color={'warning'}>
            Create Order
          </Button>
        </Box>
      </Box>
    )
  },
  {
    flex: 0.15,
    minWidth: 110,
    field: 'action',
    headerName: 'Action',
    renderCell: ({ row }) => (
      <Box display={'flex'} flexDirection={'column'} alignItems={'flex-end'}>
        <Box pb={1}>
          <Button size='small' variant='outlined' color={'primary'}>
            Preview
          </Button>
        </Box>
        <Box>
          <Button size='small' variant='outlined' color={'warning'}>
            Edit
          </Button>
        </Box>
      </Box>
    )
  }
]

const QuotationTable = () => {
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const dispatch = useDispatch()
  const store = useSelector(state => state.quotation.data)
  console.log(store)
  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])
  return (
    <Card>
      {store && (
        <DataGrid
          autoHeight
          rowHeight={110}
          rows={store}
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
  )
}

export default QuotationTable
