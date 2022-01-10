import styled from 'styled-components'

export const NavbarDiv = styled.div`
  & .navbar {
    padding: 20px 15px;
    font-family: 'Roboto', sans-serif;
    width: 200px;
    overflow: auto;
    display: inline-block;
    height: calc(100vh - 60px);
    position: fixed;
    top: 64px;
    left: 0;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
      rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    z-index: 999 !important;
    transform: translateX(0%);
    transition: all 0.3s ease-out;
  }

  & .navbar.close {
    transform: translateX(-100%);
  }

  & ul {
    list-style: none;
  }

  & .navbar_links > li.navbar_list > a {
    position: relative;
    display: flex;
    text-decoration: none;
    margin: 15px 0;
    font-weight: bold;
  }

  & .navbar_links > li.navbar_list > a > .icono {
    position: absolute;
    float: right;
    right: 10px;
  }

  & .navbar_sub_links > li > a {
    display: flex;
  }

  & .navbar_sub_links > li > a {
    display: flex;
    padding: 7px 5px;
    transition: all 0.3s;
    text-decoration: none;
    border-radius: 10px;
  }

  & .navbar_sub_links > li > a:hover {
  }

  & .navbar_sub_links > li > a > span {
    margin-left: 10px;
  }
`
