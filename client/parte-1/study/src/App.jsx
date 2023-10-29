import './App.css'
import Mensaje from './Mensaje'

const Description = () => {
  return <p>Esta es la app del curso</p>
}

function App() {
  return (
    <div>
      <Mensaje color={'red'} message={'Pruebitas'} />
      <Mensaje color={'green'} message={'de'} />
      <Mensaje color={'oranje'} message={'props'} />
      <Description />
    </div>
  )
}

export default App
