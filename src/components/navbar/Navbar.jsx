import React from "react";
import {Link} from 'react-router-dom'
import {KeyboardArrowDown } from '@mui/icons-material';
import { NavbarDiv } from './NavbarStyles';
import Icon from '@mui/material/Icon';
import Box from '@mui/material/Box';

const data = [
  {
    id: 1,
    name: "SEGURIDAD",
    url: "#",
    module_id: 0,
    icon: null,
    sub_data: [
      {
        id: 11,
        name: "Roles",
        url: "/roles",
        module_id: 1,
        icon: "account_circle"
      },{
        id: 12,
        name: "Usuarios",
        url: "/users",
        module_id: 1,
        icon: "people"
      },{
        id: 13,
        name: "Acciones",
        url: "/actions",
        module_id: 1,
        icon: "format_list_bulleted"
      },{
        id: 14,
        name: "Módulos",
        url: "/modules",
        module_id: 1,
        icon: "reorder"
      }
    ]
  }, {
    id: 2,
    name: "COMUNICACIÓN",
    url: "#",
    module_id: 0,
    icon: null,
    sub_data: [
      {
        id: 21,
        name: "Noticias",
        url: "/noticias",
        module_id: 2,
        icon: "campaign"
      }, {
        id: 22,
        name: "Noticias 2",
        url: "/noticias",
        module_id: 2,
        icon: "campaign"
      }
    ]
  },{
    id: 3,
    name: "AULA VIRTUAL",
    url: "#",
    module_id: 0,
    icon: null,
    sub_data: [
      {
        id: 31,
        name: "Materia",
        url: "/materias",
        module_id: 3,
        icon: "campaign"
      }, {
        id: 32,
        name: "Materia 2",
        url: "/materias",
        module_id: 3,
        icon: "campaign"
      }
    ]
  }
]

const Navbar = ({show, click}) => {
  const navbarClass = ["navbar"];

  if(show){
    navbarClass.push('close')
  }

  return (
    <NavbarDiv>
      <nav className={navbarClass.join(" ")}>
        <ul className="navbar_links">
          {data.map(module => (
            <li key={module.id} className="navbar_list">
              <Link to={module.url}><Box sx={{color: 'text.primary'}}>{module.name}</Box><KeyboardArrowDown className="icono" sx={{color: 'text.primary'}}/></Link>
              <ul className="navbar_sub_links">
                {module.sub_data.map(subModule => (
                  <li key={subModule.id}>
                    <Link to={subModule.url}>
                      <Icon sx={{color: 'text.primary'}}>{subModule.icon}</Icon>
                      <span><Box sx={{color: 'text.primary'}}>{subModule.name}</Box></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </NavbarDiv>
  )
}

export default Navbar