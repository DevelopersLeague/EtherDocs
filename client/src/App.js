import logo from './logo.svg';
import './App.css';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import RegisteredUserPage from './pages/RegisteredUserPage';
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
            <Route exact path='/isRegistered' element={<RegisteredUserPage />}></Route>
            <Route exact path='/isNotRegistered' element={<NotRegisteredUserPage />}></Route>

            {/* <Route path='Fundraiser/:id' element={<FundDetails />}></Route> */}
          </Routes>
        </Router>

        {" "}
      </ChakraProvider>
    </>
  );
}

export default App;
