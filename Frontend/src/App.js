
// App.js


import { Routes, Route } from "react-router-dom";
import SignInSide from "./FrontEnd/login/SignInSide";
import StaffPages from "./StaffPages";
import Home from "./FrontEnd/others/Home";
import RegisterSide from "./FrontEnd/register/RegisterSide"
import CustomerBiddingDashboard from "./FrontEnd/CustomerPage"
import MyBidding from "./FrontEnd/MyBidding"

function App() {
  return (
    <>

    <Routes>
    <Route
        path="/"
        element={
            <SignInSide />
        }
      />
    <Route

      path="/biddingPage"

      element= {<Home />}
    />
    <Route 
      path="/login"
      element= {<SignInSide/>}
    />
    <Route
      path="/register"
      element= {<RegisterSide/>}    
    />  

   <Route
      path="/dashboard-customer"
      element= {<CustomerBiddingDashboard/>}    
    /> 

    <Route
      path="/biddingHistory"
      element= {<MyBidding/>}    
    />   
    </Routes>
      <StaffPages />
      </>

  );
}

export default App;
