// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { uploadFile } from 'src/store/apps/service/category'



// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { useDispatch } from 'react-redux'
import categoryImageBlock from 'src/data/categoryImageBlock'

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  },
  [theme.breakpoints.down('sm')]: {
    width: 250
  }
}))

// Styled component for the heading inside the dropzone area
const HeadingTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4)
  }
}))

const FileUploaderMultiple = () => {
  // ** State
  const [files, setFiles] = useState([])
  const dispatch = useDispatch()


  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file)))
    }
  })

  useEffect(() => {
    dispatch(uploadFile(files))
  }, [files])

  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return <img width={75} height={75} alt={file.name} src={URL.createObjectURL(file)} />
    } else {
      return <Icon icon='mdi:file-document-outline' />
    }
  }

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setFiles([...filtered])
  }

  const handlePageBlockCode = async (file) => {

  }

  const fileList = files.map(file => (
    <Box width={'100%'} my={2}>
      <Card>
        <ListItem key={file.name}>
          <Grid container>
            <Grid item lg={3}>
              {renderFilePreview(file)}
            </Grid>
            <Grid item lg={4}>
              {file.name} <br></br>
              {Math.round(file.size / 100) / 10 > 1000
                ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
                : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
            </Grid>
            <Grid item lg={4}>
              <Select
                placeholder='Parent Catrgory'
                id='demo-simple-select-outlined'
                labelId='demo-simple-select-outlined-label'
                size='small'
                fullWidth
                defaultValue={'None'}
                name="pageBlockCode"
              >
                <MenuItem value={''} selected>
                  None
                </MenuItem>
                {categoryImageBlock?.map(item => {
                return <MenuItem value={item.value}>{item.label}</MenuItem>
              })}
              </Select>
            </Grid>
          </Grid>

          <IconButton onClick={() => handleRemoveFile(file)}>
            <Icon icon='mdi:close' fontSize={20} />
          </IconButton>
        </ListItem>
      </Card>
    </Box>
  ))

  const handleLinkClick = event => {
    event.preventDefault()
  }

  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  return (
    <Fragment>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
          <Img width={155} alt='Upload img' src='/images/misc/upload.png' />
          <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
            <HeadingTypography variant='h6'>Drop files here or click to upload.</HeadingTypography>
            <Typography color='textSecondary'>
              Drop files here or click{' '}
              <Link href='/' onClick={handleLinkClick}>
                browse
              </Link>{' '}
              thorough your machine
            </Typography>
          </Box>
        </Box>
      </div>
      {files.length ? (
        <Fragment>
          <List>{fileList}</List>
          <Box width={'100%'} display={'flex'} justifyContent={'flex-start'} columnGap={4}>
            <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
              Remove All
            </Button>
            <Button variant='contained'>Upload Files</Button>
          </Box>
        </Fragment>
      ) : null}
    </Fragment>
  )
}

export default FileUploaderMultiple
