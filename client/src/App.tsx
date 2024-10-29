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
import CreateEmployee from "./pages/owner/employees/CreateEmployee";
import LeaveRequests from "./pages/owner/employees/LeaveRequests";
import ExEmployees from "./pages/owner/employees/ExEmployees";
import ValidateEmail from "./pages/landing/Registration/ValidateEmail";
import SignUpPage from "./pages/landing/Registration/signup";
import VerifyEmail from "./pages/landing/Registration/VerifyEmail";
import GetStarted from "./pages/landing/Registration/GetStarted";
import VerifiedEmail from "./pages/landing/Registration/VerifiedEmail";
import SetPassword from "./pages/landing/Registration/SetPassword";
import EmpLayout from "./pages/employee/EmpLayout";
import AttendancePolicy from "./pages/owner/employees/AttendancePolicy";
import { AttendanceSideMenu } from "./pages/employee/attendance/AttendanceSideMenu";
import Attendance from "./pages/employee/attendance/Attendance";
import Leaves from "./pages/employee/attendance/Leaves";
import CreateProject from "./pages/owner/project/CreateProject";
import ProjectList from "./pages/owner/project/ProjectList";
import Project from "./pages/owner/project/Project";
import EmpProjectList from "./pages/employee/project/EmpProjectList";
import EmpProject from "./pages/employee/project/EmpProject";
import ManLayout from "./pages/manager/ManLayout";
import ManProjectList from "./pages/manager/project/ManProjectList";
import ManProject from "./pages/manager/project/ManProject";
import EmployeeList from "./pages/owner/employees/EmployeeList";
import ManEmployeeList from "./pages/manager/employees/ManEmployeeList";
import { ManEmployeeProfile } from "./pages/manager/employees/ManEmployeeProfile";
import ManCreateEmployee from "./pages/manager/employees/ManCreateEmployee";
import ManLeaveRequests from "./pages/manager/employees/ManLeaveRequests";
import ManAttendancePolicy from "./pages/manager/employees/ManAttendancePolicy";
import ManExEmployees from "./pages/manager/employees/ManExEmployees";
import { ManEmployeeSideMenu } from "./pages/manager/employees/ManEmployeeSideMenu";
import { EmployeeProfile } from "./pages/owner/employees/EmployeeProfile";
import Chat from "./pages/owner/chat/Chat";
import EmpChat from "./pages/employee/chat/EmpChat";
import Meet from "./pages/owner/meetings/Meet";
import JoinRoom from "./pages/owner/meetings/JoinRoom";
import Room from "./pages/owner/meetings/room/Room";
import EmpRoom from "./pages/employee/meetings/room/EmpRoom";
import EmpJoinRoom from "./pages/employee/meetings/EmpJoinRoom";
import EmpMeet from "./pages/employee/meetings/EmpMeet";
import ManChat from "./pages/manager/chat/ManChat";
import ManMeet from "./pages/manager/meetings/ManMeet";
import ManJoinRoom from "./pages/manager/meetings/ManJoinRoom";
import ManRoom from "./pages/manager/meetings/room/ManRoom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { broadcastMeetState, listenToMeetStateChanges } from "./utils/broadcast-meet-state";
import store from "./store";
import Subscription from "./pages/owner/subscription/Subscription";
import Plans from "./components/subscription/Plans";
import PaymentSuccess from "./pages/owner/subscription/PaymentSuccess";
import PaymentFailure from "./pages/owner/subscription/PaymentFailure";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Listen for state changes across tabs
    listenToMeetStateChanges(dispatch);

    // Broadcast meet state when it changes
    const unsubscribe = store.subscribe(() => {
      const meetState = store.getState().meet;
      broadcastMeetState(meetState);  // Send the meet state to other tabs
    });

    // Cleanup on unmount
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ToastProvider>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || "386330701931-4rojccv07tb6bsd182u9661s6irlimel.apps.googleusercontent.com"}>
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
                  <Route path="/email-verified" element={<VerifiedEmail />} />
                  <Route path="/get-started" element={<GetStarted />} />
                  <Route path="/owner" element={<OwnerLayout />}>
                    <Route index element={<OwnerDashboard />} />
                    <Route path="employees" element={<EmployeeSideMenu />}>
                      <Route index element={<EmployeeList />} />
                      <Route path="list" element={<EmployeeList />} />
                      <Route path=":id" element={<EmployeeProfile />} />
                      <Route path="create" element={<CreateEmployee />} />
                      <Route path="leave" element={<LeaveRequests />} />
                      <Route path="policy" element={<AttendancePolicy />} />
                      <Route path="ex-employee" element={<ExEmployees />} />
                    </Route>
                    <Route path="/owner/projects" element={<ProjectList/>}/>
                    <Route path="/owner/projects/create" element={<CreateProject/>}/>
                    <Route path="/owner/projects/:id" element={<Project/>}/>
                    <Route path="/owner/chat" element={<Chat/>}/>
                    <Route path="/owner/meetings" element={<Meet/>}/>
                    <Route path="/owner/meetings/join-room" element={<JoinRoom/>}/>
                    <Route path="/owner/billing" element={<Subscription/>}/>
                    <Route path="/owner/billing" element={<Subscription/>}/>
                    <Route path="/owner/billing/plans" element={<Plans/>}/>
                    <Route path="/owner/billing/success" element={<PaymentSuccess/>}/>
                    <Route path="/owner/billing/failure" element={<PaymentFailure/>}/>
                  </Route>
                    <Route path="/owner/meetings/room" element={<Room/>}/>
                </Route>

                <Route
                  element={<PrivateRouteWithRole requiredRole="manager" />}
                >
                  <Route path="/email-verified" element={<VerifiedEmail />} />
                  <Route path="/set-password" element={<SetPassword />} />

                 <Route path="/manager" element={<ManLayout />}>
                    <Route index element={<ManDashboard />} />
                    <Route path="employees" element={<ManEmployeeSideMenu />}>
                      <Route index element={<ManEmployeeList />} />
                      <Route path="list" element={<ManEmployeeList />} />
                      <Route path=":id" element={<ManEmployeeProfile />} />
                      <Route path="create" element={<ManCreateEmployee />} />
                      <Route path="leave" element={<ManLeaveRequests />} />
                      <Route path="policy" element={<ManAttendancePolicy />} />
                      <Route path="ex-employee" element={<ManExEmployees />} />
                    </Route>
                    <Route path="/manager/projects" element={<ManProjectList/>}/>
                    <Route path="/manager/projects/create" element={<CreateProject/>}/>
                    <Route path="/manager/projects/:id" element={<ManProject/>}/>
                    <Route path="/manager/chat" element={<ManChat/>}/>
                    <Route path="/manager/meetings" element={<ManMeet/>}/>
                    <Route path="/manager/meetings/join-room" element={<ManJoinRoom/>}/>
                  </Route>
                    <Route path="/manager/meetings/room" element={<ManRoom/>}/>
                </Route>

                <Route
                  element={<PrivateRouteWithRole requiredRole="employee" />}
                >
                  <Route path="/email-verified" element={<VerifiedEmail />} />
                  <Route path="/set-password" element={<SetPassword />} />

                  <Route path="/employee" element={<EmpLayout />}>
                    <Route index element={<EmpDashboard />} />
                    <Route path="attendance" element={<AttendanceSideMenu />}>
                      <Route index element={<Attendance />} />
                      <Route path="logs" element={<Attendance />} />
                      <Route path="leaves" element={<Leaves />} />
                    </Route>
                    <Route path="/employee/projects" element={<EmpProjectList/>}/>
                    <Route path="/employee/projects/:id" element={<EmpProject/>}/>
                    <Route path="/employee/chat" element={<EmpChat/>}></Route>
                    <Route path="/employee/meetings" element={<EmpMeet/>}/>
                    <Route path="/employee/meetings/join-room" element={<EmpJoinRoom/>}/>
                  </Route>
                    <Route path="/employee/meetings/room" element={<EmpRoom/>}/>
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
