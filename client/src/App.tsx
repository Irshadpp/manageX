import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import SignUpPage from "./pages/landing/signup"
import Home from "./pages/landing/Home"
import { ThemeProvider } from "./components/ui/ThemProvider"
import { GoogleOAuthProvider } from "@react-oauth/google"
import Login from "./pages/landing/Login"

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
      </Routes>
     </Router>
     </GoogleOAuthProvider>
     </ThemeProvider>
    </>
  )
}

export default App
