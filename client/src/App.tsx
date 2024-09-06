import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/landing/home/Home";
import { ThemeProvider } from "./components/ui/ThemProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./pages/landing/login/Login";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import ManDashboard from "./pages/manager/ManDashboard";
import EmpDashboard from "./pages/employee/EmpDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PublicRoute from "./components/custome/PublicRoute";
import NotFound from "./pages/NotFound";
import PrivateRouteWithRole from "./components/custome/PrivateRouteWithRole";
import OwnerLayout from "./pages/owner/OwnerLayout";
import AdminLayout from "./pages/admin/AdminLayout";
import Organizations from "./pages/admin/Organizations";
import Users from "./pages/admin/Users";
import { ToastProvider } from "./components/ui/toast";
import { EmployeeSideMenu } from "./pages/owner/employees/EmployeeSideMenu";
import EmployeeList from "./pages/owner/employees/EmployeeList";
import CreateEmployee from "./pages/owner/employees/CreateEmployee";
import LeaveRequests from "./pages/owner/employees/LeaveRequests";
import ExEmployees from "./pages/owner/employees/ExEmployees";
import ValidateEmail from "./pages/landing/Registration/ValidateEmail";
import SignUpPage from "./pages/landing/Registration/signup";
import VerifyEmail from "./pages/landing/Registration/VerifyEmail";
import GetStarted from "./pages/landing/Registration/GetStarted";
import VerifiedEmail from "./pages/landing/Registration/VerifiedEmail";
import { EmployeeProfile } from "./pages/owner/employees/EmployeeProfile";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ToastProvider>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <Router>
              <Routes>
                <Route element={<PublicRoute />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/validate-email" element={<ValidateEmail />} />
                  <Route path="/verify-email" element={<VerifyEmail />} />
                </Route>

                <Route element={<PrivateRouteWithRole requiredRole="owner" />}>
                <Route path="/email-verified" element={<VerifiedEmail/>}/>
                  <Route path="/get-started" element={<GetStarted />} />
                  <Route path="/owner" element={<OwnerLayout />}>
                    <Route index element={<OwnerDashboard />} />

                    <Route path="employees" element={<EmployeeSideMenu/>}>
                      <Route index element={<EmployeeList/>}/>
                      <Route path="list" element={<EmployeeList/>}/>
                      <Route path=":id" element={<EmployeeProfile/>}/>
                      <Route path="create" element={<CreateEmployee/>}/>
                      <Route path="leave" element={<LeaveRequests/>}/>
                      <Route path="ex-employee" element={<ExEmployees/>}/>
                    </Route>
                  </Route>
                </Route>

                <Route
                  element={<PrivateRouteWithRole requiredRole="manager" />}
                >
                  <Route path="/manager" element={<ManDashboard />} />
                </Route>

                <Route
                  element={<PrivateRouteWithRole requiredRole="employee" />}
                >
                  <Route path="/employee" element={<EmpDashboard />} />
                </Route>

                <Route element={<PrivateRouteWithRole requiredRole="admin" />}>
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="organizations" element={<Organizations />} />
                    <Route path="users" element={<Users />} />
                  </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </GoogleOAuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
