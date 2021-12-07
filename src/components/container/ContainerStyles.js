import styled from 'styled-components'

export const ContainerDiv = styled.div`
  & section{
    margin-top: 70px;
    margin-left: 260px;
    padding: 20px;
    overflow-y: hidden;
    transition: all 0.3s;
  }
  & section.close{
    margin-left: 0;
  }
`