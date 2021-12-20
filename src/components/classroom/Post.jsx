import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  CardMedia,
  IconButton,
} from '@mui/material/'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { Favorite } from '@mui/icons-material/'
import { pink } from '@mui/material/colors'
import { format } from 'date-fns'

export default function Post({
  avatar,
  title,
  description,
  name,
  img,
  date,
  likes,
  madeLike,
}) {
  const favoriteProps = {}
  madeLike && (favoriteProps.sx = { color: pink[200] })

  return (
    <Grid item xs={12}>
      <Card sx={{ width: '95%' }}>
        <CardHeader
          avatar={<Avatar alt={name} src={avatar} />}
          title={name}
          subheader={format(new Date(date), 'MMMM, d, yyyy')}
        />
        {img?.length && (
          <CardMedia component="img" image={img[0]} alt={title} />
        )}
        <CardContent>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="add to favorites">
            <Favorite {...favoriteProps} />
          </IconButton>
          {likes.length}
        </CardActions>
      </Card>
    </Grid>
  )
}
