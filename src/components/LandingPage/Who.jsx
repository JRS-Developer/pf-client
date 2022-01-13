import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import DevCard from './DevCard.jsx'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

export default function Who() {
  const devs = [
    {
      name: 'Edwin Arias',
      photo: 'https://avatars.githubusercontent.com/u/86627424?v=4',
      github: 'https://github.com/ferwinred',
      linkedin: 'https://www.linkedin.com/in/ferwinarias/',
      ciudad: 'Medellín, Colombia',
    },
    {
      name: 'Valentin Nualart',
      photo: 'https://avatars.githubusercontent.com/u/86077403?v=4',
      github: 'https://github.com/ValentinCN',
      linkedin:
        'https://www.linkedin.com/in/valentin-campos-nualart-2b6362206/',
      ciudad: 'Buenos Aires, Argentina',
    },
    {
      name: 'Juan Daniele',
      photo: 'https://avatars.githubusercontent.com/u/79294743?v=4',
      github: 'https://github.com/Juandaniele',
      linkedin: 'https://www.linkedin.com/in/juan-cruz-daniele/',
      ciudad: 'Cordoba, Argentina',
    },
    {
      name: 'Luan Klett',
      photo: 'https://scontent.fros9-1.fna.fbcdn.net/v/t1.6435-9/37935767_10214973437282686_2450397499429486592_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFGXX2yFPEitCEs2MFUt6CC7Vej3QNRdMPtV6PdA1F0w9wwmWXNwOD-KyKwJuwX7AE&_nc_ohc=MIaHSuAnrOYAX_elThD&tn=pyVn8aA1FklAD8-N&_nc_ht=scontent.fros9-1.fna&oh=00_AT9_vUcAefccVatoD4ijKTorO7WXLd4tMbmla6oAOzO_ig&oe=620518B6',
      github: 'https://github.com/LuanKlett',
      linkedin: 'https://www.linkedin.com/in/luan-klett/',
      ciudad: 'Rosario, Argentina',
    },
    {
      name: 'Nicolás Liasso',
      photo: 'https://avatars.githubusercontent.com/u/87022092?v=4',
      github: 'https://github.com/NLiasso',
      linkedin: 'https://www.linkedin.com/in/nicolas-liasso/',
      ciudad: 'Santiago del Estero, Argentina',
    },
    {
      name: 'Wilmer Ortiz',
      photo: 'https://avatars.githubusercontent.com/u/5724433?v=4',
      github: 'https://github.com/wilmerortiz',
      linkedin: 'https://www.linkedin.com/in/wilmer-ortiz-castillo/',
      ciudad: 'Morales, San Martín, Perú',
    },
    {
      name: 'Jose Sanchez',
      photo: 'https://avatars.githubusercontent.com/u/77207702?v=4',
      github: 'https://github.com/JRS-Developer',
      linkedin: 'https://www.linkedin.com/in/jose-s-developer/',
      ciudad: 'Falcón, Venezuela',
    },
    {
      name: 'Leandro Villafuerte',
      photo: 'https://avatars.githubusercontent.com/u/86810646?v=4',
      github: 'https://github.com/LeandroVillafuerte',
      linkedin: 'https://www.linkedin.com/in/leandrovillafuerte/',
      ciudad: 'Tucumán, Argentina',
    },
    {
      name: 'Ignacio Amatt (HM)',
      photo: 'https://avatars.githubusercontent.com/u/83307696?v=4',
      github: 'https://github.com/nachovip',
      linkedin: 'https://www.linkedin.com/in/ignacio-amatt/',
      ciudad: 'Buenos Aires, Argentina',
    },
  ]

  return (
    <Box sx={{ p: 2 }}>
      <Paper elevation={24} sx={{ width: '100%', height: '100%', p: 2 }}>
        <Typography variant="h6" align="center">
          GAIA es el resultado de un proyecto grupal de estudiantes de{' '}
          <a style={{color: "yellow"}} href="https://www.soyhenry.com/">Henry</a>, que
          combinaron por un lado los conocimientos adquiridos durante el
          bootcamp, y por otro la habilidad de adquirir nuevos conocimientos a un
          ritmo mucho mayor de lo normal. Luego de muchas semanas repletas de
          trabajo, risas, estrechar vinculos, re-descubrir nuestras habilidades
          y crecimiento académico y profesional, nació GAIA. Este es el humilde
          equipo que trabajó con mucha pasión:
        </Typography>
        <br />
        <Grid container sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          {devs.map((dev) => {
            return <DevCard dev={dev} />
          })}
        </Grid>
      </Paper>
    </Box>
  )
}

/*         <p>Edwin Arias</p>
          <a href="https://github.com/ferwinred">{gitHubIconImage}</a>
          <a href="https://www.linkedin.com/in/ferwinarias/">{linkedinIcon}</a>
          <br />
          {pinUbicacionIcon} <span>Medellín, Antioquia, Colombia</span>
          <br></br>
          <p>Valentin Campos Nualart</p>
          <a href="https://github.com/ValentinCN">{gitHubIconImage}</a>
          <a href="https://www.linkedin.com/in/valentin-campos-nualart-2b6362206/">
            {linkedinIcon}
          </a>
          <br></br>
          {pinUbicacionIcon}{' '}
          <span>Partido de Quilmes, Provincia de Buenos Aires, Argentina</span>
          <br></br>
          <p>Juan Daniele</p>
          <a href="https://github.com/Juandaniele">{gitHubIconImage}</a>
          <a href="https://www.linkedin.com/in/juan-cruz-daniele/">
            {linkedinIcon}
          </a>
          <br></br>
          {pinUbicacionIcon} <span>Cordoba, Argentina</span>
          <br></br>
          <p>Luan Klett</p>
          <a href="https://github.com/LuanKlett">{gitHubIconImage}</a>
          <a href="https://www.linkedin.com/in/luan-klett/">{linkedinIcon}</a>
          <br></br>
          {pinUbicacionIcon}
          <span>Rosario, Santa Fe, Argentina</span>
          <br></br>
          <p>Nicolás Liasso</p>
          <a href="https://github.com/NLiasso">{gitHubIconImage}</a>
          <a href="https://www.linkedin.com/in/nicolas-liasso/">
            {linkedinIcon}
          </a>
          <br></br>
          {pinUbicacionIcon}
          <span>Santiago del Estero, Argentina</span>
          <br></br>
          <p>Wilmer Ortiz Castillo</p>
          <a href="https://github.com/wilmerortiz">{gitHubIconImage}</a>
          <a href="https://www.linkedin.com/in/wilmer-ortiz-castillo/">
            {linkedinIcon}
          </a>
          <br></br>
          {pinUbicacionIcon}
          <span>Morales, San Martín, Perú</span>
          <br></br>
          <p>Jose Sanchez</p>
          <a href="https://github.com/JRS-Developer">{gitHubIconImage}</a>
          <a href="https://www.linkedin.com/in/jose-s-developer/">
            {linkedinIcon}
          </a>
          <br></br>
          {pinUbicacionIcon}
          <span>Falcón, Venezuela</span>
          <br></br>
          <p>Leandro Villafuerte</p>
          <a href="https://github.com/LeandroVillafuerte">{gitHubIconImage}</a>
          <a href="https://www.linkedin.com/in/leandrovillafuerte/">
            {linkedinIcon}
          </a>
          <br></br>
          {pinUbicacionIcon}
          <span>San Miguel de Tucumán, Tucumán, Argentina</span>
          <br></br>
          <p>Ignacio Amatt (HM)</p>
          <a href="https://github.com/nachovip">{gitHubIconImage}</a>
          <a href="https://www.linkedin.com/in/ignacio-amatt/">
            {linkedinIcon}
          </a>
          <br></br>
          {pinUbicacionIcon}
          <span>Buenos Aires, Argentina</span> */

// const githubProfileImages = {
//   Nicolas: 'https://avatars.githubusercontent.com/u/87022092?v=4',
//   Luan: 'https://avatars.githubusercontent.com/u/87107327?v=4',
//   Wilmer: 'https://avatars.githubusercontent.com/u/5724433?v=4',
//   Leandro: 'https://avatars.githubusercontent.com/u/86810646?v=4',
//   Valentin: 'https://avatars.githubusercontent.com/u/86077403?v=4',
//   Jose: 'https://avatars.githubusercontent.com/u/77207702?v=4',
//   Juan: 'https://avatars.githubusercontent.com/u/79294743?v=4',
//   Edwin: 'https://avatars.githubusercontent.com/u/86627424?v=4',
//   Ignacio: "https://avatars.githubusercontent.com/u/83307696?v=4",
// }
