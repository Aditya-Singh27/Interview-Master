import { RouterProvider } from "react-router"
import {router} from "./app_routes.jsx"
import { AuthProvider } from "./features/auth/auth_context.jsx"
import { InterviewProvider } from "./features/interview/interview_context.jsx"

function App() {


  return ( 

    <AuthProvider>
      <InterviewProvider>
        <RouterProvider router ={router} />
      </InterviewProvider>
    </AuthProvider >

  )
}

export default App
