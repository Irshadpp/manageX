import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import SignUpPage from "./pages/landing/signup"
import Home from "./pages/landing/Home"

function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<SignUpPage/>}/>
      </Routes>
     </Router>
    </>
  )
}

export default App
