// ** MUI Imports
import { useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import TableHeader from 'src/views/apps/roles/TableHeader'
import { fetchData } from 'src/store/apps/lead'



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
  inactive: { color: 'secondary' }
}

const rows = [
  {
    id: 1,
    role: 'admin',
    orderStatus: 'pending',
    paymentStatus: 'pending',
    name: 'Jordan Stevenson',
    username: '@jstevenson5c',
    email: 'susanna.Lind57@gmail.com',
    avatarSrc: '/images/avatars/1.png',
    orderId: '10005623',
    amount: '283'
  },
  {
    id: 2,
    role: 'editor',
    orderStatus: 'active',
    paymentStatus: 'active',
    name: 'Robert Crawford',
    username: '@rcrawford1d',
    avatarSrc: '/images/avatars/3.png',
    email: 'estelle.Bailey10@gmail.com',
    orderId: '10005623',
    amount: '283'
  },
  {
    id: 3,
    role: 'author',
    orderStatus: 'inactive',
    paymentStatus: 'inactive',
    name: 'Lydia Reese',
    username: '@lreese3b',
    email: 'milo86@hotmail.com',
    avatarSrc: '/images/avatars/2.png',
    orderId: '10005623',
    amount: '283'
  },
  {
    id: 4,
    role: 'editor',
    orderStatus: 'pending',
    paymentStatus: 'pending',
    name: 'Richard Sims',
    username: '@rsims6f',
    email: 'lonnie35@hotmail.com',
    avatarSrc: '/images/avatars/5.png',
    orderId: '10005623',
    amount: '283'
  },
  {
    id: 5,
    orderStatus: 'active',
    paymentStatus: 'active',
    role: 'maintainer',
    name: 'Lucile Young',
    username: '@lyoung4a',
    email: 'ahmad_Collins@yahoo.com',
    avatarSrc: '/images/avatars/4.png',
    orderId: '10005623',
    amount: '283'
  },
  {
    id: 6,
    role: 'editor',
    orderStatus: 'pending',
    paymentStatus: 'pending',
    name: 'Francis Frank',
    username: '@ffrank7e',
    avatarSrc: '/images/avatars/7.png',
    email: 'tillman.Gleason68@hotmail.com',
    orderId: '10005623',
    amount: '283'
  },
  {
    id: 7,
    role: 'subscriber',
    orderStatus: 'inactive',
    paymentStatus: 'inactive',
    name: 'Phoebe Patterson',
    email: 'otho21@gmail.com',
    username: '@ppatterson2g',
    avatarSrc: '/images/avatars/8.png',
    orderId: '10005623',
    amount: '283'
  },
  {
    id: 8,
    orderStatus: 'active',
    paymentStatus: 'active',
    role: 'subscriber',
    name: 'Curtis Underwood',
    username: '@cunderwood8h',
    avatarSrc: '/images/avatars/3.png',
    email: 'florencio.Little@hotmail.com',
    orderId: '10005623',
    amount: '283'
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
    minWidth: 200,
    headerName: 'Customer IDs',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
            {`#${row.orderId}`}
          </Typography>
        </Box>
      </Box>
      )
    }
  },
  {
    flex: 0.25,
    field: 'name',
    minWidth: 200,
    headerName: 'Customer',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
              {row.name}
            </Typography>
            <Typography variant='caption' sx={{ lineHeight: 1.6667 }}>
              {row.username}
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
    maxWidth: 110,
    field: 'amount',
    headerName: 'Amount',
    renderCell: ({ row }) => <Typography variant='body2'>{row.amount}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 110,
    field: 'orderStatus',
    headerName: 'Order Status',
    renderCell: ({ row }) => (
      <CustomChip
        skin='light'
        size='small'
        label={row.orderStatus}
        color={statusObj[row.orderStatus].color}
        sx={{ textTransform: 'capitalize', '& .MuiChip-label': { px: 2.5, lineHeight: 1.385 } }}
      />
    )
  },
  {
    flex: 0.15,
    minWidth: 110,
    field: 'paymentStatus',
    headerName: 'Order Status',
    renderCell: ({ row }) => (
      <CustomChip
        skin='light'
        size='small'
        label={row.paymentStatus}
        color={statusObj[row.paymentStatus].color}
        sx={{ textTransform: 'capitalize', '& .MuiChip-label': { px: 2.5, lineHeight: 1.385 } }}
      />
    )
  }
]

const Customer = () => {
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [pageSize, setPageSize] = useState(10)

  // ** Hooks
  const dispatch = useDispatch()
  
  useEffect(() => {

    dispatch(
      fetchData({
        role: '',
        q: value,
        status: '',
        currentPlan: plan
      })
    )
  }, [dispatch, plan, value])

  const store = useSelector(state => state.lead)
  console.log(store);

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const handlePlanChange = useCallback(e => {
    setPlan(e.target.value)
  }, [])
  return (
    <Card>
      <div style={{ height: 700, width: '100%' }}>
        <TableHeader plan={plan} value={value} handleFilter={handleFilter} handlePlanChange={handlePlanChange} />
        <DataGrid 
          rowHeight={75} 
          rows={rows} 
          columns={columns} 
          disableSelectionOnClick
          checkboxSelection />
      </div>
    </Card>
  )
}

export default Customer
