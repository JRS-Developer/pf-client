import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grow from '@mui/material/Grow'

export default function Who() {
  return (
    <Box sx={{ p: 5, height: 'calc(100vh - 64px)' }}>
      <Grow in={true} timeout={500}>
        <Paper elevation={24} sx={{ width: '100%', height: '100%', p: 2 }}>
          <p>
            GAIA es el resultado de un proyecto grupal de estudiantes de Henry
            (link a henry), que combinaron por un lado los conocimientos
            adquiridos durante el bootcamp, y por otro la habilidad de adquirir
            nuevos conocmientos a un ritmo mucho mayor de lo normal. Luego de
            muchas semanas repletas de trabajo, risas, estrechar vinculos,
            re-descubrir nuestras habilidades y crecimiento académico y
            profesional, nació GAIA. Este es el humilde equipo que trabajó con
            mucha pasión:
          </p>
          <p>Edwin Arias</p>
          <a href="https://github.com/ferwinred">GitHub Profile</a>
          <a href="https://www.linkedin.com/in/ferwinarias/">
            LinkedIn Profile
          </a>
          Medellín, Antioquia, Colombia
          <br></br>
          <p>Valentin Campos Nualart</p>
          <a href="https://github.com/ValentinCN">GitHub Profile</a>
          <a href="https://www.linkedin.com/in/valentin-campos-nualart-2b6362206/">
            LinkedIn Profile
          </a>
          Partido de Quilmes, Provincia de Buenos Aires, Argentina
          <br></br>
          <p>Juan Daniele</p>
          <a href="https://github.com/Juandaniele">GitHub Profile</a>
          <a href="https://www.linkedin.com/in/juan-cruz-daniele/">
            LinkedIn Profile
          </a>
          Cordoba, Argentina
          <br></br>
          <p>Luan Klett</p>
          <a href="https://github.com/LuanKlett">GitHub Profile</a>
          <a href="https://www.linkedin.com/in/luan-klett/">LinkedIn Profile</a>
          Rosario, Santa Fe, Argentina
          <br></br>
          <p>Nicolás Liasso</p>
          <a href="https://github.com/NLiasso">GitHub Profile</a>
          <a href="https://www.linkedin.com/in/nicolas-liasso/">
            LinkedIn Profile
          </a>
          Santiago del Estero, Argentina
          <br></br>
          <p>Wilmer Ortiz Castillo</p>
          <a href="https://github.com/wilmerortiz">GitHub Profile</a>
          <a href="https://www.linkedin.com/in/wilmer-ortiz-castillo/">
            LinkedIn Profile
          </a>
          Morales, San Martín, Perú
          <br></br>
          <p>Jose Sanchez</p>
          <a href="https://github.com/JRS-Developer">GitHub Profile</a>
          <a href="https://www.linkedin.com/in/jose-s-developer/">
            LinkedIn Profile
          </a>
          Falcón, Venezuela
          <br></br>
          <p>Leandro Villafuerte</p>
          <a href="https://github.com/LeandroVillafuerte">GitHub Profile</a>
          <a href="https://www.linkedin.com/in/leandrovillafuerte/ ">
            LinkedIn Profile
          </a>
          San Miguel de Tucumán, Tucumán, Argentina
          <br></br>
          <p>Ignacio Amatt (HM)</p>
          <a href="https://github.com/nachovip">GitHub Profile</a>
          <a href="https://www.linkedin.com/in/ignacio-amatt/">
            LinkedIn Profile
          </a>
          Buenos Aires, Argentina
        </Paper>
      </Grow>
    </Box>
  )
}
