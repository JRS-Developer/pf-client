import {Switch, Route} from "react-router-dom";
//import { useDispatch, useSelector } from 'react-redux';
import {ContainerDiv} from './ContainerStyles'

// Components
// import Hello from '../Hello';
// import {setLogged} from "../../actions/user";
import ProfileIndex from "../profile/ProfileIndex";
import ActionIndex from "../action/ActionIndex";
import UserIndex from "../User/UserIndex"
import ModuleIndex from "../module/ModuleIndex";
import ClassRoom from "../classroom/classroom";

const Content = ({show}) => {
  // const dispatch = useDispatch()
  // const { isLogged } = useSelector(state => state.user)

  return(
    <ContainerDiv> {/*Div para styled-components*/}
      <section className={show && 'close'}>
        <Switch>
          <Route exact path="/roles" component={ProfileIndex} />
          <Route exact path="/actions" component={ActionIndex} />
          <Route exact path="/modules" component={ModuleIndex} />
          <Route exact path="/users" component={UserIndex}/>
          <Route exact path="/materias" component={ClassRoom}/>
        </Switch>
       {/*  <button onClick={() => dispatch(setLogged())}>Change Logged</button>
        <p>Is logged? {isLogged.toString()}</p>
        <Hello /> */}
      </section>
    </ContainerDiv>
  )
}

export default Content