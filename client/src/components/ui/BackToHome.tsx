import  logout  from "@/services/auth/logout"
import { Button } from "./button"
import { useNavigate } from "react-router-dom"
import useLogout from "@/hooks/useLogout"

const BackToHome = () => {
    const navigate = useNavigate()
    const logout = useLogout();
    const handleBackToHome = async () =>{
        logout()
        navigate("/")
    }
  return (
    <Button onClick={handleBackToHome}>Back To Home</Button>
  )
}

export default BackToHome
