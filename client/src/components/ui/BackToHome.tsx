import  logout  from "@/services/auth/logout"
import { Button } from "./button"
import { useNavigate } from "react-router-dom"

const BackToHome = () => {
    const navigate = useNavigate()
    const handleBackToHome = async () =>{
        await logout();
        navigate("/")
    }
  return (
    <Button onClick={handleBackToHome}>Back To Home</Button>
  )
}

export default BackToHome
