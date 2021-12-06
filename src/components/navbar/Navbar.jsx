import {Link} from 'react-router-dom'
import { CampaignTwoTone, KeyboardArrowDown } from '@mui/icons-material';
import { NavbarDiv } from './NavbarStyles';

const Navbar = ({show, click}) => {
  const navbarClass = ["navbar"];

  if(show){
    navbarClass.push('close')
  }

  return (
    <NavbarDiv>
      <nav className={navbarClass.join(" ")}>
        <ul className="navbar_links">
          <li className="navbar_list">
            <Link to="#">COMUNICACIÓN <KeyboardArrowDown className="icono"/></Link>
            <ul className="navbar_sub_links">
              <li>
                <Link to="/">
                  <CampaignTwoTone sx={{fontSize: 28}}/>
                  <span>Noticias</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <CampaignTwoTone sx={{fontSize: 28}}/>
                  <span>Noticias</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <CampaignTwoTone sx={{fontSize: 28}}/>
                  <span>Noticias</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <CampaignTwoTone sx={{fontSize: 28}}/>
                  <span>Noticias</span>
                </Link>
              </li>
            </ul>
          </li>
          <li className="navbar_list">
            <Link to="#">AULA VIRTUAL <KeyboardArrowDown className="icono" /></Link>
            <ul className="navbar_sub_links">
              <li>
                <Link to="/">
                  <CampaignTwoTone sx={{fontSize: 28}}/>
                  <span>Noticias</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <CampaignTwoTone sx={{fontSize: 28}}/>
                  <span>Noticias</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <CampaignTwoTone sx={{fontSize: 28}}/>
                  <span>Noticias</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <CampaignTwoTone sx={{fontSize: 28}}/>
                  <span>Noticias</span>
                </Link>
              </li>
              <li>
                <Link to="/roles">
                  <CampaignTwoTone sx={{fontSize: 28}}/>
                  <span>Nuevo link</span>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </NavbarDiv>
  )
}

export default Navbar