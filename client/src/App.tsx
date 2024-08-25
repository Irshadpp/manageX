import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import SignUpPage from "./pages/landing/registration/signup"
import Home from "./pages/landing/home/Home"
import { ThemeProvider } from "./components/ui/ThemProvider"
import { GoogleOAuthProvider } from "@react-oauth/google"
import Login from "./pages/landing/login/Login"
import ValidateEmail from "./pages/landing/registration/ValidateEmail"
import VerifyEmail from "./pages/landing/registration/VerifyEmail"
import GetStarted from "./pages/landing/registration/GetStarted"
import ProtectedRoute from "./components/custome/ProtectedRoute"
import OwnerDashboard from "./pages/owner/OwnerDashboard"
import ManDashboard from "./pages/manager/ManDashboard"
import EmpDashboard from "./pages/employee/EmpDashboard"
import AdminDashboard from "./pages/admin/AdminDashboard"

function App() {
  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <GoogleOAuthProvider clientId="jdlfalskd">
     <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/validate-email" element={<ValidateEmail/>}/>
        <Route path="/verify-email" element={<VerifyEmail/>}/>
        <Route element={<ProtectedRoute/>}>
        <Route path="/get-started" element={<GetStarted/>}/>
        <Route path="/owner-dashboard" element={<OwnerDashboard/>}/> 
        <Route path="/manager-dashboard" element={<ManDashboard/>}/> 
        <Route path="/employee-dashboard" element={<EmpDashboard/>}/> 
        <Route path="/admin-dashboard" element={<AdminDashboard/>}/> 
        </Route>
      </Routes>
     </Router>
     </GoogleOAuthProvider>
     </ThemeProvider>
    </>
  )
}

export default App
