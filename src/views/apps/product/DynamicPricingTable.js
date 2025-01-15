import MaterialTable, { MTableBodyRow } from 'material-table'
import React from 'react'

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

import Button from '@mui/material/Button'
import { useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  dynamicProductPricing
} from 'src/store/apps/service/category'

import { forwardRef } from 'react'

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

export default function DynamicPricingTable() {
  const dispatch = useDispatch()

  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')

  const [getVendor, setVendor] = useState([])

  const store = useSelector(state => state.vendor)



  const handleVendors = () => {
    const newVendor = store.data.data.map(item => {
      return {
        id: item.id,
        name: item.name
      }
    })
    setVendor(newVendor)
  }

  const [columns, setColumns] = useState([
    { title: 'Minimum Order Quantity', field: 'min', type: 'numeric' },
    { title: 'Maximum Order Quantity', field: 'max', type: 'numeric' },
    { title: 'Price Per Unit', field: 'price', type: 'numeric' }
  ])

  const [data, setData] = useState([])

/*   const handleOnRowAdd = () => {

  } */

  useEffect(() => {
    let dynamicPricingArr = [];
    console.log(data)
    if(data?.length > 0){
      data?.map(item => {
        let dynamicPricingObj = {
          max: item.max,
          min: item.min,
          price: item.price
        }
        dynamicPricingArr.push(dynamicPricingObj);
      })
      console.log(dynamicPricingArr);
      dispatch(dynamicProductPricing(dynamicPricingArr))
    }
    
   
  }, [data])



  return (
    <>
      <MaterialTable
        title='Pricing List'
        icons={tableIcons}
        data={data}
        columns={columns}
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
      />
    </>
  )
}
