import { useState } from 'react'
import {
  Box,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  CardMedia,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Chip,
  Menu,
  MenuItem,
} from '@mui/material/'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import {
  Favorite,
  Fullscreen,
  Article,
  Image,
  MoreVert,
  Edit,
  Delete,
} from '@mui/icons-material/'
import { pink } from '@mui/material/colors'
import { format } from 'date-fns'
import { useDispatch } from 'react-redux'
import { likePost } from '../../actions/post'
import { shortName } from './utils'

export default function Post({
  id,
  avatar,
  title,
  description,
  name,
  imgs,
  docs,
  date,
  likes,
  madeLike,
  handleFull,
  handleDelete,
  handleEdit,
  publisherId,
}) {
  const dispatch = useDispatch()
  const [openMenu, setOpenMenu] = useState(false)
  const [anchorNav, setAnchorNav] = useState(null)

  const favoriteProps = {}
  madeLike && (favoriteProps.sx = { color: pink[200] })

  const isMyPost = publisherId === localStorage.getItem('user')

  const handleLike = () => {
    dispatch(likePost(id))
  }

  const handleOpenMenu = (e) => {
    setAnchorNav(e.currentTarget)
    setOpenMenu(true)
  }

  const handleCloseMenu = () => {
    setAnchorNav(null)
    setOpenMenu(false)
  }

  const menuItems = [
    {
      text: 'Editar',
      icon: Edit,
      onClick: handleEdit,
    },
    { text: 'Eliminar', icon: Delete, onClick: handleDelete },
  ]

  const showImgs = () =>
    imgs.length && !docs.length ? (
      imgs.length > 1 ? (
        <ImageList cols={2}>
          {imgs.map((img) => {
            return (
              <ImageListItem
                key={img.id}
                sx={{
                  ':hover button': {
                    opacity: 1,
                    transition: 'opacity .7s',
                  },
                }}
              >
                <img src={img.url} alt={img.name} loading="lazy" />
                <ImageListItemBar
                  actionIcon={
                    <IconButton
                      sx={{
                        opacity: 0,
                        transition: 'opacity .7s',
                      }}
                      onClick={() => handleFull(img)}
                    >
                      <Fullscreen />
                    </IconButton>
                  }
                />
              </ImageListItem>
            )
          })}
        </ImageList>
      ) : (
        <CardMedia component="img" image={imgs[0].url} alt={imgs[0].name} />
      )
    ) : null

  const showFiles = () => {
    const chipProps = {
      component: 'a',
      color: 'primary',
      clickable: true,
      rel: 'noreferrer',
      target: '_blank',
    }
    return docs.length ? (
      <Box
        display="flex"
        sx={{
          flexWrap: 'wrap',
          gap: '.5rem',
          paddingTop: '1rem',
        }}
      >
        {docs.map((doc) => (
          <Chip
            {...chipProps}
            key={doc.id}
            icon={<Article />}
            label={shortName(doc.name)}
            href={doc.url}
          />
        ))}
        {imgs.map((img) => (
          <Chip
            {...chipProps}
            key={img.id}
            icon={<Image />}
            label={shortName(img.name)}
            href={img.url}
          />
        ))}
      </Box>
    ) : null
  }

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader
          avatar={<Avatar alt={name} src={avatar} />}
          title={name}
          subheader={format(new Date(date), 'MMMM, d, yyyy')}
          action={
            isMyPost ? (
              <>
                <IconButton onClick={handleOpenMenu}>
                  <MoreVert />
                </IconButton>
                <Menu
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={openMenu}
                  onClose={handleCloseMenu}
                  anchorEl={anchorNav}
                >
                  {menuItems.map((item) => (
                    <MenuItem
                      disableRipple
                      key={`${id}-${item.text}`}
                      onClick={item.onClick}
                    >
                      <item.icon
                        sx={{
                          marginRight: '5px',
                        }}
                      />
                      <Typography>{item.text}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              false
            )
          }
        />
        {showImgs()}
        <CardContent>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2">{description}</Typography>
          {showFiles()}
        </CardContent>
        <CardActions>
          <IconButton aria-label="add to favorites" onClick={handleLike}>
            <Favorite {...favoriteProps} />
          </IconButton>
          <Typography variant="body2">{likes.length}</Typography>
        </CardActions>
      </Card>
    </Grid>
  )
}
