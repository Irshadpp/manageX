import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import SignUpPage from "./pages/landing/Registration/signup"
import Home from "./pages/landing/Home"
import { ThemeProvider } from "./components/ui/ThemProvider"
import { GoogleOAuthProvider } from "@react-oauth/google"
import Login from "./pages/landing/Login"
import ValidateEmail from "./pages/landing/Registration/ValidateEmail"
import VerifyEmail from "./pages/landing/Registration/VerifyEmail"
import GetStarted from "./pages/landing/Registration/GetStarted"

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
        <Route path="/get-started" element={<GetStarted/>}/>
      </Routes>
     </Router>
     </GoogleOAuthProvider>
     </ThemeProvider>
    </>
  )
}

export default App
