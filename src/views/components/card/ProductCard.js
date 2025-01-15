// ** MUI Imports
import {Card, Box} from '@mui/material'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { useEffect } from 'react'

const ProductCardLook = (data) => {
  useEffect(() => {
    console.log("=================create look")
    console.log(data);
  }, [])
  return (
    <Card>
      <CardMedia sx={{ height: 140 }} image={data?.data?.media.length > 0 && data?.data?.media[0].value} />
      <CardContent sx={{ p: theme => `${theme.spacing(4, 5)} !important` }}>
        <Typography variant='h6' sx={{ mb: 2 }}>
          {data?.data?.productName}
        </Typography>
        <Typography sx={{ mb: 2 }}>{`Rs.${data?.data?.basePrice}/-`}</Typography>
        {/* <Typography variant='body2'>
          3.1GHz 6-core 10th-generation Intel Core i5 processor, Turbo Boost up to 4.5GHz
        </Typography> */}
      </CardContent>
      <Box display="flex" width="100%" flexDirection={"column"} pb={1}>

      <Button size='large' variant='contained' sx={{ width: '100%', }}>
        Try On Model
      </Button>
      <Box py={1}></Box>
      <Button size='large' variant='contained' sx={{ width: '100%', }}>
        Select From Model
      </Button>
      </Box>
      
    </Card>
  )
}

export default ProductCardLook
