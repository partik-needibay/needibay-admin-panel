import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Button,
  Drawer,
  Pagination,
  Typography,
  FormControlLabel,
  Checkbox,
  Card,
  CardHeader,
  Grid
} from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Box from '@mui/material/Box'
import { fetchProductAttributesData, selectedProductConfiguration, configProductAttributeObjList } from 'src/store/apps/service/category'
import Link from 'next/link'
import StepperAlternativeLabel from 'src/views/forms/form-wizard/StepperAlternativeLabel'
import StepperWrapper from 'src/@core/styles/mui/stepper'
import { styled } from '@mui/material/styles'
import CardContent from '@mui/material/CardContent'
import StepperCustomDot from 'src/views/forms/form-wizard/StepperCustomDot'
import { selectedAtrributes } from 'src/store/apps/catelog'
import Icon from 'src/@core/components/icon'
import MaterialTable from 'material-table'

const steps = [
  {
    title: 'Select Atributes',
    subtitle: 'Select Attributes for the product',
    icon: 'mdi:account-outline'
  },
  {
    title: 'Select Attribute values',
    subtitle: 'Select Available Option for the Product',
    icon: 'mdi:account-outline'
  },
  /* {
    icon: 'mdi:home-outline',
    title: 'Images, videos & Pricing',
    subtitle: 'Add Configurable Product Images and Pricing'
  },
  {
    title: 'Summary',
    subtitle: 'Verify Summary Before Adding',
    icon: 'mdi:map-marker-outline'
  } */
]
const StepperHeaderContainer = styled(CardContent)(({ theme }) => ({
  minWidth: 300,
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('lg')]: {
    borderRight: 0,
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))

const CreateProductConfig = ({ ...props }) => {
  const { open, toggle, attributeList } = props
  const [pageSize, setPageSize] = useState(10)
  const [variation, setVariation] = useState({})
  const [configProductAttribute, setConfigProductAttribute] = useState({})
  const [configProductAttributeList, setConfigProductAttributeList] = useState([])
  const dispatch = useDispatch()

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handlePrev = () => {
    if (activeStep !== 0) {
      setActiveStep(activeStep - 1)
    }
  }

  useEffect(() => {
    dispatch(fetchProductAttributesData())
  }, [])

  const attributes = useSelector(state => state.serviceCategory?.productAttributes?.data)

  const selectedAttributes = useSelector(state => state.catalog?.selectedAtrributes)

  const columns = [
    {
      flex: 1,
      field: 'attributeCode',
      headerName: 'Attribute Code',
      renderCell: ({ row }) => {
        const { attributeCode } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                component={Link}
                variant='subtitle2'
                href='#'
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {attributeCode}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 1,
      field: 'frontendInput',
      headerName: 'Frontend Input Code',
      renderCell: ({ row }) => {
        const { frontendInput } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                component={Link}
                variant='subtitle2'
                href='#'
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {frontendInput}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 1,
      field: 'frontendLabel',
      headerName: 'Frontend Label Text',
      renderCell: ({ row }) => {
        const { frontendLabel } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                component={Link}
                variant='subtitle2'
                href='#'
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {frontendLabel}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 1,
      field: 'attributeOption',
      headerName: 'Config Option',
      renderCell: ({ row }) => {
        const { attributeOption } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                component={Link}
                variant='subtitle2'
                href='#'
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {attributeOption.length > 0 ? 'Select' : 'No Option Available'}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 1,
      field: 'backendType',
      headerName: 'Backend Value Receive As',
      renderCell: ({ row }) => {
        const { backendType } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                component={Link}
                variant='subtitle2'
                href='#'
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {backendType}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 1,
      field: 'sortOrder',
      headerName: 'Frontend Attribute Position Sort',
      renderCell: ({ row }) => {
        const { sortOrder } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                component={Link}
                variant='subtitle2'
                href='#'
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {sortOrder}
              </Typography>
            </Box>
          </Box>
        )
      }
    }
  ]

  const attrOptiionColumns = [
    {
      flex: 1,
      field: 'label',
      headerName: 'Attribute Label',
      renderCell: ({ row }) => {
        const { label } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                component={Link}
                variant='subtitle2'
                href='#'
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {label}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 1,
      field: 'attributeCodeOption',
      headerName: 'Attribute Code',
      renderCell: ({ row }) => {
        const { value } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                component={Link}
                variant='subtitle2'
                href='#'
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {value}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 1,
      field: 'isDisabled',
      headerName: 'Is Diabled',
      renderCell: ({ row }) => {
        const { isDisabled } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                component={Link}
                variant='subtitle2'
                href='#'
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {isDisabled}
              </Typography>
            </Box>
          </Box>
        )
      }
    }
  ]

  const handleAttributeSelect = data => {
    let newArray = []
    if (data?.length > 0) {
      data.map(item => {
        newArray.push(attributes.find(o => o.id == item))
      })
    }
    console.log(newArray)
    dispatch(selectedAtrributes(newArray))
  }

  const saveAttributes = rowSelectionModel => {
    console.log(rowSelectionModel)
    //attributeList(rowSelectionModel)
    toggle()
  }


  // ** States
  const [page, setPage] = useState(1)
  const [activeStep, setActiveStep] = useState(0)
  const handelNext = () => {
    setActiveStep(activeStep + 1)
  }
  const handelPrev = () => {
    setActiveStep(activeStep - 1)
  }
  const handleChange = (event, value) => {
    setPage(value)
  }

  // Drawer  close
  const handleDrawerClose = () => {
    setDrawerOpen(!isDrawerOpen)
  }

  function getAllCombinations(attributes) {
    const keys = Object.keys(attributes)
    const combinations = []

    function generateCombinations(index, currentCombination) {
      if (index === keys.length) {
        combinations.push(currentCombination)
        return
      }

      const currentKey = keys[index]
      const currentValues = attributes[currentKey]

      for (const value of currentValues) {
        generateCombinations(index + 1, [...currentCombination, { [currentKey]: value }])
      }
    }

    generateCombinations(0, [])
    const attributesArray = [];

    // Iterate through each object in the array
    combinations.map((sku, inde) => {
      const productSKUs = []
      for (const obj of sku) {
        debugger
        const values = Object.values(obj)[0]
        productSKUs.push(values) // Push individual values to the product SKU array
      }

      // Combine all values into a single string
      const resultingSKU = productSKUs.join('-')

      console.log('=======================line 418==========================')
      let productConfObject = {};
      productConfObject.id = inde;
      productConfObject.sku = resultingSKU;
      productConfObject.price= null
      attributesArray.push(productConfObject)
      
    })
    console.log('=======================line 427==========================')

    console.log(attributesArray)

    setConfigProductAttributeList(attributesArray)

    return combinations
  }

  const handleSelectedAttrOption = (data, attrObj) => {
    console.log(variation)
    console.log(data)
    console.log(attrObj.attributeCode)
    console.log(attrObj?.attributeOption)
    let attributeAvailableOption = [];
    let sku = ''
    let newArray = []
    if (data?.length > 0) {
      data.map(item => {
        attributeAvailableOption.push(item)
        // newArray.push(attributes.find(o => o.id == item))
        newArray.push(attrObj.attributeCode + item)
      })
    }
    
    setConfigProductAttribute(prev => ({
      ...prev,
      [attrObj?.attributeCode]: attributeAvailableOption
    }))
    setVariation(prev => ({
      ...prev,
      [attrObj?.attributeCode]: newArray
    }))
    console.log(newArray)
  }

  useEffect(() => {
    console.log("==============line462====================")
    console.log(variation)
    console.log(configProductAttribute)
    getAllCombinations(variation)
    dispatch(configProductAttributeObjList(configProductAttribute))
  }, [variation, configProductAttribute])

  useEffect(() => {
    console.log('configProductAttributeList')
    console.log(configProductAttributeList)
  }, [configProductAttributeList])

  const handleCreateProductConfiguration = async () => {
    dispatch(selectedProductConfiguration(configProductAttributeList))
    toggle()
  }

  return (
    <>
      <Drawer
        anchor='right'
        open={open}
        onClose={toggle}
        variant='temporary'
        ModalProps={{ keepMounted: false }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: '75%', sm: '75%', md: '75%', lg: '75%', xl: '75%' } } }}
      >
        <Box sx={{ display: 'flex', m: 5, flexDirection: 'column ' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant='h5' sx={{ mb: 2 }}>
                Add Product Variations
              </Typography>

              <Typography variant='caption'>
                Select attributes and its value for creating the product variation
              </Typography>
            </Box>

            <Box>
              <Button sx={{ mt: 2 }} color='primary' variant='outlined'>
                Add Attribute
              </Button>

              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  color='secondary'
                  variant='outlined'
                  onClick={handlePrev}
                  disabled={activeStep === 0}
                  startIcon={<Icon icon='mdi:arrow-left' />}
                >
                  Back
                </Button>
                <Box mx={2}></Box>
                <Button
                  variant='contained'
                  color={activeStep === steps.length - 1 ? 'success' : 'primary'}
                  {...(!(activeStep === steps.length - 1) ? { endIcon: <Icon icon='mdi:arrow-right' /> } : {})}
                  onClick={() => (activeStep === steps.length - 1 ? handleCreateProductConfiguration() : handleNext())}
                >
                  {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>
              </Box>
            </Box>
          </Box>
          <Box>
            <StepperHeaderContainer>
              <StepperWrapper sx={{ height: '100%', '& .MuiStepLabel-label': { cursor: 'pointer' } }}>
                <Stepper connector={<></>} activeStep={activeStep} orientation='horizontal'>
                  {steps.map((step, index) => {
                    return (
                      <Step
                        key={index}
                        onClick={() => setActiveStep(index)}
                        sx={{ '&.Mui-completed + svg': { color: 'primary.main' } }}
                      >
                        <StepLabel StepIconComponent={StepperCustomDot}>
                          <div className='step-label'>
                            <div>
                              <Typography className='step-title'>{step.title}</Typography>
                              <Typography className='step-subtitle'>{step.subtitle}</Typography>
                            </div>
                          </div>
                        </StepLabel>
                      </Step>
                    )
                  })}
                </Stepper>
              </StepperWrapper>
              `
            </StepperHeaderContainer>
          </Box>
          <Box height='100vh' width='100%' sx={{ mt: 7 }}>
            {activeStep == 0 && (
              <DataGrid
                autoHeight
                rows={attributes}
                onCellClick={handleAttributeSelect}
                onSelectionModelChange={itm => handleAttributeSelect(itm)}
                columns={columns}
                checkboxSelection
                pageSize={pageSize}
                disableSelectionOnClick
                rowsPerPageOptions={[10, 25, 50]}
                onPageSizeChange={newPageSize => setPageSize(newPageSize)}
                isRowSelectable={params => params.row.attributeOption?.length > 0}
                sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                  toolbar: {
                    showQuickFilter: true
                  }
                }}
              />
            )}
            {activeStep == 1 && (
              <>
                {selectedAttributes?.length > 0 &&
                  selectedAttributes?.map((item, index) => {
                    return (
                      <Grid container>
                        <Grid item lg={6}>
                          <Box py={2}>
                            <Card>
                              <Box p={4}>
                                <Typography variant='subtitle2'>{item?.frontendLabel}</Typography>
                              </Box>
                              {console.log('=====================')}
                              {console.log(item.attributeOption)}
                              <CardContent>
                                <DataGrid
                                  key={item?.index}
                                  autoHeight
                                  rows={item?.attributeOption}
                                  onSelectionModelChange={itm => handleSelectedAttrOption(itm, item)}
                                  columns={attrOptiionColumns}
                                  checkboxSelection
                                  pageSize={pageSize}
                                  disableSelectionOnClick
                                  rowsPerPageOptions={[10, 25, 50]}
                                  onPageSizeChange={newPageSize => setPageSize(newPageSize)}
                                />
                              </CardContent>
                            </Card>
                          </Box>
                        </Grid>
                      </Grid>
                    )
                  })}
              </>
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  )
}

export default CreateProductConfig
