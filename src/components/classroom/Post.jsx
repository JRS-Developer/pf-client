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
} from '@mui/material/'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { Favorite, Fullscreen, Article, Image } from '@mui/icons-material/'
import { pink } from '@mui/material/colors'
import { format } from 'date-fns'
import { useDispatch } from 'react-redux'
import { likePost } from '../../actions/post'

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
}) {
  const dispatch = useDispatch()
  const favoriteProps = {}
  madeLike && (favoriteProps.sx = { color: pink[200] })

  const handleLike = () => {
    dispatch(likePost(id))
  }

  // Acorta el nombre de los archivos largos, y al final le añade la extension del archivo
  // Ej: superlargoarchivo...jpg
  const shortName = (text) => {
    return text.substr(0, 15) + '...' + text.split('.').pop()
  }

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
      <Card sx={{ width: '95%' }}>
        <CardHeader
          avatar={<Avatar alt={name} src={avatar} />}
          title={name}
          subheader={format(new Date(date), 'MMMM, d, yyyy')}
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
