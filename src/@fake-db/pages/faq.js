// ** Mock Adapter
import mock from 'src/@fake-db/mock'

const data = {
  faqData: {
    // payment
    payment: {
      id: 'payment',
      title: 'Payment Gatways',
      icon: 'mdi:credit-card-outline',
      subtitle: 'Integrate any of the payment gatewate which suites your business',
      qandA: [
        {
          id: 'order-payment',
          question: 'When is payment taken for my order?',
          answer:
            'Payment is taken during the checkout process when you pay for your order. The order number that appears on the confirmation screen indicates payment has been successfully processed.',
          image: '/images/icons/conf/razorpay.png',
          text: 'Razorpay'
        },
        {
          id: 'order',
          question: 'How do I pay for my order?',
          answer:
            'We accept Visa®, MasterCard®, American Express®, and PayPal®. Our servers encrypt all information submitted to them, so you can be confident that your credit card information will be kept safe and secure.',
          image: '/images/icons/conf/instamojo.png',
          text: 'Razorpay'
        },
        {
          id: 'placing-order',
          question: "What should I do if I'm having trouble placing an order?",
          answer:
            'For any technical difficulties you are experiencing with our website, please contact us at our support portal, or you can call us toll-free at 1-000-000-000, or email us at order@companymail.com',
          image: '/images/icons/conf/payu.png',
          text: 'Razorpay'
        },
        {
          id: 'users-license',
          question: 'Which license do I need for an end product that is only accessible to paying users?',
          answer:
            'If you have paying users or you are developing any SaaS products then you need an Extended License. For each products, you need a license. You can get free lifetime updates as well.',
          image: '/images/icons/conf/paypal.jpg',
          text: 'Razorpay'
        },
        {
          id: 'subscription-review',
          question: 'Does my subscription automatically renew?',
          answer:
            'No, This is not subscription based item.Pastry pudding cookie toffee bonbon jujubes jujubes powder topping. Jelly beans gummi bears sweet roll bonbon muffin liquorice. Wafer lollipop sesame snaps.',
          image: '/images/icons/conf/stripe.png',
          text: 'Razorpay'
        }
      ]
    },

    // delivery
    delivery: {
      id: 'delivery',
      title: 'Delivery & Logistic',
      icon: 'carbon:delivery-parcel',
      subtitle: 'Get help with delivery',
      qandA: [
        {
          id: 'ship-order',
          question: 'How would you ship my order?',
          answer:
            'For large products, we deliver your product via a third party logistics company offering you the “room of choice” scheduled delivery service. For small products, we offer free parcel delivery.'
        },
        {
          id: 'delivery-cost',
          question: 'What is the delivery cost of my order?',
          answer:
            'The cost of scheduled delivery is $69 or $99 per order, depending on the destination postal code. The parcel delivery is free.'
        },
        {
          id: 'product-damaged',
          question: 'What to do if my product arrives damaged?',
          answer:
            'We will promptly replace any product that is damaged in transit. Just contact our support team, to notify us of the situation within 48 hours of product arrival.'
        }
      ]
    },
    email: {
      id: 'email',
      title: 'Email & SMTP',
      icon: 'ic:outline-email',
      subtitle: 'Setup Email Service Provider',
      qandA: [
        {
          id: 'ship-order',
          question: 'How would you ship my order?',
          answer:
            'For large products, we deliver your product via a third party logistics company offering you the “room of choice” scheduled delivery service. For small products, we offer free parcel delivery.'
        },
        {
          id: 'delivery-cost',
          question: 'What is the delivery cost of my order?',
          answer:
            'The cost of scheduled delivery is $69 or $99 per order, depending on the destination postal code. The parcel delivery is free.'
        },
        {
          id: 'product-damaged',
          question: 'What to do if my product arrives damaged?',
          answer:
            'We will promptly replace any product that is damaged in transit. Just contact our support team, to notify us of the situation within 48 hours of product arrival.'
        }
      ]
    },
    sms: {
      id: 'sms',
      title: 'SMS Vendor',
      icon: 'material-symbols:sms',
      subtitle: 'Setup SMS Service Provider',
      qandA: [
        {
          id: 'ship-order',
          question: 'How would you ship my order?',
          answer:
            'For large products, we deliver your product via a third party logistics company offering you the “room of choice” scheduled delivery service. For small products, we offer free parcel delivery.'
        },
        {
          id: 'delivery-cost',
          question: 'What is the delivery cost of my order?',
          answer:
            'The cost of scheduled delivery is $69 or $99 per order, depending on the destination postal code. The parcel delivery is free.'
        },
        {
          id: 'product-damaged',
          question: 'What to do if my product arrives damaged?',
          answer:
            'We will promptly replace any product that is damaged in transit. Just contact our support team, to notify us of the situation within 48 hours of product arrival.'
        }
      ]
    },
    google: {
      id: 'google',
      title: 'Google APIs',
      icon: 'uil:google',
      subtitle: 'Get help with delivery',
      qandA: [
        {
          id: 'ship-order',
          question: 'How would you ship my order?',
          answer:
            'For large products, we deliver your product via a third party logistics company offering you the “room of choice” scheduled delivery service. For small products, we offer free parcel delivery.'
        },
        {
          id: 'delivery-cost',
          question: 'What is the delivery cost of my order?',
          answer:
            'The cost of scheduled delivery is $69 or $99 per order, depending on the destination postal code. The parcel delivery is free.'
        },
        {
          id: 'product-damaged',
          question: 'What to do if my product arrives damaged?',
          answer:
            'We will promptly replace any product that is damaged in transit. Just contact our support team, to notify us of the situation within 48 hours of product arrival.'
        }
      ]
    },
    meta: {
      id: 'meta',
      title: 'Meta APIs',
      icon: 'ph:meta-logo-duotone',
      subtitle: 'Get help with delivery',
      qandA: [
        {
          id: 'ship-order',
          question: 'How would you ship my order?',
          answer:
            'For large products, we deliver your product via a third party logistics company offering you the “room of choice” scheduled delivery service. For small products, we offer free parcel delivery.'
        },
        {
          id: 'delivery-cost',
          question: 'What is the delivery cost of my order?',
          answer:
            'The cost of scheduled delivery is $69 or $99 per order, depending on the destination postal code. The parcel delivery is free.'
        },
        {
          id: 'product-damaged',
          question: 'What to do if my product arrives damaged?',
          answer:
            'We will promptly replace any product that is damaged in transit. Just contact our support team, to notify us of the situation within 48 hours of product arrival.'
        }
      ]
    },

    social: {
      id: 'sociall',
      title: 'Other Social APIs',
      icon: 'mdi:web-sync',
      subtitle: 'Other Social Account',
      qandA: [
        {
          id: 'ship-order',
          question: 'How would you ship my order?',
          answer:
            'For large products, we deliver your product via a third party logistics company offering you the “room of choice” scheduled delivery service. For small products, we offer free parcel delivery.'
        },
        {
          id: 'delivery-cost',
          question: 'What is the delivery cost of my order?',
          answer:
            'The cost of scheduled delivery is $69 or $99 per order, depending on the destination postal code. The parcel delivery is free.'
        },
        {
          id: 'product-damaged',
          question: 'What to do if my product arrives damaged?',
          answer:
            'We will promptly replace any product that is damaged in transit. Just contact our support team, to notify us of the situation within 48 hours of product arrival.'
        }
      ]
    },

    pm: {
      id: 'pmTools',
      title: 'Project Tools',
      icon: 'cib:todoist',
      subtitle: 'Project Management Tools, Trello, ClickUp',
      qandA: [
        {
          id: 'ship-order',
          question: 'How would you ship my order?',
          answer:
            'For large products, we deliver your product via a third party logistics company offering you the “room of choice” scheduled delivery service. For small products, we offer free parcel delivery.'
        },
        {
          id: 'delivery-cost',
          question: 'What is the delivery cost of my order?',
          answer:
            'The cost of scheduled delivery is $69 or $99 per order, depending on the destination postal code. The parcel delivery is free.'
        },
        {
          id: 'product-damaged',
          question: 'What to do if my product arrives damaged?',
          answer:
            'We will promptly replace any product that is damaged in transit. Just contact our support team, to notify us of the situation within 48 hours of product arrival.'
        }
      ]
    },
    team: {
      id: 'team',
      title: 'Team Collaboration',
      icon: 'ant-design:team-outlined',
      subtitle: 'Team Collaboration Tools, Slack',
      qandA: [
        {
          id: 'ship-order',
          question: 'How would you ship my order?',
          answer:
            'For large products, we deliver your product via a third party logistics company offering you the “room of choice” scheduled delivery service. For small products, we offer free parcel delivery.'
        },
        {
          id: 'delivery-cost',
          question: 'What is the delivery cost of my order?',
          answer:
            'The cost of scheduled delivery is $69 or $99 per order, depending on the destination postal code. The parcel delivery is free.'
        },
        {
          id: 'product-damaged',
          question: 'What to do if my product arrives damaged?',
          answer:
            'We will promptly replace any product that is damaged in transit. Just contact our support team, to notify us of the situation within 48 hours of product arrival.'
        }
      ]
    },

    ai: {
      id: 'ai',
      title: 'AI Tools',
      icon: 'eos-icons:ai-operator',
      subtitle: 'AI Integration Tools',
      qandA: [
        {
          id: 'ship-order',
          question: 'How would you ship my order?',
          answer:
            'For large products, we deliver your product via a third party logistics company offering you the “room of choice” scheduled delivery service. For small products, we offer free parcel delivery.'
        },
        {
          id: 'delivery-cost',
          question: 'What is the delivery cost of my order?',
          answer:
            'The cost of scheduled delivery is $69 or $99 per order, depending on the destination postal code. The parcel delivery is free.'
        },
        {
          id: 'product-damaged',
          question: 'What to do if my product arrives damaged?',
          answer:
            'We will promptly replace any product that is damaged in transit. Just contact our support team, to notify us of the situation within 48 hours of product arrival.'
        }
      ]
    }
  }
}
mock.onGet('/pages/faqs').reply(config => {
  if (config.params) {
    const { q = '' } = config.params
    const queryLowered = q.toLowerCase()
    const filteredData = {}
    Object.entries(data.faqData).forEach(entry => {
      const [categoryName, categoryObj] = entry

      const filteredQAndAOfCategory = categoryObj.qandA.filter(qAndAObj => {
        return qAndAObj.question.toLowerCase().includes(queryLowered)
      })
      if (filteredQAndAOfCategory.length) {
        filteredData[categoryName] = {
          ...categoryObj,
          qandA: filteredQAndAOfCategory
        }
      }
    })

    return [200, { faqData: filteredData }]
  } else {
    return [200, data]
  }
})
