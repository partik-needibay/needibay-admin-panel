// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import Link from 'next/link'
import OptionsMenu from 'src/@core/components/option-menu'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { fetchData } from 'src/store/apps/event'
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
  /*   {
    flex: 0.35,
    field: 'id',
    headerName: 'Event Id',
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
  }, */
  {
    flex: 0.25,
    field: 'eventTitle',
    maxWidth: 275,
    headerName: 'Event Title',
    editable: true,
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
              {row.eventTitle}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.25,
    field: 'eventDescription',
    maxWidth: 275,
    headerName: 'Description',
    editable: true,
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
              {row.eventDescription}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.25,
    field: 'eventStartDate',
    maxWidth: 275,
    headerName: 'Start At',
    editable: true,
    type: 'dateTime',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
              {`${row.eventStartDate} ${row.eventStartTime}`}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.25,
    field: 'eventEndDate',
    maxWidth: 275,
    editable: true,
    headerName: 'End At',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
              {`${row.eventEndDate} ${row.eventEndTime}`}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.25,
    field: 'status',
    maxWidth: 275,
    headerName: 'Status',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
              {`Active`}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 130,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title='Delete Invoice'>
          <IconButton size='small' sx={{ mr: 0.5 }} onClick={() => dispatch(deleteInvoice(row.id))}>
            <Icon icon='mdi:delete-outline' />
          </IconButton>
        </Tooltip>
        <Tooltip title='View'>
          <IconButton size='small' component={Link} sx={{ mr: 0.5 }} href={`/event/${row.id}`}>
            <Icon icon='mdi:eye-outline' />
          </IconButton>
        </Tooltip>
        <OptionsMenu
          iconProps={{ fontSize: 20 }}
          iconButtonProps={{ size: 'small' }}
          menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
          options={[
            {
              text: 'Download',
              icon: <Icon icon='mdi:download' fontSize={20} />
            },
            {
              text: 'Edit',
              href: `/apps/invoice/edit/${row.id}`,
              icon: <Icon icon='mdi:pencil-outline' fontSize={20} />
            },
            {
              text: 'Duplicate',
              icon: <Icon icon='mdi:content-copy' fontSize={20} />
            }
          ]}
        />
      </Box>
    )
  }
]

const EventTable = () => {
  const [pageSize, setPageSize] = useState(10)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])
  const store = useSelector(state => state.event.data)

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

export default EventTable
