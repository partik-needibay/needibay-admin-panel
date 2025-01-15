// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Switch from '@mui/material/Switch'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import TreeView from '@mui/lab/TreeView'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import TreeItem from '@mui/lab/TreeItem'
import FormLayoutsCollapsible from 'src/views/forms/form-layouts/FormLayoutsCollapsible'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

// ** Custom Icon Import
import Icon from 'src/@core/components/icon'
import { Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import Upload from './upload'

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

const CatalogComponent = ({ direction }) => {
  const ExpandIcon = <Icon icon={direction === 'rtl' ? 'mdi:chevron-left' : 'mdi:chevron-right'} />
  return (
    <div style={{ height: '100%' }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={2}></Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <List>
                <Accordion expanded>
                  <AccordionSummary
                    id='panel-header-1'
                    aria-controls='panel-content-1'
                    expandIcon={<Icon icon='mdi:chevron-down' />}
                  >
                    <ListItemIcon>Product Base Details</ListItemIcon>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ListItem>
                      <ListItemIcon sx={{ width: 175 }}>Enable Product</ListItemIcon>
                      <ListItemText>
                        <Switch defaultChecked />
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ width: 175 }}>Catalog Category</ListItemIcon>
                      <ListItemText>
                        <Select
                          label='Product Catrgory'
                          defaultValue=''
                          id='demo-simple-select-outlined'
                          labelId='demo-simple-select-outlined-label'
                          size='small'
                          fullWidth
                        >
                          <MenuItem value=''>
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ width: 175 }}>Product Type</ListItemIcon>
                      <ListItemText>
                        <Select
                          label='Product Catrgory'
                          defaultValue=''
                          id='demo-simple-select-outlined'
                          labelId='demo-simple-select-outlined-label'
                          size='small'
                          fullWidth
                        >
                          <MenuItem value=''>
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={10}>Simple</MenuItem>
                          <MenuItem value={20}>Grouped</MenuItem>
                          <MenuItem value={30}>Configurable</MenuItem>
                        </Select>
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ width: 175 }}>Product Name</ListItemIcon>
                      <ListItemText>
                        <TextField size='small' label='e.g. Food Items' placeholder='Leonard Carter' fullWidth />
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ width: 175 }}>SKU</ListItemIcon>
                      <ListItemText>
                        <TextField size='small' label='e.g. food-items' placeholder='Leonard Carter' fullWidth />
                      </ListItemText>
                    </ListItem>

                    <ListItem>
                      <ListItemIcon sx={{ width: 175 }}>Description</ListItemIcon>
                      <ListItemText>
                        <TextField
                          rows={4}
                          multiline
                          fullWidth
                          label='Category Description for Store View'
                          defaultValue='Category Description for Store View'
                        />
                      </ListItemText>
                    </ListItem>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    id='panel-header-1'
                    aria-controls='panel-content-1'
                    expandIcon={<Icon icon='mdi:chevron-down' />}
                  >
                    <ListItemIcon>Images/Video</ListItemIcon>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ListItem>
                      <ListItemIcon sx={{ width: 175 }}>Add Image/Video</ListItemIcon>
                      <ListItemText>
                        <Upload />
                      </ListItemText>
                    </ListItem>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    id='panel-header-1'
                    aria-controls='panel-content-1'
                    expandIcon={<Icon icon='mdi:chevron-down' />}
                  >
                    <ListItemIcon>SEO</ListItemIcon>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ListItem>
                      <ListItemIcon sx={{ width: 175 }}>Meta title</ListItemIcon>
                      <ListItemText>
                        <TextField size='small' label='Meta Title' placeholder='' fullWidth />
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ width: 175 }}>Meta Description</ListItemIcon>
                      <ListItemText>
                        <TextField
                          rows={4}
                          multiline
                          fullWidth
                          label='Meta Description Used For SEO Purpose'
                          defaultValue='Category Description for Store View'
                        />
                      </ListItemText>
                    </ListItem>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary
                    id='panel-header-1'
                    aria-controls='panel-content-1'
                    expandIcon={<Icon icon='mdi:chevron-down' />}
                  >
                    <ListItemIcon>Stock & Inventory</ListItemIcon>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ListItem>
                      <ListItemIcon sx={{ width: 175 }}>Stock Availability</ListItemIcon>
                      <ListItemText>
                        <Switch defaultChecked />
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ width: 175 }}>Quantity</ListItemIcon>
                      <ListItemText>
                        <TextField size='small' label='e.g. 1000' placeholder='' fullWidth />
                      </ListItemText>
                    </ListItem>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary
                    id='panel-header-1'
                    aria-controls='panel-content-1'
                    expandIcon={<Icon icon='mdi:chevron-down' />}
                  >
                    <ListItemIcon>Product Configuration</ListItemIcon>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box width={'100%'} display='flex' justifyContent={'center'} m={4}>
                      <Button size='small' color='primary' variant='outlined'>
                        Create Configurations
                      </Button>
                    </Box>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    id='panel-header-1'
                    aria-controls='panel-content-1'
                    expandIcon={<Icon icon='mdi:chevron-down' />}
                  >
                    <ListItemIcon>Product Attributes</ListItemIcon>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Wafer sesame snaps chocolate bar candy canes halvah. Cupcake sesame snaps sweet tart dessert
                      biscuit. Topping soufflé tart sweet croissant.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    id='panel-header-1'
                    aria-controls='panel-content-1'
                    expandIcon={<Icon icon='mdi:chevron-down' />}
                  >
                    <ListItemIcon>Related Products</ListItemIcon>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Wafer sesame snaps chocolate bar candy canes halvah. Cupcake sesame snaps sweet tart dessert
                      biscuit. Topping soufflé tart sweet croissant.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={2}></Grid>
      </Grid>
    </div>
  )
}

export default CatalogComponent
