import { Switch, Route } from "react-router-dom";
import { ContainerDiv } from './ContainerStyles'

// Components
import ProfileIndex from "../profile/ProfileIndex";
import ActionIndex from "../action/ActionIndex";
import UserIndex from "../User/UserIndex"
import ModuleIndex from "../module/ModuleIndex";
import ClassRoom from "../classroom/classroom";

const Content = ({ show }) => {// Es Export defualt podes poner cualquier nombre en el import
  return (
    <ContainerDiv> {/*Div para styled-components*/}
      <section className={show && 'close'}>
        <Switch>
          <Route exact path="/roles" component={ProfileIndex} />
          <Route exact path="/actions" component={ActionIndex} />
          <Route exact path="/modules" component={ModuleIndex} />
          <Route exact path="/users" component={UserIndex} />
          <Route exact path="/materias" component={ClassRoom} />
        </Switch>
      </section>
    </ContainerDiv>
  )
}

export default Content
