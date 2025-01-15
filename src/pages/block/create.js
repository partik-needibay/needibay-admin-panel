import { Puck } from '@measured/puck'
import '@measured/puck/puck.css'
import { Box, Button, Typography, Grid } from '@mui/material'
import Link from 'next/link'
import PageHeader from 'src/@core/components/page-header'

const config = {
  components: {
    HeadingBlock: {
      fields: {
        title: { type: 'text' },
        imgSrc: { type: 'text' }
      },
      defaultProps: {
        title: 'Heading'
      },
      render: ({ title, imgSrc }) => (
        <div>
            <img src={imgSrc} style={{width: "100%"}} />
          <h1>{title}</h1>
        </div>
      )
    }
  }
}

// Describe the initial data
const initialData = {
  content: [],
  root: {}
}

const CreateBlock = props => {
  // Save the data to your database
  const save = data => {
    data.root.slug = "testing"
    console.log(data)
  }
  return (
    <Grid container spacing={6}>
      
      <Grid item xs={12}>
        <Puck
          config={config}
          data={initialData}
          onPublish={save}

        />
        ;
      </Grid>
    </Grid>
  )
}

export default CreateBlock
