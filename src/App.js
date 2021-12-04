import Hello from './components/Hello'
import { useDispatch, useSelector } from 'react-redux'
import { setLogged } from './actions/user'

// INFO: This is only a example, this will be removed

function App() {
  const dispatch = useDispatch()
  const { isLogged } = useSelector(state => state.user)

  return (
    <>
      <button onClick={() => dispatch(setLogged())}>Change Logged</button>
      <p>Is logged? {isLogged.toString()}</p>
      <Hello />
    </>
  )
}

export default App
