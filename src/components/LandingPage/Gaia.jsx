import Logo from '../../logo2.png'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Slide from '@mui/material/Slide'
import Paper from '@mui/material/Paper'
import { ObjectFit } from './styles'

export default function Gaia({ scroll }) {
  return (
    <Grid container>
      <Slide in={true} direction="up">
        <Grid
          item
          xs={4}
          sx={{
            p: 5,
            pr: 2.5,
            pb: 2.5,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src={Logo} style={{ width: '100%' }} alt="Logo Gaia" />
        </Grid>
      </Slide>
      <Slide in={true} timeout={500} direction="left">
        <Grid
          item
          xs={8}
          sx={{ p: 5, pl: 2.5, pb: 2.5, display: 'flex', alignItems: 'center' }}
        >
          <Paper sx={{ width: '100%', height: '250px', p: 2 }}>
            <Typography variant="h3" sx={{ color: 'primary.main' }}>
              ¿Que es Gaia?
            </Typography>
            <Typography variant="h6" component="div">
              <br />
              <p>
                Gaia es un sistema de Gestión Administrativa e Innovación
                Académica, con una amplia gama de funcionalidades y un amplio
                abanico de posibilidades de personalización. En GAIA buscamos
                brindarte la mejor de las experiencias de usuario.
              </p>
            </Typography>
          </Paper>
        </Grid>
      </Slide>
      <Slide in={true} timeout={500} direction="up">
        <Grid
          item
          xs={9}
          sx={{ p: 2.5, pl: 5, display: 'flex', alignItems: 'center' }}
        >
          <Paper sx={{ width: '100%', height: '500px', p: 2 }}>
            <br />
            <Typography
              component="span"
              variant="h3"
              sx={{ color: 'primary.main' }}
            >
              G
            </Typography>
            <Typography component="span" variant="h6">
              estionar los distintos espacios institucionales, gracias a nuestro
              sistema de modulos que te permitirá compartimentar la información
              de una manera clara e intuitiva.
            </Typography>
            <div />
            <Typography
              component="span"
              variant="h3"
              sx={{ color: 'primary.main' }}
            >
              A
            </Typography>
            <Typography component="span" variant="h6">
              dministrativamente notarás mejoras instantaneas, permitiendote
              ahorrar tiempo, obtener claridad en el flujo de información,
              lograr una optimización de los procesos, lo que se traducirá de
              manera casi inmediata en una mayor rentabilidad para tu negocio.
            </Typography>
            <div />
            <Typography
              component="span"
              variant="h3"
              sx={{ color: 'primary.main' }}
            >
              I
            </Typography>
            <Typography component="span" variant="h6">
              nnovar es el único camino para el éxito, por eso contarás con un
              equipo totalmente capacitado y comprometido con tu crecimiento
              como comunidad educativa. Pondremos a tu disposición no tan solo
              nuestros conocimientos, sino también nuestro carisma y pasión por
              la excelencia.
            </Typography>
            <div />
            <Typography
              component="span"
              variant="h3"
              sx={{ color: 'primary.main' }}
            >
              A
            </Typography>
            <Typography component="span" variant="h6">
              cademicamente brindarás una mejor experiencia a los miembros de tu
              comunidad educativa, como así también la sensanción de respaldo,
              progreso, compromiso, transparencia y dinamismo.
            </Typography>
          </Paper>
        </Grid>
      </Slide>
      <Slide in={true} timeout={500} direction="right">
        <Grid
          item
          xs={3}
          sx={{ p: 2.5, pr: 5, display: 'flex', alignItems: 'center' }}
        >
          <Paper sx={{ width: '100%', height: '500px' }}>
            <ObjectFit style={{ height: '500px' }}>
              <img
                id="niñite"
                style={{ width: '100%', height: '500px' }}
                alt="Niñite"
                src="/imgLanding/niñite.jpg"
              />
            </ObjectFit>
          </Paper>
        </Grid>
      </Slide>
      <Slide in={true} timeout={500} direction="up">
        <Grid
          item
          xs={5}
          sx={{ p: 2.5, pl: 5, display: 'flex', alignItems: 'center' }}
        >
          <Paper sx={{ width: '100%', height: '100%', p: 2 }}>
            <Typography
              component="span"
              variant="h3"
              sx={{ color: 'primary.main' }}
            >
              Chat
            </Typography>
            <Typography variant="h6" component="div">
              <p>
                Los usuarios pueden chatear con los compañeros de clase y el
                profesor de cada materia.
              </p>
            </Typography>
          </Paper>
        </Grid>
      </Slide>
      <Slide in={true} timeout={500} direction="right">
        <Grid
          item
          xs={7}
          sx={{ p: 2.5, pr: 5, display: 'flex', alignItems: 'center' }}
        >
          <ObjectFit style={{ height: '250px' }}>
            <img
              id="niñite"
              style={{ width: '100%', height: '250px' }}
              alt="Chat"
              src="/imgLanding/Chat.jpg"
            />
          </ObjectFit>
        </Grid>
      </Slide>
      <Slide in={true} timeout={500} direction="up">
        <Grid
          item
          xs={7}
          sx={{ p: 2.5, pl: 5, display: 'flex', alignItems: 'center' }}
        >
          <ObjectFit style={{height: "250px"}}>
              <img id="niñite" style={{width:"100%", height: "250px"}} alt="Tareas" src="/imgLanding/Tareas.jpg"/>
            </ObjectFit>
        </Grid>
      </Slide>
      <Slide in={true} timeout={500} direction="right">
        <Grid
          item
          xs={5}
          sx={{ p: 2.5, pr: 5, display: 'flex', alignItems: 'center' }}
        >
          <Paper sx={{ width: '100%', height: '250px', p: 2 }}>
          <Typography
              component="span"
              variant="h3"
              sx={{ color: 'primary.main' }}
            >
              Tareas
            </Typography>
            <Typography variant="h6" component="div">
              <p>
                Administración de tareas en el entorno de alumno y profesor. De forma sencilla e intuitiva.
              </p>
            </Typography>
          </Paper>
        </Grid>
      </Slide>
      <Slide in={true} timeout={500} direction="up">
        <Grid
          item
          xs={5}
          sx={{ p: 2.5, pl: 5, display: 'flex', alignItems: 'center' }}
        >
          <Paper sx={{ width: '100%', height: '100%', p: 2 }}>
            <Typography
              component="span"
              variant="h3"
              sx={{ color: 'primary.main' }}
            >
              Aula Virtual
            </Typography>
            <Typography variant="h6" component="div">
              <p>
                Visualizacion de todas las materias de la clase a la que pertenece el alumno.
                
              </p>
            </Typography>
          </Paper>
        </Grid>
      </Slide>
      <Slide in={true} timeout={500} direction="right">
        <Grid
          item
          xs={7}
          sx={{ p: 2.5, pr: 5, display: 'flex', alignItems: 'center' }}
        >
          <ObjectFit style={{ height: '250px' }}>
            <img
              id="niñite"
              style={{ width: '100%', height: '250px' }}
              alt="Classroom"
              src="/imgLanding/Classroom.jpg"
            />
          </ObjectFit>
        </Grid>
      </Slide>
    </Grid>
  )
}
