import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {Link} from 'react-router-dom'
import {KeyboardArrowDown } from '@mui/icons-material';
import { NavbarDiv } from './NavbarStyles';
import Icon from '@mui/material/Icon';
import Box from '@mui/material/Box';

import { getNavbar as listNavbar } from "../../actions/navbar";
import { getActionsByModule } from "../../actions/actionsModule";

const Navbar = ({show, click}) => {
  const dispatch = useDispatch();

  const getNavbar = useSelector(state => state.navbarReducer);
  const { navbar, loading, error } = getNavbar;

  //let userId = '2e9e4070-2d42-41ed-8c6b-a018f40c7757'

  useEffect(() => {
    dispatch(listNavbar())
  }, [dispatch])

  const getActionsModule = (moduleId) => {
    dispatch(getActionsByModule(moduleId))
  }

  const navbarClass = ["navbar"];

  if(show){
    navbarClass.push('close')
  }
  //console.log(loading && navbar)

  return (

    <NavbarDiv>
      <nav className={navbarClass.join(" ")}>
        <ul className="navbar_links">
          { loading ? <li>Loading...</li> : error ? <li>{error}</li> : navbar?.map(module => (
            <li key={module.id} className="navbar_list">
              <Link to={module.url}><Box sx={{color: 'text.primary'}}>{module.name}</Box><KeyboardArrowDown className="icono" sx={{color: 'text.primary'}}/></Link>
              <ul className="navbar_sub_links">
                {module.sub_data.map(subModule => (
                  <li key={subModule.id} onClick={() => getActionsModule(subModule.id)}>
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