import React from 'react'
import { useRouter } from 'next/router'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import { Icon } from '@iconify/react'
import styled from '@emotion/styled'
import Tabs from '@mui/material/Tabs'

import Divider from '@mui/material/Divider'



    
function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const SelectedAttribute = () => {
  const router = useRouter()

  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const [data, setData] = useState({})

  useEffect(() => {
    const data = JSON.parse(router.query.data)
    setData(data)
  }, [router.query.data])

  return (
    <>
      <Box display='flex' sx={{ padding: '2rem', justifyContent: 'space-between' }}>
        <Typography variant='h4' gutterBottom>
          {data.atcode}
        </Typography>

        <Button variant='contained' startIcon={<Icon icon='material-symbols:save' />} color='primary' sx={{ ml: 2 }}>
          Save Attribute
        </Button>
      </Box>

      <Box display='flex'>
        <Box
          mt='2rem'
          padding='2rem'
          width='20%'
          sx={{ display: 'flex', alignItems: 'flex-start', background: 'white', flexDirection: 'column' }}
        >
          <Box width='100%' >
            <Typography variant='h6'> Attribute Information</Typography>
            <Divider width='100%' color='#000' />

            <Tabs
              orientation='vertical'
              value={value}
              onChange={handleChange}
              sx={{ borderRight: 1, borderColor: 'divider' }}
            >
              <Tab label='Properties' sx={{ textAlign: 'start'}} />
              <Tab label='Manage Labels' />
              <Tab label='Storefront Properties' />
            </Tabs>
          </Box>
        </Box>

        <Box></Box>
      </Box>
    </>
  )
}

export default SelectedAttribute
