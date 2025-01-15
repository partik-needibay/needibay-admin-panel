import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import authConfig from 'src/configs/auth'
import attribute from 'src/data/attribute'

export const setLoader = createAsyncThunk('service/setLoader', async (data, { getState, dispatch, rejectWithValue }) => {
  return data
})


export const fetchCategoryData = createAsyncThunk(
  'service/fetchCategoryData',
  async (data, { getState, dispatch, rejectWithValue }) => {
     dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const response = await axios.get(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/category`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/category`,
        {
          headers: {
            Authorization: 'Bearer ' + storedToken
          }
        }
      )
      dispatch(setLoader(false))
      return response.data
    } catch (e) {
      dispatch(setLoader(false))
      return rejectWithValue(e.getMessage())
    }
  }
)
export const fetchProductCategoryData = createAsyncThunk(
  'service/fetchProductCategoryData',
  async (data, { getState, dispatch, rejectWithValue }) => {
     dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    console.log()
    const response = await axios.get(
      process.env.NODE_ENV === 'production'
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/category/product`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/category/product`,
      {
        headers: {
          Authorization: 'Bearer ' + storedToken
        }
      }
    )
    console.log(response.data)
    dispatch(setLoader(false))
    return response.data
    } catch (e) {
      dispatch(setLoader(false))
      return rejectWithValue(e.getMessage())
    }
    
  }
)

export const uploadFile = createAsyncThunk(
  'service/uploadFile',
  async (data, { getState, dispatch, rejectWithValue }) => {
     dispatch(setLoader(true))
    try {
      dispatch(setLoader(false))
      return data
    } catch (e) {
      dispatch(setLoader(false))
      return rejectWithValue(e.getMessage())
    }
  }
)
export const uploadLookFile = createAsyncThunk(
  'service/uploadLookFile',
  async (data, { getState, dispatch, rejectWithValue }) => {
     dispatch(setLoader(true))
    try {
      dispatch(setLoader(false))
      return data
    } catch (e) {
      dispatch(setLoader(false))
      return rejectWithValue(e.getMessage())
    }
  }
)
export const dynamicProductPricing = createAsyncThunk(
  'service/dynamicProductPricing',
  async (data, { getState, dispatch, rejectWithValue }) => {
     dispatch(setLoader(true))
    try {
      dispatch(setLoader(false))
      return data
    } catch (e) {
      dispatch(setLoader(false))
      return rejectWithValue(e.getMessage())
    }
  }
)
export const addRelatedProducts = createAsyncThunk(
  'service/addRelatedProducts',
  async (data, { getState, dispatch, rejectWithValue }) => {
     dispatch(setLoader(true))
    try {
      dispatch(setLoader(false))
      return data
    } catch (e) {
      dispatch(setLoader(false))
      return rejectWithValue(e.getMessage())
    }
  }
)

export const createProductCategoryData = createAsyncThunk(
  'service/createProductCategoryData',
  async (data, { getState, dispatch, rejectWithValue }) => {
     dispatch(setLoader(true))
     debugger;
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      let formdata = new FormData()
      formdata.append('id', data?.id)
      if (data?.parentId) {
        
        formdata.append('parentId', data?.parentId)
      }
      if (data?.vendorId) {
        formdata.append('vendorId', data?.vendorId)
      }
      for (var x = 0; x < getState().serviceCategory.files.length; x++) {
        getState().serviceCategory.files[x].pageBlockCode = 'BLOCK_HOMEPAGE_CATEGORY'
        formdata.append('image', getState().serviceCategory.files[x], getState().serviceCategory.files[x]?.name)
      }
      /* getState().serviceCategory.files[0].pageBlockCode = "BLOCK_HOMEPAGE_CATEGORY"
    formdata.append("image", getState().serviceCategory.files[0], getState().serviceCategory.files[0]?.name); */
      formdata.append('categoryName', data?.categoryName)
      formdata.append('isActive', data?.isActive)
      formdata.append('description', data?.categoryDescription)
      formdata.append('metaDescription', data?.metaDescription)
      formdata.append('metaTitle', data?.metaTitle)
      formdata.append('categorySlug', data?.categorySlug)

      const response = await axios.post(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/category`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/category`,
        formdata,
        {
          headers: {
            Authorization: 'Bearer ' + storedToken,
            'Content-Type': 'multipart/encrypted'
          }
        }
      )
      console.log(response.data)
      dispatch(setLoader(false))
      return response.data
    } catch (e) {
      dispatch(setLoader(false))
      return rejectWithValue(e.getMessage())
    }
  }
)

export const removeCategoryImage = createAsyncThunk(
  'service/removeCategoryImage',
  async (data, { getState, dispatch, rejectWithValue }) => {
     dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const response = await axios.delete(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/category/media/block/${data}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/category/media/block/${data}`,
        {
          headers: {
            Authorization: 'Bearer ' + storedToken
          }
        }
      )
      console.log(response.data)
      dispatch(setLoader(false))
      return response.data
    } catch (e) {
      dispatch(setLoader(false))
      return rejectWithValue(e.getMessage())
    }
  }
)

export const removeProductImage = createAsyncThunk(
  'service/removeProductImage',
  async (data, { getState, dispatch, rejectWithValue }) => {
     dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const response = await axios.delete(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/product/image/${data}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/product/image/${data}`,
        {
          headers: {
            Authorization: 'Bearer ' + storedToken
          }
        }
      )
      console.log(response.data)
      dispatch(setLoader(false))
      return response.data
    } catch (e) {
      dispatch(setLoader(false))
      return rejectWithValue(e.getMessage())
    }
  }
)
export const removeProductRelatedProducts = createAsyncThunk(
  'service/removeProductRelatedProducts',
  async (data, { getState, dispatch, rejectWithValue }) => {
     dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const response = await axios.delete(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/product/related-product/${data}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/product/related-product/${data}`,
        {
          headers: {
            Authorization: 'Bearer ' + storedToken
          }
        }
      )
      console.log(response.data)
      dispatch(setLoader(false))
      return response.data
    } catch (e) {
      dispatch(setLoader(false))
      return rejectWithValue(e.getMessage())
    }
  }
)

export const removeProductDynamicPricing = createAsyncThunk(
  'service/removeProductDynamicPricing',
  async (data, { getState, dispatch, rejectWithValue }) => {
     dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const response = await axios.delete(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/product/dynamic-pricing/${data}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/product/dynamic-pricing/${data}`,
        {
          headers: {
            Authorization: 'Bearer ' + storedToken
          }
        }
      )
      console.log(response.data)
      dispatch(setLoader(false))
      return response.data
    } catch (e) {
      dispatch(setLoader(false))
      return rejectWithValue(e.getMessage())
    }
  }
)


export const updateMediaPageBlock = createAsyncThunk(
  'service/updateMediaPageBlock',
  async (data, { getState, dispatch, rejectWithValue }) => {
     dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      let formdata = new FormData()
      formdata.append('id', data?.id)
      formdata.append('pageBlockCode', data?.pageBlockCode)
      const response = await axios.post(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/category/media/block`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/category/media/block`,
        formdata,
        {
          headers: {
            Authorization: 'Bearer ' + storedToken
          }
        }
      )
      dispatch(setLoader(false))
      return response.data
    } catch (e) {
      dispatch(setLoader(false))
      return rejectWithValue(e.getMessage())
    }
  }
)

export const updateProductCategoryData = createAsyncThunk(
  'service/updateProductCategoryData',
  async (data, { getState, dispatch, rejectWithValue }) => {
     dispatch(setLoader(true))
     debugger;
    try {
     
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      let formdata = new FormData()
      formdata.append('id', data?.id)
      if (getState().serviceCategory.files.length > 0) {
        for (var x = 0; x < getState().serviceCategory.files.length; x++) {
          getState().serviceCategory.files[x].pageBlockCode = 'BLOCK_HOMEPAGE_CATEGORY'
          formdata.append('image', getState().serviceCategory.files[x], getState().serviceCategory.files[x]?.name)
        }
        formdata.append('image', getState().serviceCategory.files[0], getState().serviceCategory.files[0]?.name)
      }
      if (data?.parentId) {
        formdata.append('parentId', data?.parentId)
      }
      formdata.append('isActive', data?.isActive)
      formdata.append('description', data?.categoryDescription)
      formdata.append('metaDescription', data?.metaDescription)
      formdata.append('metaTitle', data?.metaTitle)
      formdata.append('categoryType', data?.categoryType)
      formdata.append('categorySlug', data?.categorySlug)
      formdata.append('categoryName', data?.categoryName)
      formdata.append('isStoreVisible', data?.isStoreVisible)

      const response = await axios.put(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/category/${data.id}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/category/${data.id}`,
        formdata,
        {
          headers: {
            Authorization: 'Bearer ' + storedToken,
            'Content-Type': 'multipart/encrypted'
          }
        }
      )
      console.log(response.data)
      dispatch(setLoader(false))
      return response.data
    } catch (e) {
      dispatch(setLoader(false))
      return rejectWithValue(e.getMessage())
    }
  }
)

export const selectedProductConfiguration = createAsyncThunk(
  'service/selectedProductConfiguration',
  async (data, { getState, dispatch, rejectWithValue }) => {
     dispatch(setLoader(true))
    try {
      dispatch(setLoader(false))
      return data
    } catch (e) {
      dispatch(setLoader(false))
      return rejectWithValue(e.getMessage())
    }
  }
)
export const configProductAttributeObjList = createAsyncThunk(
  'service/configProductAttributeObjList',
  async (data, { getState, dispatch, rejectWithValue }) => {
     dispatch(setLoader(true))
    try {
      dispatch(setLoader(false))
      return data
    } catch (e) {
      dispatch(setLoader(false))
      return rejectWithValue(e.getMessage())
    }
  }
)
export const fetchProductById = createAsyncThunk(
  'service/fetchProductById',
  async (data, { getState, dispatch, rejectWithValue }) => {
     dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

      const response = await axios.get(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/product/${data}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/product/${data}`,
        {
          headers: {
            Authorization: 'Bearer ' + storedToken,
            'Content-Type': 'multipart/encrypted'
          }
        }
      )
      console.log(response.data)
      dispatch(setLoader(false))
      return response.data.data
    } catch (e) {
      dispatch(setLoader(false))
      return rejectWithValue(e.getMessage())
    }
    debugger
  }
)
export const createNewProduct = createAsyncThunk(
  'service/createNewProduct',
  async (data, { getState, dispatch, rejectWithValue }) => {
     dispatch(setLoader(true))
    try {
      console.log(data)
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      let formdata = new FormData()
      for (var x = 0; x < getState().serviceCategory.files.length; x++) {
        getState().serviceCategory.files[x].pageBlockCode = 'BLOCK_HOMEPAGE_CATEGORY'
        formdata.append('image', getState().serviceCategory.files[x], getState().serviceCategory.files[x]?.name)
      }
      if (data?.parentConfigProductId) {
        formdata.append('parentConfigProductId', data?.parentConfigProductId)
      }
      if (getState().serviceCategory?.dynamicProductPricing?.length > 0) {
        formdata.append('productDynamicPricing', JSON.stringify(getState().serviceCategory.dynamicProductPricing))
      }
      if (getState().serviceCategory?.addRelatedProducts?.length > 0) {
        formdata.append('relatedProducts', JSON.stringify(getState().serviceCategory.addRelatedProducts))
      }
      if (data?.productType == 'CONFIGURABLE' && data?.configuration && data?.configuration?.length > 0) {
        for (var x = 0; x < data?.configuration?.length; x++) {
          formdata.append('configuration', JSON.stringify(data?.configuration))
        }

        formdata.append('confAttributes', JSON.stringify(getState().serviceCategory?.configProductAttributeObjList))
      }

      formdata.append('categoryId', data?.categoryId)
      formdata.append('productType', data?.productType)
      formdata.append('sku', data?.sku)
      formdata.append('productName', data?.productName)
      formdata.append('productSlug', data?.productSlug)
      formdata.append('basePrice', data?.basePrice)
      formdata.append('baseCommission', data?.baseCommission)
      formdata.append('baseCommissionType', data?.baseCommissionType)
      formdata.append('hsnCode', data?.hsnCode)
      formdata.append('taxPercent', data?.taxPercent)
      formdata.append('isVariant', data?.isVariant)
      formdata.append('isDiscounted', data?.isDiscounted)
      formdata.append('isCustomizable', data?.isCustomizable)
      formdata.append('hasOption', data?.hasOption)
      formdata.append('isActive', data?.isActive)
      formdata.append('taxPreference', data?.taxPreference)
      formdata.append('isStoreVisible', data?.isStoreVisible)
      formdata.append('isSampleEnable', data?.isSampleOrderEnable)
      formdata.append('deliveryCharge', data?.deliveryCharge)
      formdata.append('meteTitle', data?.meteTitle)
      formdata.append('metaDescription', data?.metaDescription)
      formdata.append('searchKeywords', data?.searchKeywords)
      formdata.append('urlKey', data?.urlKey)
      let extendedAttributeArr = []
      if (attribute?.length > 0) {
        attribute
          .filter(o => o.frontendInput == 'static' && o.backendInput == 'TEXTFIELD')
          .map(item => {
            debugger
            if (data.hasOwnProperty(item.attributeCode)) {
              let extendedAttributeObj = {
                [item.attributeCode]: data[item.attributeCode]
              }
              extendedAttributeArr.push(extendedAttributeObj)
            }
          })
      }

      if (extendedAttributeArr.length > 0) {
        formdata.append('extendedAttributes', JSON.stringify(extendedAttributeArr))
      }
      debugger
      const response = await axios.post(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/product`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/product`,
        formdata,
        {
          headers: {
            Authorization: 'Bearer ' + storedToken,
            'Content-Type': 'multipart/encrypted'
          }
        }
      )
      dispatch(setLoader(false))
      return response.data
    } catch (e) {
      dispatch(setLoader(false))
      return rejectWithValue(e.getMessage())
    }
  }
)
export const updateProduct = createAsyncThunk(
  'service/updateProduct',
  async (data, { getState, dispatch, rejectWithValue }) => {
     dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      let formdata = new FormData()
      for (var x = 0; x < getState().serviceCategory.files.length; x++) {
        getState().serviceCategory.files[x].pageBlockCode = 'BLOCK_HOMEPAGE_CATEGORY'
        formdata.append('image', getState().serviceCategory.files[x], getState().serviceCategory.files[x]?.name)
      }
      if (data?.parentConfigProductId) {
        formdata.append('parentConfigProductId', data?.parentConfigProductId)
      }
      if (getState().serviceCategory?.dynamicProductPricing?.length > 0) {
        formdata.append('productDynamicPricing', JSON.stringify(getState().serviceCategory.dynamicProductPricing))
      }
      if (getState().serviceCategory?.addRelatedProducts?.length > 0) {
        formdata.append('relatedProducts', JSON.stringify(getState().serviceCategory.addRelatedProducts))
      }
      if (data?.productType == 'CONFIGURABLE' && data?.configuration && data?.configuration?.length > 0) {
        for (var x = 0; x < data?.configuration?.length; x++) {
          formdata.append('configuration', JSON.stringify(data?.configuration))
        }

        formdata.append('confAttributes', JSON.stringify(getState().serviceCategory?.configProductAttributeObjList))
      }

      formdata.append('categoryId', data?.categoryId)
      formdata.append('productType', data?.productType)
      formdata.append('sku', data?.sku)
      formdata.append('productName', data?.productName)
      formdata.append('productSlug', data?.productSlug)
      formdata.append('basePrice', data?.basePrice)
      formdata.append('baseCommission', data?.baseCommission)
      formdata.append('baseCommissionType', data?.baseCommissionType)
      formdata.append('hsnCode', data?.hsnCode)
      formdata.append('taxPercent', data?.taxPercent)
      formdata.append('isVariant', data?.isVariant)
      formdata.append('isDiscounted', data?.isDiscounted)
      formdata.append('isCustomizable', data?.isCustomizable)
      formdata.append('hasOption', data?.hasOption)
      formdata.append('isActive', data?.isActive)
      formdata.append('taxPreference', data?.taxPreference)
      formdata.append('isStoreVisible', data?.isStoreVisible)
      formdata.append('isSampleEnable', data?.isSampleOrderEnable ? data?.isSampleOrderEnable : false)
      formdata.append('deliveryCharge', data?.deliveryCharge ? data?.deliveryCharge : 0.0)
      formdata.append('metaTitle', data?.metaTitle)
      formdata.append('metaDescription', data?.metaDescription)
      formdata.append('searchKeywords', data?.searchKeywords)
      formdata.append('shortDescription', data?.shortDescription)
      formdata.append('longDescription', data?.longDescription)
      formdata.append('urlKey', data?.urlKey)
      let extendedAttributeArr = []
      if (attribute?.length > 0) {
        attribute
          .filter(o => o.frontendInput == 'static')
          .map(item => {
            if (data.hasOwnProperty(item.attributeCode)) {
              let extendedAttributeObj = {
                [item.attributeCode]: data[item.attributeCode].toString()
              }
              extendedAttributeArr.push(extendedAttributeObj)
            }
          })
      }

      if (extendedAttributeArr.length > 0) {
        formdata.append('extendedAttributes', JSON.stringify(extendedAttributeArr))
      }
      const response = await axios.put(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/product/${parseInt(data.id)}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/product/${parseInt(data.id)}`,
        formdata,
        {
          headers: {
            Authorization: 'Bearer ' + storedToken,
            'Content-Type': 'multipart/encrypted'
          }
        }
      )
      dispatch(setLoader(false))
      return response.data
    } catch (e) {
      dispatch(setLoader(false))
      return rejectWithValue(e.getMessage())
    }
  }
)

export const fetchProductAttributesData = createAsyncThunk(
  'service/fetchProductAttributesData',
  async (data, { getState, dispatch, rejectWithValue }) => {
     dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const response = await axios.get(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/product/attribute`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/product/attribute`,
        {
          headers: {
            Authorization: 'Bearer ' + storedToken
          }
        }
      )
      dispatch(setLoader(false))
      return response.data
    } catch (e) {
      dispatch(setLoader(false))
      return rejectWithValue(e.getMessage())
    }
  }
)

export const serviceCategorySlice = createSlice({
  name: 'serviceCategory',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    responseData: {},
    productCategoryData: [],
    files: [],
    lookFiles: [],
    productAttributes: [],
    dynamicProductPricing: [],
    addRelatedProducts: [],
    selectedProductConfigurationSKU: [],
    configProductAttributeObjList: {},
    productById: {},
    loader: false
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCategoryData.fulfilled, (state, action) => {
      state.data = action.payload
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    }),
      builder.addCase(fetchProductCategoryData.fulfilled, (state, action) => {
        state.productCategoryData = action.payload
        state.total = action.payload.total
        state.params = action.payload.params
        state.allData = action.payload.allData
      })
    builder.addCase(createProductCategoryData.fulfilled, (state, action) => {
      state.responseData = action.payload
    })
    builder.addCase(createNewProduct.fulfilled, (state, action) => {
      state.responseData = action.payload
    })
    builder.addCase(uploadFile.fulfilled, (state, action) => {
      state.files = action.payload
    })
    builder.addCase(uploadLookFile.fulfilled, (state, action) => {
      state.lookFiles = action.payload
    })
    builder.addCase(fetchProductAttributesData.fulfilled, (state, action) => {
      state.productAttributes = action.payload
    })
    builder.addCase(dynamicProductPricing.fulfilled, (state, action) => {
      state.dynamicProductPricing = action.payload
    })
    builder.addCase(addRelatedProducts.fulfilled, (state, action) => {
      state.addRelatedProducts = action.payload
    })
    builder.addCase(selectedProductConfiguration.fulfilled, (state, action) => {
      state.selectedProductConfigurationSKU = action.payload
    })
    builder.addCase(configProductAttributeObjList.fulfilled, (state, action) => {
      state.configProductAttributeObjList = action.payload
    })
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.productById = action.payload
    })
    builder.addCase(setLoader.fulfilled, (state, action) => {
      state.loader = action.payload
    })
  }
})

export default serviceCategorySlice.reducer
