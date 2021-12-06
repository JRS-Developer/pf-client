import styled from 'styled-components';

export const NavbarDiv = styled.div`
  & .navbar{
    padding: 20px 15px;

    font-family: "Roboto", sans-serif;
    background: #ffffff;
    width: 260px;
    overflow: auto;
    display: inline-block;
    height: calc(100vh - 60px);
    position: fixed;
    top: 64px;
    left: 0;
    border-right: 1px solid #f2f4f9;
    box-shadow: 0 8px 10px 0 rgba(183, 192, 206, 0.2);
    z-index: 999 !important;
    transform: translateX(0%);
    transition: all 0.3s ease-out;
  }

  & .navbar.close{
    transform: translateX(-100%);
  }

  & ul{
    list-style: none;
  }

  & .navbar_links > li.navbar_list > a{
    position: relative;
    display: flex;
    text-decoration: none;
    color: #171717;
  }

  & .navbar_links > li.navbar_list > a > .icono{
    position: absolute;
    float: right;
    right: 10px;
  }

  & .navbar_sub_links > li > a{
    display: flex;
  }

  & .navbar_sub_links > li > a{
    display: flex;
    padding: 7px 5px;
    transition: all 0.3s;
    text-decoration: none;
    color: #171717;
    border-radius: 10px;
  }

  & .navbar_sub_links > li > a:hover{
    background-color: #1976D2;
    color: #f4f4f4;
  }

  & .navbar_sub_links > li > a > span{
    margin-left: 10px;
  }
`