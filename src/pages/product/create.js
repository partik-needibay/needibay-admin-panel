import React, { Fragment, useState, useEffect } from 'react'
import AccordianIcon from 'src/@core/components/icon'
import styled from '@emotion/styled'
import { blue, brown, purple } from '@mui/material/colors'
import { useDispatch, useSelector } from 'react-redux'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import CreateProductConfig from './createProductConfig'
import { fetchData } from 'src/store/apps/service'
import { fetchProductCategoryData, createNewProduct } from 'src/store/apps/service/category'
import { fetchProductAttributesData, selectedProductConfiguration } from 'src/store/apps/service/category'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Switch
} from '@mui/material'
import RelatedProductDrawer from 'src/views/apps/product/RelatedProductDrawer'
import AttributeSelect from 'src/views/apps/product/AttributeSelect'
import { List, ListItem, ListItemIcon, ListItemText, Card, CardContent } from '@mui/material'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import DialogAlert from 'src/views/components/dialogs/DialogAlert'
import DialogHsnCode from 'src/views/components/dialogs/DialogHsnCode'
import productTaxPreference from 'src/data/productTaxPreference'
import attribute from 'src/data/attribute'
import ProductFileUploadMultiple from 'src/views/components/fileUpload/productFileUploadMultiple'
import DynamicPricingTable from 'src/views/apps/product/DynamicPricingTable'
import { RelatedProductGrid } from 'src/views/apps/product/RelatedProductGrid'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import MaterialTable, { MTableBodyRow } from 'material-table'
import { forwardRef } from 'react'
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'

export const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
}

function Create() {
  const dispatch = useDispatch()
  const [shortDescription, setShortDecription] = useState(EditorState.createEmpty())
  const [longDescription, setLongDescription] = useState(EditorState.createEmpty())
  const [isRelatedDrawerOpen, setRelatedDrawerOpen] = useState(false)
  const [isAttributeDrawerOpen, setAttributeDrawerOpen] = useState(false)
  const [isConfigDrawerOpen, setConfigDrawerOpen] = useState(false)
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [relatedConfig, setRelatedConfig] = useState([])
  const [attributeInfo, setAttributeInfo] = useState([])
  const [extendedAttribute, setExtendedAtrribute] = useState([])
  const [data, setData] = useState([])
  const [formInitialValues, setFormInitialValues] = useState({
    categoryId: '',
    productType: '',
    sku: '',
    productName: '',
    productSlug: '',
    basePrice: '',
    baseCommission: '',
    baseCommissionType: '',
    hsnCode: '',
    taxId: '',
    taxPercent: '',
    isVariant: false,
    parentConfigProductId: null,
    isDiscounted: false,
    isCustomizable: false,
    hasOption: false,
    isActive: false,
    isSampleOrderEnable: false,
    taxPreference: '',
    metaTitle: '',
    metaDescription: '',
    searchKeywords: '',
    isStoreVisible:false,
    deliveryCharge: 0.00
  })

  useEffect(() => {
    dispatch(fetchProductCategoryData())
  }, [dispatch])

  const categoryData = useSelector(state => state.serviceCategory?.productCategoryData?.data)
  const selectedProductConfigurationSKU = useSelector(state => state.serviceCategory?.selectedProductConfigurationSKU)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const [weight, setWeight] = useState(false)

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

  const store = useSelector(state => state.service)

  const handleConfigData = data => {
    console.log(data)
    setRelatedConfig(data)
  }

  const handleAttributeData = data => {
    console.log(data)
    setAttributeInfo(data)
  }

  const clearSelection = () => {
    setRelatedProducts([])
  }

  const handleConfigDrawerOpen = () => {
    setConfigDrawerOpen(!isConfigDrawerOpen)
  }

  const handleRelatedProduct = () => {
    setRelatedDrawerOpen(!isRelatedDrawerOpen)
  }

  const handleProductTypeChange = async e => {
    setFormInitialValues(prev => ({
      ...prev,
      productType: e.target.value
    }))
  }

  const handleHsnSearchOpen = () => {
    setIsOpen(true)
  }

  const handleAttributeDrawerOpen = () => {
    setAttributeDrawerOpen(!isAttributeDrawerOpen)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }
  const handleDrawerOpen = () => {
    setDrawerOpen(!isDrawerOpen)
  }

  const handleExtendedAttribute = (e, setFieldValue) => {
    setFieldValue(e.target.name, e.target.value)
  }

  const handleExtendedAttributeSwitch = (e, setFieldValue) => {
    console.log(e.target.name)
    setFieldValue(e.target.name, e.target.value)
    setFieldValue(e.target.name, !formInitialValues[e.target.name])
    setFormInitialValues({ ...formInitialValues, [e.target.name]: !formInitialValues[e.target.value] })
  }

  const toCamelCase = str => {
    return str.toLowerCase().replace(/_([a-z])/g, function (match, letter) {
      return letter.toUpperCase()
    })
  }

  const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: blue[500],
    color: theme.palette.getContrastText(brown[500]),
    height: '40px',
    '&:hover': {
      backgroundColor: purple[700]
    }
  }))

  const productSchema = yup.object().shape({
    productType: yup.string().required('required'),
    categoryId: yup.string().required('required'),
    productType: yup.string().required('required'),
    sku: yup.string().required('required'),
    productName: yup.string().required('required'),
    productSlug: yup.string().required('required'),
    basePrice: yup.string().required('required'),
    baseCommission: yup.string().required('required'),
    baseCommissionType: yup.string().required('required'),
    taxPreference: yup.string().required('required'),
    taxPercent: yup.string().when("taxPreference", {
      is: 1,
      then: yup.string().required("required")
    })
  })

  const handleFormSubmit = async (values, errors) => {
    console.log(errors)
    console.log(values)
    const shortDescContentState = shortDescription.getCurrentContent()
    const shortDescRawContent = convertToRaw(shortDescContentState)
    const shortDescHtmlContent = draftToHtml(shortDescRawContent)
    const shortDescIsEmpty = !shortDescRawContent.blocks.some(block => block.text.trim() !== '')

    if (shortDescIsEmpty) {
      errors.setFieldError('shortDescription', 'required')
      console.log('Editor content is empty')
      return false
    } else {
      values.shortDescription = shortDescHtmlContent
    }

    const longDescContentState = longDescription.getCurrentContent()
    const longDescRawContent = convertToRaw(longDescContentState)
    const longDescHtmlContent = draftToHtml(longDescRawContent)
    const longDescIsEmpty = !longDescRawContent.blocks.some(block => block.text.trim() !== '')

    if (longDescIsEmpty) {
      errors.setFieldError('longDescription', 'required')
      console.log('Editor content is empty')
      return false
    } else {
      values.longDescription = longDescHtmlContent
    }

    if (values.productType == 'CONFIGURABLE') {
      let configuration = []
      values.hasOption = true
      selectedProductConfigurationSKU.map(item => {
        let productVariation = structuredClone(values)
        productVariation.sku = productVariation.sku + '-' + item.sku
        productVariation.hasOption = false
        productVariation.isVariant = true
        if (item.price) {
          productVariation.basePrice = item.price
        }
        productVariation.productType = 'SIMPLE'
        productVariation.configuration = []
        configuration.push(productVariation)
      })
      values.configuration = configuration
    }
    console.log(values)
    dispatch(createNewProduct({ ...values }))
      .then(response => {
        if (response.meta.requestStatus === 'fulfilled') {
          console.log(response)
          if (response?.payload?.success) {
            toast.success(response?.payload?.message, { theme: 'light' })
          } else {
            toast.error(response?.payload?.message, { theme: 'light' })
          }
        } else {
          toast.error('Something went wrong!', { theme: 'light' })
        }
      })
      .catch(error => {
        toast.error('Something went wrong!', { theme: 'light' })
      })
  }

  const handleEnable = async setFieldValue => {
    setFieldValue('isActive', !formInitialValues.isActive)
    setFormInitialValues({ ...formInitialValues, isActive: !formInitialValues.isActive })
  }

  const handleStoreVisibility = async setFieldValue => {
    setFieldValue('isStoreVisible', !formInitialValues.isStoreVisible)
    setFormInitialValues({ ...formInitialValues, isStoreVisible: !formInitialValues.isStoreVisible })
  }

  const handleIsCustomizable = async setFieldValue => {
    setFieldValue('isCustomizable', !formInitialValues.isCustomizable)
    setFormInitialValues({ ...formInitialValues, isCustomizable: !formInitialValues.isCustomizable })
  }
  const handleIsSampleOrderEnable = async setFieldValue => {
    setFieldValue('isSampleOrderEnable', !formInitialValues.isSampleOrderEnable)
    setFormInitialValues({ ...formInitialValues, isSampleOrderEnable: !formInitialValues.isSampleOrderEnable })
  }

  useEffect(() => {
    dispatch(fetchProductAttributesData())
  }, [])

  /*   useEffect(() => {
    if(selectedProductConfigurationSKU?.length > 0){
      
      setData([...data, selectedProductConfigurationSKU])
    }
  }, [selectedProductConfigurationSKU])
 */
  const attributes = useSelector(state => state.serviceCategory?.productAttributes?.data)
  const relatedProductsState = useSelector(state => state.serviceCategory?.addRelatedProducts)

  const handleProductConfigurationPrice = (p, e) => {
    let updateProductConfSKUArr = []

    selectedProductConfigurationSKU?.map(item => {
      let updateProductConfSKUObj = {}
      updateProductConfSKUObj.id = item.id
      updateProductConfSKUObj.sku = item.sku
      updateProductConfSKUObj.price = item.price
      if (item.sku == p?.row?.sku) {
        if (item.price != p?.row?.sku) {
          updateProductConfSKUObj.price = e.target.value
        }
      }
      updateProductConfSKUArr.push(updateProductConfSKUObj)
    })

    console.log(updateProductConfSKUArr)
    dispatch(selectedProductConfiguration(updateProductConfSKUArr))
  }

  /* const onSubmit = () => toast.success('Form Submitted') */
  return (
    <>
      <Grid container spacing={5}>
        <Grid item lg={2}></Grid>
        <Grid item lg={8}>
          <Card>
            <CardContent>
              <Formik initialValues={formInitialValues} validationSchema={productSchema} onSubmit={handleFormSubmit}>
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                  <form
                    onSubmit={handleSubmit}  /* onSubmit={e => {
                      e.preventDefault()
                      console.log(errors)
                      console.log(values)
                    }} */
                  >
                    <Button size='small' variant='outlined' color='primary' type='submit'>
                      Create Product
                    </Button>
                    <List>
                      <ListItem>
                        <ListItemIcon sx={{ width: 175 }}>Enable Product</ListItemIcon>
                        <ListItemText>
                          <Switch
                            checked={formInitialValues.isActive ? true : false}
                            onChange={() => handleEnable(setFieldValue)}
                          />
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ width: 175 }}>Store Visibility</ListItemIcon>
                        <ListItemText>
                          <Switch
                            checked={formInitialValues.isStoreVisible ? true : false}
                            onChange={() => handleStoreVisibility(setFieldValue)}
                          />
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ width: 175 }}>Is Customizable</ListItemIcon>
                        <ListItemText>
                          <Switch
                            checked={formInitialValues.isCustomizable ? true : false}
                            onChange={() => handleIsCustomizable(setFieldValue)}
                          />
                        </ListItemText>
                      </ListItem>

                      <ListItem>
                        <ListItemIcon sx={{ width: 175 }}>Catalog Category</ListItemIcon>
                        <ListItemText>
                          <FormControl fullWidth error={errors['categoryId'] ? true : false}>
                            <InputLabel id='product-type-select-label'>Product Category Select</InputLabel>
                            <Select
                              name='categoryId'
                              label='Product Catrgory'
                              defaultValue=''
                              id='demo-simple-select-outlined'
                              labelId='demo-simple-select-outlined-label'
                              size='small'
                              fullWidth
                              onChange={handleChange}
                            >
                              <MenuItem value={''} selected>
                                None
                              </MenuItem>
                              {categoryData &&
                                categoryData?.content?.map((item, index) => {
                                  return <MenuItem value={item?.id}>{item?.categoryName}</MenuItem>
                                })}
                            </Select>
                            <FormHelperText>{errors['categoryId']}</FormHelperText>
                          </FormControl>
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ width: 175 }}>Product Type</ListItemIcon>
                        <ListItemText>
                          <FormControl fullWidth error={errors['productType'] ? true : false}>
                            <InputLabel id='product-type-select-label'>Product Type</InputLabel>
                            <Select
                              name={'productType'}
                              label='Product Type'
                              defaultValue=''
                              id='product-type-select'
                              labelId='product-type-select'
                              size='small'
                              fullWidth
                              placeholder='e.g. Simple or Configurable'
                              onChange={handleChange}
                            >
                              <MenuItem value={'SIMPLE'}>Simple</MenuItem>
                              <MenuItem value={'CONFIGURABLE'}>Configurable</MenuItem>
                            </Select>
                            <FormHelperText>{errors['productType']}</FormHelperText>
                          </FormControl>
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ width: 175 }}>Product Name</ListItemIcon>
                        <ListItemText>
                          <TextField
                            fullWidth
                            size='small'
                            name='productName'
                            label='Product Name'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.productName || ''}
                            errorText={touched.productName && errors.productName}
                            error={touched['productName'] && !!errors['productName']}
                            helperText={errors['productName']}
                          />
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ width: 175 }}>HSN Code</ListItemIcon>
                        <ListItemText>
                          <Grid container>
                            <Grid item lg={8}>
                              <Box display={'flex'} flexDirection={'row'}>
                                <TextField
                                  fullWidth
                                  size='small'
                                  name='hsnCode'
                                  label='Product HSN Code'
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.hsnCode || ''}
                                  errorText={touched.hsnCode && errors.hsnCode}
                                  error={touched['hsnCode'] && !!errors['hsnCode']}
                                  helperText={errors['hsnCode']}
                                  onClick={handleHsnSearchOpen}
                                />
                              </Box>
                            </Grid>
                            <Grid item lg={4}>
                              <Box mx={4}>
                                <DialogHsnCode open={handleHsnSearchOpen} />
                              </Box>
                            </Grid>
                          </Grid>
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ width: 175 }}>SKU</ListItemIcon>
                        <ListItemText>
                          <TextField
                            fullWidth
                            size='small'
                            name='sku'
                            label='Product SKU'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.sku || ''}
                            errorText={touched.sku && errors.sku}
                            error={touched['sku'] && !!errors['sku']}
                            helperText={errors['sku']}
                          />
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ width: 175 }}>Product Slug</ListItemIcon>
                        <ListItemText>
                          <TextField
                            fullWidth
                            size='small'
                            name='productSlug'
                            label='Product Slug'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.productSlug || ''}
                            errorText={touched.productSlug && errors.productSlug}
                            error={touched['productSlug'] && !!errors['productSlug']}
                            helperText={errors['productSlug']}
                          />
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ width: 175 }}>Opt For Sample Order</ListItemIcon>
                        <ListItemText>
                          <Switch
                            checked={formInitialValues.isSampleOrderEnable ? true : false}
                            onChange={() => handleIsSampleOrderEnable(setFieldValue)}
                          />
                        </ListItemText>
                      </ListItem>
                      {values.isSampleOrderEnable && (
                        <ListItem>
                          <ListItemIcon sx={{ width: 175 }}>Delivery Charge</ListItemIcon>
                          <ListItemText>
                            <TextField
                              fullWidth
                              size='small'
                              name='deliveryCharge'
                              label='Please add valid numerical price value'
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.deliveryCharge || ''}
                              errorText={touched.deliveryCharge && errors.deliveryCharge}
                              error={touched['deliveryCharge'] && !!errors['deliveryCharge']}
                              helperText={errors['deliveryCharge']}
                              placeholder='Please add valid numerical price value'
                            />
                          </ListItemText>
                        </ListItem>
                      )}
                      <ListItem>
                        <ListItemIcon sx={{ width: 175 }}>Base Price</ListItemIcon>
                        <ListItemText>
                          <TextField
                            fullWidth
                            size='small'
                            name='basePrice'
                            label='Please add valid numerical price value'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.basePrice || ''}
                            errorText={touched.basePrice && errors.basePrice}
                            error={touched['basePrice'] && !!errors['basePrice']}
                            helperText={errors['basePrice']}
                            placeholder='Please add valid numerical price value'
                          />
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ width: 175 }}>Base Commission TYPE</ListItemIcon>
                        <ListItemText>
                          <Select
                            name='baseCommissionType'
                            label='Commission Type'
                            defaultValue=''
                            id='commission-type'
                            labelId='commission-type'
                            size='small'
                            fullWidth
                            placeholder='e.g. Flat or Percent Portion'
                            onChange={handleChange}
                          >
                            <MenuItem value={'FLAT'}>FLAT</MenuItem>
                            <MenuItem value={'PERCENT'}>PERCENT</MenuItem>
                          </Select>
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ width: 175 }}>Base Commission</ListItemIcon>
                        <ListItemText>
                          <TextField
                            fullWidth
                            size='small'
                            name='baseCommission'
                            label='Please add valid numerical value'
                            placeholder='Please add valid numerical value'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.baseCommission || ''}
                            errorText={touched.baseCommission && errors.baseCommission}
                            error={touched['baseCommission'] && !!errors['baseCommission']}
                            helperText={errors['baseCommission']}
                          />
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ width: 175 }}>Tax Preference</ListItemIcon>
                        <ListItemText>
                          <FormControl fullWidth>
                            <InputLabel id='tax-preference'>Select Tax Preference</InputLabel>
                            <Select
                              name='taxPreference'
                              label='Tax Preference'
                              defaultValue=''
                              id='tax-preference'
                              labelId='tax-preference'
                              size='small'
                              fullWidth
                              placeholder='e.g. Taxable / Non Taxable'
                              onChange={handleChange}
                            >
                              {productTaxPreference.map(item => {
                                return <MenuItem value={item?.value}>{item?.label}</MenuItem>
                              })}
                            </Select>
                          </FormControl>
                        </ListItemText>
                      </ListItem>
                      {values.taxPreference == 1 && (
                        <>
                          <ListItem>
                            <ListItemIcon sx={{ width: 175 }}>Tax Percent</ListItemIcon>
                            <ListItemText>
                              <TextField
                                fullWidth
                                size='small'
                                name='taxPercent'
                                label='Please add valid numerical value'
                                placeholder='Please add valid numerical value'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.taxPercent || ''}
                                errorText={touched.taxPercent && errors.taxPercent}
                                error={touched['taxPercent'] && !!errors['taxPercent']}
                                helperText={errors['taxPercent']}
                              />
                            </ListItemText>
                          </ListItem>
                        </>
                      )}

                      <ListItem>
                        <ListItemIcon sx={{ width: 175 }}>Short Description</ListItemIcon>
                        <ListItemText>
                          <Box style={{ border: 'solid #f0f0f0 1px' }}>
                            <FormControl fullWidth error={errors['shortDescription'] ? true : false}>
                              <ReactDraftWysiwyg
                                editorState={shortDescription}
                                onEditorStateChange={data => setShortDecription(data)}
                              />
                              <FormHelperText>{errors['shortDescription']}</FormHelperText>
                            </FormControl>
                          </Box>
                          {/* <TextField
                          rows={4}
                          multiline
                          fullWidth
                          label='Category Description for Store View'
                          defaultValue='Category Description for Store View'
                        /> */}
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ width: 175 }}>Detailed Description</ListItemIcon>
                        <ListItemText>
                          <Box style={{ border: 'solid #f0f0f0 1px' }}>
                            <FormControl fullWidth error={errors['longDescription'] ? true : false}>
                              <ReactDraftWysiwyg
                                editorState={longDescription}
                                onEditorStateChange={data => setLongDescription(data)}
                              />
                              <FormHelperText>{errors['longDescription']}</FormHelperText>
                            </FormControl>
                          </Box>
                          {/* <TextField
                          rows={4}
                          multiline
                          fullWidth
                          label='Category Description for Store View'
                          defaultValue='Category Description for Store View'
                        /> */}
                        </ListItemText>
                      </ListItem>
                      {/* <Button size='small' variant='contained' onClick={handleAttributeDrawerOpen}>
                        Add Attributes
                      </Button>
                      <AttributeSelect
                        attributeList={handleAttributeData}
                        open={isAttributeDrawerOpen}
                        toggle={handleAttributeDrawerOpen}
                      /> */}
                      <Box>
                        {attributeInfo.length > 0 &&
                          attributeInfo.map((item, index) => <Typography key={index}>{item}</Typography>)}
                      </Box>
                      {values.productType == 'CONFIGURABLE' && (
                        <Accordion>
                          {selectedProductConfigurationSKU?.length > 0 ? (
                            <>
                              <DataGrid
                                autoHeight
                                rows={selectedProductConfigurationSKU}
                                onCellEditStop={(p, e) => handleProductConfigurationPrice(p, e)}
                                columns={[
                                  {
                                    flex: 1,
                                    field: 'sku',
                                    headerName: 'SKU'
                                  },
                                  {
                                    flex: 1,
                                    field: 'price',
                                    headerName: 'Variation Price',
                                    editable: true
                                  }
                                ]}
                              />

                              {/* <MaterialTable
                                title='Pricing List'
                                icons={tableIcons}
                                data={data}
                                columns={[{ title: 'Product Variation SKU', field: 'sku', type: 'string' }]}
                                editable={{
                                  onRowAdd: newData =>
                                    new Promise((resolve, reject) => {
                                      setTimeout(() => {
                                        
                                        setData([...data, newData])
                        
                                        resolve()
                                      }, 1000)
                                    }),
                                  onRowUpdate: (newData, oldData) =>
                                    new Promise((resolve, reject) => {
                                      setTimeout(() => {
                                        const dataUpdate = [...data]
                                        const index = oldData.tableData.id
                                        dataUpdate[index] = newData
                                        setData([...dataUpdate])
                        
                                        resolve()
                                      }, 1000)
                                    }),
                                  onRowDelete: oldData =>
                                    new Promise((resolve, reject) => {
                                      setTimeout(() => {
                                        const dataDelete = [...data]
                                        const index = oldData.tableData.id
                                        dataDelete.splice(index, 1)
                                        setData([...dataDelete])
                        
                                        resolve()
                                      }, 1000)
                                    })
                                }}
                              /> */}
                            </>
                          ) : (
                            <>
                              <AccordionSummary
                                id='panel-header-1'
                                aria-controls='panel-content-1'
                                expandIcon={<AccordianIcon icon='mdi:chevron-down' />}
                                sx={{ marginTop: '40px', marginLeft: '0px' }}
                              >
                                <Typography>Configurations</Typography>
                              </AccordionSummary>
                              <AccordionDetails sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ width: '70%' }}>
                                  Configurable products allow customers to choose options (Ex: shirt color). You need to
                                  create a simple product for each configuration (Ex: a product for each color).
                                </Typography>
                                <CustomButton variant='contained' onClick={handleDrawerOpen}>
                                  Create configuration
                                </CustomButton>
                              </AccordionDetails>
                            </>
                          )}
                        </Accordion>
                      )}

                      <CreateProductConfig open={isDrawerOpen} toggle={handleDrawerOpen} />
                      <Accordion>
                        <AccordionSummary
                          id='panel-header-1'
                          aria-controls='panel-content-1'
                          expandIcon={<AccordianIcon icon='mdi:chevron-down' />}
                        >
                          <Typography>Image and Videos</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <ProductFileUploadMultiple />
                        </AccordionDetails>
                      </Accordion>
                      <Accordion>
                        <AccordionSummary
                          id='panel-header-1'
                          aria-controls='panel-content-1'
                          expandIcon={<AccordianIcon icon='mdi:chevron-down' />}
                        >
                          <Typography>Search Engine Optimization</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Grid container spacing={5}>
                            <Grid item xs={12} sm={6}>
                              <FormControl fullWidth>
                                <TextField
                                  fullWidth
                                  size='small'
                                  name='urlKey'
                                  label='Please add URL Key'
                                  placeholder='Please add URL Key'
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.urlKey || ''}
                                  errorText={touched.urlKey && errors.urlKey}
                                  error={touched['urlKey'] && !!errors['urlKey']}
                                  helperText={errors['urlKey']}
                                />
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <FormControl fullWidth>
                                <TextField
                                  fullWidth
                                  size='small'
                                  name='metaTitle'
                                  label='Please Meta Title'
                                  placeholder='Please Meta Title'
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.metaTitle || ''}
                                  errorText={touched.metaTitle && errors.metaTitle}
                                  error={touched['metaTitle'] && !!errors['metaTitle']}
                                  helperText={errors['metaTitle']}
                                />
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <FormControl fullWidth>
                                <TextField
                                  fullWidth
                                  size='small'
                                  multiline
                                  rows={6}
                                  name='searchKeywords'
                                  label='Please Search Keywrods'
                                  placeholder='Please Search Keywrods'
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.searchKeywords || ''}
                                  errorText={touched.searchKeywords && errors.searchKeywords}
                                  error={touched['searchKeywords'] && !!errors['searchKeywords']}
                                  helperText={errors['searchKeywords']}
                                />
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <FormControl fullWidth>
                                <>
                                  <TextField
                                    multiline
                                    rows={5}
                                    value={values.metaDescription || ''}
                                    name='metaDescription'
                                    label=' MetaDescription'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Leonard'
                                    aria-describedby='validation-basic-first-name'
                                    onFocus={handleFocus}
                                  />
                                  <h5 style={{ margin: '0px', fontSize: '10px' }}>
                                    Maximum 255 chars. Meta Description should optimally be between 150-160 characters
                                  </h5>
                                </>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </AccordionDetails>
                      </Accordion>

                      <Accordion>
                        <AccordionSummary
                          id='panel-header-1'
                          aria-controls='panel-content-1'
                          expandIcon={<AccordianIcon icon='mdi:chevron-down' />}
                          sx={{ marginLeft: '0px' }}
                        >
                          <Typography> Related Products, Up Sells and Cross Sells</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box>
                            <Box
                              width='100%'
                              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                              <Box>
                                <Typography variant='caption' sx={{ width: '70%' }}>
                                  Related products are shown to customers in addition to the item the customer is
                                  looking at.{' '}
                                </Typography>
                              </Box>
                              <Box>
                                {/* {relatedProductsState.length > 0 && (
                                  <Button sx={{ marginRight: '1rem' }} variant='outline' onClick={clearSelection}>
                                    Clear Selection
                                  </Button>
                                )} */}

                                <CustomButton onClick={handleRelatedProduct} variant='contained'>
                                  Add Related Products
                                </CustomButton>
                              </Box>

                              <RelatedProductDrawer
                                listRelatedProducts={setRelatedProducts}
                                open={isRelatedDrawerOpen}
                                toggle={handleRelatedProduct}
                              />
                            </Box>

                            <Box mt='2rem'>
                              {relatedProductsState.length > 0 && (
                                <RelatedProductGrid checkboxSelection={false} relatedProducts={relatedProductsState} />
                              )}
                            </Box>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion>
                        <AccordionSummary
                          id='panel-header-1'
                          aria-controls='panel-content-1'
                          expandIcon={<AccordianIcon icon='mdi:chevron-down' />}
                          sx={{ marginLeft: '0px' }}
                        >
                          <Typography> Dynamic Price Configurations</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <CustomButton variant='contained' onClick={handleConfigDrawerOpen}>
                              Qty Based Dynamic Pricing
                            </CustomButton>
                          </Box>
                          <Box sx={{ mt: 5 }}>{isConfigDrawerOpen && <DynamicPricingTable />}</Box>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion>
                        <AccordionSummary
                          id='panel-header-1'
                          aria-controls='panel-content-1'
                          expandIcon={<AccordianIcon icon='mdi:chevron-down' />}
                          sx={{ marginLeft: '0px' }}
                        >
                          <Typography>Add Extended Attribute Values</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            {attribute?.length > 0 &&
                              attribute
                                .filter(o => o.frontendInput == 'static' && o.backendInput == 'TEXTFIELD')
                                .map(item => {
                                  return (
                                    <>
                                      <List>
                                        <ListItem>
                                          <ListItemIcon sx={{ width: 175 }}>
                                            Enable {item?.attributeCode.toUpperCase()}
                                          </ListItemIcon>
                                          <ListItemText>
                                            <FormControl fullWidth>
                                              <TextField
                                                fullWidth
                                                size='small'
                                                name={toCamelCase(item?.attributeCode)}
                                                label={`Please add ${item?.attributeCode.toUpperCase()}`}
                                                placeholder={`Please add ${item?.attributeCode}`}
                                                onBlur={handleBlur}
                                                value={values[toCamelCase(item?.attributeCode)] | ''}
                                                onChange={e => handleExtendedAttribute(e, setFieldValue)}
                                                errorText={
                                                  touched[toCamelCase(item?.attributeCode)] &&
                                                  errors[toCamelCase(item?.attributeCode)]
                                                }
                                                error={
                                                  touched[toCamelCase(item?.attributeCode)] &&
                                                  !!errors[toCamelCase(item?.attributeCode)]
                                                }
                                                helperText={errors[toCamelCase(item?.attributeCode)]}
                                              />
                                            </FormControl>
                                          </ListItemText>
                                        </ListItem>
                                      </List>
                                    </>
                                  )
                                })}
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            {attribute?.length > 0 &&
                              attribute
                                .filter(o => o.frontendInput == 'static' && o.backendInput == 'TOGGLESWITCH')
                                .map(item => {
                                  return (
                                    <>
                                      <List>
                                        <ListItem>
                                          <ListItemIcon sx={{ width: 250 }}>
                                            Enable {item?.attributeCode.toUpperCase()}
                                          </ListItemIcon>
                                          <ListItemText>
                                            <FormControl fullWidth>
                                              <Switch
                                                name={toCamelCase(item?.attributeCode)}
                                                checked={
                                                  formInitialValues[toCamelCase(item?.attributeCode)] ? true : false
                                                }
                                                onChange={e => handleExtendedAttributeSwitch(e, setFieldValue)}
                                              />
                                            </FormControl>
                                          </ListItemText>
                                        </ListItem>
                                      </List>
                                    </>
                                  )
                                })}
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    </List>
                  </form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={2}></Grid>
      </Grid>
    </>
  )
}

export default Create
