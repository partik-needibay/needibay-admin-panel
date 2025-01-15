const navigation = () => {
  return [
    {
      title: 'Overview',
      icon: 'material-symbols:add-shopping-cart',
      path: '/dashboards/ecommerce',
      action: 'read',
      subject: 'acl-page',
    },
    {
      title: 'Vendors',
      icon: 'bi:person-vcard',
      path: '/vendor',
    },
    {
      title: 'Leads',
      icon: 'grommet-icons:user-new',
      path: '/lead'
    },
    {
      title: 'Product Catelog',
      icon: 'carbon:shopping-catalog',
      
      children: [
        {
          title: 'Manage Product Category',
          path: '/product/catalog',
          action: 'read',
          subject: 'acl-page',
        },
        {
          title: 'List All Products',
          path: '/product',
          action: 'read',
          subject: 'acl-page',
        }
      ]
    },
    
    {
      title: 'Orders',
      icon: 'material-symbols:add-shopping-cart',
      children: [
        {
          title: 'Create New',
          path: '/order/create/'
        },
        {
          title: 'List All Orders',
          path: '/order'
        },
        {
          title: 'Carts',
          path: '/apps/cart'
        }
      ]
    },
    {
      title: 'Customers',
      icon: 'mdi:human-male-female',
      children: [
        {
          title: 'List All Customers',
          path: '/customer/view'
        }
      ]
    },
    {
      title: 'Quotation',
      icon: 'la:file-invoice-dollar',
      path: '/apps/quotation/list'
    },
    {
      title: 'Invoice',
      icon: 'la:file-invoice-dollar',
      path: '/apps/invoice/list'
    },
    {
      title: 'Attribute List',
      icon: 'material-symbols-light:user-attributes',
      path: '/apps/templates/list',
      children: [
        {
          title: 'Products',
          path: '/attributes/product'
        }
      ]
    },
    {
      title: 'Report',
      icon: 'la:file-invoice-dollar',
      path: '/report'
    },

    {
      title: 'Purchase Order',
      icon: 'la:file-invoice-dollar',
      path: '/apps/purchase-order/list/'
    },
    {
      title: 'Coupons',
      icon: 'ri:secure-payment-line',
      path: '/promotion/'
    },
    {
      title: 'Payments & Transactions',
      icon: 'ri:secure-payment-line',
      path: '/payment/payment'
    },
    {
      title: 'CMS',
      icon: 'ri:secure-payment-line',
      children: [
        {
          title: 'Page Block',
          path: '/block/create'
        },
      ]
    },
    {
      sectionTitle: 'System'
    },
    {
      title: 'Department',
      icon: 'codicon:organization',
      path: '/department'
    },
    {
      title: 'Users',
      icon: 'mdi:users-group',
      path: '#'
    },
    {
      title: 'System Settings',
      icon: 'ep:setting',
      path: '/settings'
    },
    {
      title: 'User',
      icon: 'mdi:account-outline',
      children: [
        {
          title: 'List',
          path: '/apps/user/list'
        },
        {
          title: 'View',
          children: [
            {
              title: 'Overview',
              path: '/apps/user/view/overview'
            },
            {
              title: 'Security',
              path: '/apps/user/view/security'
            },
            {
              title: 'Billing & Plans',
              path: '/apps/user/view/billing-plan'
            },
            {
              title: 'Notifications',
              path: '/apps/user/view/notification'
            },
            {
              title: 'Connection',
              path: '/apps/user/view/connection'
            }
          ]
        }
      ]
    },
    {
      title: 'Roles & Permissions',
      icon: 'mdi:shield-outline',
      children: [
        {
          title: 'Roles',
          path: '/apps/roles'
        },
        {
          title: 'Permissions',
          path: '/apps/permissions'
        }
      ]
    },
    {
      path: '/acl',
      action: 'read',
      subject: 'acl-page',
      icon: 'mdi:shield-outline',
      title: 'Access Control'
    }
  ]
}

export default navigation
