// import { apiRequest } from "@/services/api/commonRequest";
// import { clearCredentials } from "@/store/authSlice";
// import { useDispatch } from "react-redux";

// import { useNavigate } from "react-router-dom";

// const logout = async () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
    
//     try {
//       await apiRequest({
//           method: "POST",
//           url: import.meta.env.VITE_USERS_URL,
//           route: "/api/v1/auth/logout",
//           headers: {
//               "Content-Type": "application/json"
//           }
//       });
  
//       dispatch(clearCredentials());
  
//       navigate("/")
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   return (
//     <></>
//   )
// }

// export default logout
