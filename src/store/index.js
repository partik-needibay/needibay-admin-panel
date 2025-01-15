// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import user from 'src/store/apps/user'
import lead from 'src/store/apps/lead'
import vendor from 'src/store/apps/vendor'
import invoice from 'src/store/apps/invoice'
import calendar from 'src/store/apps/calendar'
import permissions from 'src/store/apps/permissions'
import quotation from 'src/store/apps/quotations'
import service from 'src/store/apps/service'
import order from 'src/store/apps/order'
import payment from 'src/store/apps/payment'
import serviceCategory from 'src/store/apps/service/category'
import catalog from 'src/store/apps/catelog'
import coupon from 'src/store/apps/coupon'
import customer from 'src/store/apps/customer'
import purchaseOrder from 'src/store/apps/purchaseOrder'

export const store = configureStore({
  reducer: {
    lead,
    user,
    invoice,
    calendar,
    permissions,
    vendor,
    quotation,
    order,
    service,
    payment,
    serviceCategory,
    catalog,
    coupon,
    customer,
    purchaseOrder
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
