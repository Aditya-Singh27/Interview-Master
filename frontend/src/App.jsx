import { RouterProvider } from "react-router"
import {router} from "./app_routes.jsx"
import { AuthProvider } from "./features/auth/auth_context.jsx"

function App() {


  return ( 

    <AuthProvider>
      <RouterProvider router ={router} />
    </AuthProvider >

  )
}

export default App
