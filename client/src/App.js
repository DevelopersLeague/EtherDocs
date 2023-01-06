import logo from './logo.svg';
import './App.css';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import RegisteredUserPage from './pages/RegisteredUserPage';
import VerifyForm from './pages/VerifyForm';
import NotRegisteredUserPage from './pages/NotRegisteredUserPage';
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

            {/* verifier form */}
            <Route exact path='/is-not-registered' element={<NotRegisteredUserPage />}></Route>
            <Route exact path='/is-not-registered/verify' element={<VerifyForm />}></Route>


            {/* <Route path='Fundraiser/:id' element={<FundDetails />}></Route> */}
          </Routes>
        </Router>

        {" "}
      </ChakraProvider>
    </>
  );
}

export default App;
