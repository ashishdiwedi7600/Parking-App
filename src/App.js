import { useRoutes } from 'react-router-dom'
import Login from './loginpage/login'
import Parkingmap from './ParkingMap/parkingmap'
function App() {

  const routes = useRoutes ([
   {
     path:'/',element:<Login/>
   },
   {
    path:'/parkingMap',element:<Parkingmap/>
  }
  ])
  return (
    <>
    {routes}
    
    </>
  )
}

export default App;
