import logo from './logo.svg';
import './App.css';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import RegisteredUserPage from './pages/RegisteredUserPage';
import VerifyForm from './pages/VerifyForm';
import StudentForm from './pages/StudentForm';
import IssuerForm from './pages/IssuerForm';
import NotRegisteredUserPage from './pages/NotRegisteredUserPage';
import StudentIsRegistered from './pages/StudentIsRegistered';
import IssuerIsRegistered from './pages/IssuerIsRegistered';
import IssueNewCertiForm from './pages/IssueNewCertiForm';
function App() {
  return (
    <>
      {" "}
      <ChakraProvider>
        <Router>
          <Navbar />

          <Routes>
            <Route exact path='/' element={<LandingPage />}></Route>

            {/* choice b/w issuer and student */}
            <Route exact path='/is-registered' element={<RegisteredUserPage />}></Route>

            {/* displays list of certificates issued to the student by various orgs */}
            <Route exact path='/is-registered/student' element={<StudentIsRegistered />}></Route>

            {/* displays list of certificates issued by Issuer to various students */}
            <Route exact path='/is-registered/issuer' element={<IssuerIsRegistered />}></Route>

            {/* form for new certificate */}
            <Route exact path='/issuer/new-certificate' element={<IssueNewCertiForm />}></Route>

            {/* displays 3 btns: register as issuer, student, verifier */}
            <Route exact path='/is-not-registered' element={<NotRegisteredUserPage />}></Route>

            {/* verify form, containing fields: Issued by, Issued to, UUID and file upload */}
            <Route exact path='/is-not-registered/verify' element={<VerifyForm />}></Route>


            <Route exact path='/is-not-registered/student' element={<StudentForm />}></Route>
            <Route exact path='/is-not-registered/issuer' element={<IssuerForm />}></Route>
          </Routes>
        </Router>

        {" "}
      </ChakraProvider>
    </>
  );
}

export default App;
