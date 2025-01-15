// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import TreeView from '@mui/lab/TreeView'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import TreeItem from '@mui/lab/TreeItem'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Icon from 'src/@core/components/icon'
import { Button, CardHeader, List, ListItem, ListItemIcon, ListItemText, LinearProgress } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCategoryData,
  fetchProductCategoryData,
  createProductCategoryData,
  updateProductCategoryData,
  removeCategoryImage,
  updateMediaPageBlock
} from 'src/store/apps/service/category'
import { useEffect, useState } from 'react'
import Upload from '../../views/pages/contact/create-contact/upload'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'
import categoryImageBlock from 'src/data/categoryImageBlock'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Styled TreeItem component
const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  '&:hover > .MuiTreeItem-content:not(.Mui-selected)': {
    backgroundColor: theme.palette.action.hover
  },
  '& .MuiTreeItem-content': {
    paddingRight: theme.spacing(3),
    borderTopRightRadius: theme.spacing(4),
    borderBottomRightRadius: theme.spacing(4),
    fontWeight: theme.typography.fontWeightMedium
  },
  '& .MuiTreeItem-label': {
    fontWeight: 'inherit',
    paddingRight: theme.spacing(3)
  },
  '& .MuiTreeItem-group': {
    marginLeft: 0,
    '& .MuiTreeItem-content': {
      paddingLeft: theme.spacing(4),
      fontWeight: theme.typography.fontWeightRegular
    }
  }
}))

const StyledTreeItem = props => {
  // ** Props
  const { labelText, labelIcon, labelInfo, ...other } = props
  return (
    <StyledTreeItemRoot
      {...other}
      label={
        <Box sx={{ py: 1, display: 'flex', alignItems: 'center', '& svg': { mr: 1 } }}>
          <Icon icon={labelIcon} color='#FDB528' />
          <Typography variant='body2' sx={{ flexGrow: 1, fontWeight: 'inherit' }}>
            {labelText}
          </Typography>
          {labelInfo ? (
            <Typography variant='caption' color='inherit'>
              {labelInfo}
            </Typography>
          ) : null}
        </Box>
      }
    />
  )
}

const ProductCatalogComponent = ({ direction }) => {
  const ExpandIcon = <Icon icon={direction === 'rtl' ? 'mdi:chevron-left' : 'mdi:chevron-right'} />
  const dispatch = useDispatch()
  const [alignment, setAlignment] = useState('')
  const [value, setValue] = useState('')
  const [formInitialValues, setFormInitialValues] = useState({
    vendorId: '',
    parentId: '',
    categoryName: '',
    isActive: false,
    description: '',
    metaDescription: '',
    metaTitle: '',
    categorySlug: '',
    isStoreVisible: false
  })

  const InitialValue = {
    vendorId: '',
    parentId: '',
    categoryName: '',
    isActive: false,
    description: '',
    metaDescription: '',
    metaTitle: '',
    categorySlug: '',
    isStoreVisible: false
  }

  const [category, setCategory] = useState({
    id: Number('')
  })

  const handleAlignment = async (setFieldValue, value) => {
    if (value) {
      setFieldValue('categoryType', value)
      setAlignment(value)
    }
  }

  useEffect(() => {
    dispatch(fetchCategoryData())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchProductCategoryData())
  }, [dispatch])

  const store = useSelector(state => state.serviceCategory.data)
  const state = useSelector(state => state)

  const productCategoryData = useSelector(state => state.serviceCategory?.productCategoryData?.data)
  console.log(productCategoryData?.content)

  const categorySelect = item => {
    setFormInitialValues(prev => ({
      ...prev,
      id: item?.id,
      parentId: item?.parentCategoryId,
      categoryName: item?.categoryName,
      isActive: item?.isActive,
      categoryDescription: item?.categoryDescription,
      metaDescription: item?.metaDescription,
      metaTitle: item?.metaTitle,
      categoryType: alignment,
      categorySlug: item?.categorySlug,
      isStoreVisible: item?.isStoreVisible,
      categoryImages: item?.categoryImages
    }))
  }

  const resetSelect = () => {
    setFormInitialValues(InitialValue)
  }

  const categorySchema = yup.object().shape({
    categoryName: yup.string().required('required'),
    categoryDescription: yup.mixed().required('required'),
    metaDescription: yup.string().required('required'),
    metaTitle: yup.string().required('required'),
    categorySlug: yup.string().required('required')
  })

  const handleFormSubmit = async values => {
    console.log(values)
    if (formInitialValues?.id) {dispatch(updateProductCategoryData({ ...values })).then(response => {
      if (response.meta.requestStatus === 'fulfilled') {
        console.log(response)
        if (response?.payload?.success) {
          dispatch(fetchProductCategoryData())
          dispatch(fetchCategoryData())
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
    })}
    else {dispatch(createProductCategoryData({ ...values })).then(response => {
      if (response.meta.requestStatus === 'fulfilled') {
        console.log(response)
        if (response?.payload?.success) {
          dispatch(fetchProductCategoryData())
          dispatch(fetchCategoryData())
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
    })}
  }

  const handleEnable = async setFieldValue => {
    setFieldValue('isActive', !formInitialValues.isActive)
    setFormInitialValues({ ...formInitialValues, isActive: !formInitialValues.isActive })
  }

  const handleStoreVisibility = async setFieldValue => {
    setFieldValue('isStoreVisible', !formInitialValues.isStoreVisible)
    setFormInitialValues({ ...formInitialValues, isStoreVisible: !formInitialValues.isStoreVisible })
  }

  const handleParentCategoryChange = async (val, setFieldValue) => {
    setFieldValue('parentId', val)
    setFormInitialValues({ ...formInitialValues, parentId: val })
  }

  const handleBlockChange = (row, e) => {
    let data = {
      id: row.id,
      pageBlockCode: e.target.value
    }
    dispatch(updateMediaPageBlock(data))
  }

  const handleDeleteImage = data => {
    dispatch(removeCategoryImage(data?.id))
  }

  const columns = [
    {
      flex: 0.7,
      field: 'value',
      headerName: 'Image',

      renderCell: ({ row }) => {
        return (
          <>{row?.value ? <img src={row?.value} height={25} width={25} /> : <Typography>Broken Image</Typography>}</>
        )
      }
    },
    {
      flex: 1,
      field: 'page_block',
      headerName: 'Page Block',

      renderCell: ({ row }) => {
        return (
          <>
            <Select
              labelId='select-block'
              id='select-block'
              value={row.pageBlockCode}
              label='Age'
              onChange={e => handleBlockChange(row, e)}
            >
              {categoryImageBlock?.map(item => {
                return (
                  <MenuItem selected={item.value == row.pageBlockCode} value={item.value}>
                    {item.label}
                  </MenuItem>
                )
              })}
            </Select>
          </>
        )
      }
    },
    {
      flex: 0.4,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => handleDeleteImage(row)}>
            <Icon icon='mdi:delete-outline' />
          </IconButton>
        </Box>
      )
    }
  ]

  return (
    <div style={{ height: '100%' }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={3} py={2}>
          <Card>
            <CardContent>
              <Box mb={6} display={'flex'} flexDirection={'row'}>
                <Button size='small' fullWidth variant='outlined' onClick={resetSelect}>
                  Add New Category
                </Button>
                <Box px={2}></Box>
                <IconButton aria-label='capture screenshot' color='secondary' size='small'>
                  <Icon icon='mdi:export-variant' />
                </IconButton>

                <IconButton aria-label='capture screenshot' color='secondary' size='small'>
                  <Icon icon='mdi:export-variant' style={{ transform: 'scaleY(-1)' }} />
                </IconButton>
              </Box>

              <TreeView
                sx={{ minHeight: 240 }}
                defaultExpandIcon={ExpandIcon}
                defaultCollapseIcon={<Icon icon='mdi:chevron-down' />}
              >
                {store &&
                  store?.data?.content
                    .filter(o => o.parentCategoryId == null)
                    ?.map((item, index) => {
                      return (
                        <StyledTreeItem
                          nodeId={item.id}
                          labelInfo={item.subCategories.length}
                          labelText={item.categoryName}
                          labelIcon='material-symbols:folder-rounded'
                          onClick={() => categorySelect(item)}
                        >
                          {item.subCategories && item.subCategories.length > 0 && (
                            <>
                              {item.subCategories.map((itm, ind) => {
                                return (
                                  <StyledTreeItem
                                    nodeId={itm.id}
                                    labelInfo={itm.subCategories.length}
                                    labelText={itm.categoryName}
                                    labelIcon='material-symbols:folder-rounded'
                                    onClick={() => categorySelect(itm)}
                                  />

                                  /*  <Box width={'100%'} p={1} ml={6}>
                                      <Typography variant='subtitle2'>{itm.categoryName}</Typography>
                                    </Box> */
                                )
                              })}
                            </>
                          )}
                        </StyledTreeItem>
                      )
                    })}
              </TreeView>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Formik
                enableReinitialize
                initialValues={formInitialValues}
                validationSchema={categorySchema}
                onSubmit={handleFormSubmit}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                  <form
                    onSubmit={
                      handleSubmit
                    } /* onSubmit={(e) => {e.preventDefault(); console.log(errors); console.log(values)}} */
                  >
                    <Box width={'100%'} display={'flex'} justifyContent={'flex-end'}>
                      {formInitialValues?.id ? (
                        <Button size='small' variant='outlined' color='primary' type='submit'>
                          Update Category
                        </Button>
                      ) : (
                        <Button size='small' variant='outlined' color='primary' type='submit'>
                          Save New Category
                        </Button>
                      )}
                    </Box>
                    <List>
                      <ListItem>
                        <ListItemIcon sx={{ width: 175 }}>Enable Category</ListItemIcon>
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
                        <ListItemIcon sx={{ width: 175 }}>Parent Category</ListItemIcon>
                        <ListItemText>
                          <Select
                            placeholder='Parent Catrgory'
                            id='parent-category-id'
                            labelId='parent-category-id'
                            size='small'
                            fullWidth
                            onChange={e => handleParentCategoryChange(e.target.value, setFieldValue)}
                            name='parentId'
                            value={formInitialValues?.parentId}
                          >
                            <MenuItem value={null}>Root Category</MenuItem>
                            {productCategoryData &&
                              productCategoryData?.content?.map((item, index) => {
                                return values.id != item?.id && (
                                      <MenuItem selected={formInitialValues?.parentId == item?.id} value={item?.id}>
                                        {item?.categoryName}
                                      </MenuItem>
                                    )
                              })}
                          </Select>
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ width: 175 }}>Category Name</ListItemIcon>

                        <ListItemText>
                          <TextField
                            fullWidth
                            size='small'
                            name='categoryName'
                            label='Category Name'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.categoryName || ''}
                            errorText={touched.categoryName && errors.categoryName}
                            error={touched['categoryName'] && !!errors['categoryName']}
                            helperText={errors['categoryName']}
                          />
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ width: 175 }}>Category Slug</ListItemIcon>
                        <ListItemText>
                          <TextField
                            fullWidth
                            size='small'
                            name='categorySlug'
                            label='Category Slug'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.categorySlug || ''}
                            errorText={touched.categorySlug && errors.categorySlug}
                            error={touched['categorySlug'] && !!errors['categorySlug']}
                            helperText={errors['categorySlug']}
                          />
                        </ListItemText>
                      </ListItem>
                      {/* <ListItem>
                        <ListItemIcon sx={{ width: 175 }}>Add Image</ListItemIcon>
                        <ListItemText>
                          <Upload />
                        </ListItemText>
                      </ListItem> */}
                      <ListItem>
                        <ListItemIcon sx={{ width: 175 }}>Description</ListItemIcon>
                        <ListItemText>
                          <TextField
                            rows={4}
                            multiline
                            fullWidth
                            placeholder='Category Description for Store View'
                            name='categoryDescription'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.categoryDescription || ''}
                            errorText={touched.categoryDescription && errors.categoryDescription}
                            error={touched['categoryDescription'] && !!errors['categoryDescription']}
                            helperText={errors['categoryDescription']}
                          />
                        </ListItemText>
                        {/* <ReactQuill theme="snow" value={value} onChange={setValue} /> */}
                      </ListItem>

                      <ListItem>
                        <ListItemIcon sx={{ width: 175 }}>Upload Image</ListItemIcon>
                        <ListItemText>
                          {values?.categoryImages?.length > 0 && (
                            <DataGrid autoHeight rows={values?.categoryImages} columns={columns} />
                          )}
                          <Upload />
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ width: 175 }}>Meta title</ListItemIcon>
                        <ListItemText>
                          <TextField
                            fullWidth
                            size='small'
                            name='metaTitle'
                            label='Meta Title'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.metaTitle || ''}
                            errorText={touched.metaTitle && errors.metaTitle}
                            error={touched['metaTitle'] && !!errors['metaTitle']}
                            helperText={errors['metaTitle']}
                          />
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ width: 175 }}>Meta Description</ListItemIcon>
                        <ListItemText>
                          <TextField
                            rows={4}
                            multiline
                            fullWidth
                            placeholder='Category Description for Store View'
                            name='metaDescription'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.metaDescription || ''}
                            errorText={touched.metaDescription && errors.metaDescription}
                            error={touched['metaDescription'] && !!errors['metaDescription']}
                            helperText={errors['metaDescription']}
                          />
                        </ListItemText>
                      </ListItem>
                    </List>
                  </form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default ProductCatalogComponent
