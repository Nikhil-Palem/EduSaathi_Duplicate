import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import HeroSection from './components/HeroSection.js';
import VideoSection from './components/VideoSection.js';
import UniversitiesSection from './components/UniversitiesSection.js';
import ExamsSection from './components/ExamsSection.js';
import LatestSection from './components/LatestSection.js';
import Footer from './components/Footer.js';
import Register from './components/Register.js';
import Login from './components/Login.js';
import Dashboard from './components/Dash/Dashboard.js'
import CollegesSearch from "./components/Dash/Colleges.js";
import MyUniversities from './components/Dash/MyUniversities.js';
import UniversityDetail from './components/Dash/UniversityDetails.js';
import UniversityRegisterSection from './components/UniversityRegistration.js';
import AdminDashboard from './Admin/AdminDashboard.js';
import AdminProfile from './Admin/AdminProfile.js'
import ActivitiesInformation from "./components/Dash/Questions/ActivityInformation.js";
import AchievementsInformation from "./components/Dash/Questions/AchievementsInformation.js";
import ReviewPage from "./components/Dash/Questions/Review.js";
import TestScoresInformation from "./components/Dash/Questions/TestScoresInformation.js";
// import AdminApplications from './Admin/AdminApplication.js';
import AdminData from "./Admin/AdminData.js";
import AdminCustomFormBuilder from './Admin/AdminConfigure.js';
import AdminRegistration from "./Admin/AdminRegistration.js";
import AdminLogin from "./Admin/AdminLogin.js";
import AdminEdit from "./Admin/AdminEdit.js";
import Profile from "./components/Dash/Profile.js";
import AddContextProvider from "./context/AddContextProvider.js";
import AdminRoles from "./Admin/AdminRoles.js";
import { ApplicationContextProvider } from "./context/ApplicationContextProvider.js";
import LayoutWithSidebar from "./components/LayoutWithSidebar.js";
import VerifyEmailPage from "./LeadManagement/Authentication/Verify.jsx";
// import Subcription from "./Admin/Subcription.js";
import ApplicationStatus from './components/Dash/ApplicationStatus.js';
import PersonalInformation from "./components/Dash/Questions/PersonalInformation.js";
import CollegeQuestions from './components/Dash/CollegeQuestions.js';
// import Education from './components/Dash/Education.js';
import EducationalInformation from "./components/Dash/Questions/EducationalInformation.js";
import TestScores from './components/Dash/TestScores.js';
import MostRecentSchool from './components/Dash/MostRecentSchool.js';
import OtherSecondarySchool from './components/Dash/OtherSecondarySchool.js';
import ExtraCirculars from './components/Dash/ExtraCirculars.js';
import './App.css';
import Subcription from "./Admin/Subcription.js";
import TermsAndConditions from './components/TermsAndConditions.js';
import HowToApply from './components/HowToApply.js';
import SaveApplication from "./components/Dash/SaveApplication.js";
import UploadApplication from "./components/Dash/aplication/uploadApplication.js";
// import AuthForm from './LeadManagement/Authentication/AuthForm.jsx'
import SignIn from './LeadManagement/Authentication/SignIn.jsx';
import SignUp from './LeadManagement/Authentication/SignUp.jsx';
import LeadManagement from './components/LeadManagement.jsx';
import DashboardLayout from './LeadManagement/DashBoard/DashBoardLayout.jsx';
import Students from './LeadManagement/DashBoard/Students.jsx';
import Tasks from './LeadManagement/DashBoard/Tasks.jsx';
import Campaign from './LeadManagement/DashBoard/Campaign.jsx';
import Home from './LeadManagement/DashBoard/Home.jsx';
import StudentList from './LeadManagement/DashBoard/StudentList.jsx';
import Branches from './LeadManagement/DashBoard/Branches.jsx';
import StudentAllocation from './LeadManagement/DashBoard/StudentAllocation.jsx';
import SelectCollege from './LeadManagement/Authentication/AdminLogin/SelectCollege.jsx';
import SelectCollegeStaff from './LeadManagement/Authentication/StaffLogin/SelectCollege.jsx';
import RegCompletion from './LeadManagement/Authentication/AdminLogin/RegCompletion.jsx';
import RedirectDashBoard from './LeadManagement/DashBoard/RedirectDashBoard.jsx';
import StudentAllocationCrm from './LeadManagement/Admin_DashBoard/StudentAllocation.jsx';
import BranchesCrm from './LeadManagement/Admin_DashBoard/Branches.jsx';
import NotFound from './NotFound.js';
import StudentListAdmin from './LeadManagement/Admin_DashBoard/StudentList.jsx';
import StudentDetails from './LeadManagement/Admin_DashBoard/StudentDetails.jsx';
import LandingPage from './LeadManagement/LandingPage.jsx';
import ForgotPassword from './components/ForgotPassword/ForgotPassword.jsx';
import VerifyOTP from './components/ForgotPassword/VerifyOtp.jsx';
import ResetPassword from './components/ForgotPassword/ResetPassword.jsx';

// NOTE(nikhil): we need Consider handling JWT token management on the backend to avoid relying on localStorage. Improves overall security.

function App() {
  const [navbar, setNavbar] = useState(false);
  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeBackground);
  }, []);

  const ProtectedRoute = ({ children }) => {
    const user_email = localStorage.getItem('lead_email');
    const isLoggedIn = user_email;
    if (isLoggedIn) {
      return children;
    }
    return <Navigate to="/crm/signin" />;
  }

  const ProtectedRouteStaffCRM = ({ children }) => {
    const staff_email = localStorage.getItem('lead_email');
    const staff_role = localStorage.getItem('lead_role');
    const isLoggedIn = staff_email && staff_role === 'staff';
    if (isLoggedIn) {
      return children;
    }
    return <Navigate to="/crm/signin" />;
  }

  const ProtectedRouteAdminCRM = ({ children }) => {
    const admin_email = localStorage.getItem('lead_email');
    const admin_role = localStorage.getItem('lead_role');
    const isLoggedIn = admin_email && admin_role === 'admin';
    if (isLoggedIn) {
      return children;
    }
    return <Navigate to="/crm/signin" />;
  }

  return (
    <Router>
      <AddContextProvider>
        <ApplicationContextProvider>
          <div className="App">
            <Routes>

              {/* All routes with sidebar */}
              <Route element={<LayoutWithSidebar />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/application-status" element={<ApplicationStatus />} />
                <Route path="/upload-application/:id" element={<UploadApplication />} />
                <Route path="/college-questions/:id" element={<CollegeQuestions />} />
                <Route path="/personal-info" element={<PersonalInformation />} />
                <Route path="/education" element={<EducationalInformation />} />
                {/*<Route path="/education/most-recent-secondary-school" element={<MostRecentSchool />} />*/}
                <Route path="/test-scores" element={<TestScoresInformation />} />
                <Route path="/activities" element={<ActivitiesInformation />} />
                <Route path="/achievements" element={<AchievementsInformation />} />
                <Route path="/review" element={<ReviewPage />} />
                <Route path="user-profile" element={<Profile />} />
                <Route path="/colleges-search" element={<CollegesSearch />} />
                <Route path="/my-universities" element={<MyUniversities />} />
                <Route path="/save-application" element={<SaveApplication />} />
              </Route>

              <Route
                path="/"
                element={
                  <>
                    <Navbar navbar={navbar} />
                    <HeroSection />
                    <VideoSection />
                    <UniversitiesSection />
                    <hr className="section-divider" />
                    <ExamsSection />
                    <LatestSection />
                    <Footer />
                  </>
                }
              />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/register" element={<Register />} />

              <Route path="/login" element={<Login />} />
              <Route path="/application-status" element={<ApplicationStatus />} />
              <Route path="/personal-info" element={<PersonalInformation />} />
              <Route path="/college-questions" element={<CollegeQuestions />} />
              {/* <Route path="/education" element={<Education />} /> */}
              <Route path="/test-scores" element={<TestScores />} />
              <Route path="/extra-curriculars" element={<ExtraCirculars />} />
              {/* <Route path="/application-status" element={<ApplicationStatus />} /> */}
              <Route path="/colleges-search" element={<CollegesSearch />} />
              <Route path="/my-universities" element={<MyUniversities />} />
              <Route path="/university/:name" element={<UniversityDetail />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/verify-otp' element={<VerifyOTP />} />
              <Route path='/reset-password' element={<ResetPassword />} />


              {/* <Route path="/admin/register" element={<AdminRegistration />} />
              <Route path="/admin/login" element={<AdminLogin />} /> */}

              {/* NOTE(nikhil):we need to remove this admin reg and login files */}

              <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin-profile" element={<ProtectedRoute><AdminProfile /></ProtectedRoute>} />
              <Route path="/admin-profile/admin-roles" element={<ProtectedRoute><AdminRoles /></ProtectedRoute>} />
              <Route path="/admin-data" element={<ProtectedRoute><AdminData /></ProtectedRoute>} />
              <Route path="/admin-configuration/*" element={<ProtectedRoute><AdminCustomFormBuilder /></ProtectedRoute>} />
              <Route path="/admin/subcription" element={<ProtectedRoute><Subcription /></ProtectedRoute>} />
              <Route path="/admin/edit" element={<ProtectedRoute><AdminEdit /></ProtectedRoute>} />
              <Route path='/education/most-recent-secondary-school' element={<ProtectedRoute><MostRecentSchool /></ProtectedRoute>} />
              <Route path='/education/other-secondary-school' element={<ProtectedRoute><OtherSecondarySchool /></ProtectedRoute>} />
              <Route path='/termsandconditions' element={<TermsAndConditions />} />
              <Route path='/howtoapply' element={<HowToApply />} />

              <Route path="/crm/signup" element={<SignUp />} />
              <Route path="/crm/signin" element={<SignIn />} />
              <Route path="/crm/verify-email" element={<VerifyEmailPage />} />

              <Route path='/crm/dashboard/' element={
                <>
                  <ProtectedRouteStaffCRM><DashboardLayout /></ProtectedRouteStaffCRM>
                </>
              }>
                <Route path='students' element={<Students />} />
                <Route path='tasks' element={<Tasks />} />
                <Route path='campaigns' element={<Campaign />} />
                <Route path='home' element={<Home />} />
                <Route path='studentslist' element={<StudentList />} />
              </Route>

              <Route path='/crm/admin-dashboard/' element={
                <>
                  <ProtectedRouteAdminCRM><DashboardLayout /></ProtectedRouteAdminCRM>
                </>
              }>
                <Route path='home' element={<Home />} />
                <Route path='studentslist' element={<StudentListAdmin />} />
                <Route path='studentdetails' element={<StudentDetails />} />
                <Route path='studentallocation' element={<StudentAllocationCrm />} />
                <Route path='branches' element={<BranchesCrm />} />
              </Route>


              <Route path="/crm/staff/selectcollege" element={<ProtectedRouteStaffCRM><SelectCollegeStaff /></ProtectedRouteStaffCRM>} />
              <Route path="/crm/admin/selectcollege" element={<ProtectedRouteAdminCRM><SelectCollege /></ProtectedRouteAdminCRM>} />
              <Route path='/crm/admin/reg-college' element={<ProtectedRouteAdminCRM><RegCompletion /></ProtectedRouteAdminCRM>} />
              <Route path='/crm/redirect-dashboard' element={<ProtectedRoute><RedirectDashBoard /></ProtectedRoute>} />
              <Route path='*' element={<NotFound />} />
              <Route path="/crm/adduniversity" element={<LandingPage />} />
            </Routes>
          </div>
        </ApplicationContextProvider>
      </AddContextProvider>
    </Router>
  );
}

export default App;
