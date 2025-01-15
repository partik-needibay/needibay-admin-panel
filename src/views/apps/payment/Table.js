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
import { fetchData } from 'src/store/apps/payment'
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
    flex: 0.35,
    field: 'id',
    headerName: 'Payment Id',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
              {`${row.id}`}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.25,
    field: 'orderId',
    maxWidth: 275,
    headerName: 'Order Id',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
              {row.orderId}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.25,
    field: 'totalAmount',
    maxWidth: 275,
    headerName: 'Total Amount',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
              {`Rs.${row.totalAmount}/-`}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.25,
    field: 'paidAmount',
    maxWidth: 275,
    headerName: 'Paid Amount',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
              {`Rs.${row.paidAmount}/-`}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.25,
    field: 'dueAmount',
    maxWidth: 275,
    headerName: 'Due Amount',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
              {`Rs.${row.dueAmount}/-`}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 110,
    field: 'action',
    headerName: 'Action',
    renderCell: ({ row }) => <Box display={'flex'} flexDirection={'column'} alignItems={'flex-end'}></Box>
  }
]

const PaymentTable = () => {
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])
  const store = useSelector(state => state.payment.data)
  console.log(store)

  return (
    <Card>
      {store && store.data && (
        <DataGrid
          autoHeight
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
    </Card>
  )
}

export default PaymentTable
