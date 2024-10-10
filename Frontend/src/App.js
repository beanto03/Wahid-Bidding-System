import { Routes, Route } from "react-router-dom";
import AdminPages from "./AdminPages";
import SignInSide from "./FrontEnd/login/SignInSide";
import StaffPages from "./StaffPages";
import Home from "./FrontEnd/others/Home";
import RegisterSide from "./FrontEnd/register/RegisterSide"
import MyBidding from "./FrontEnd/MyBidding"
import ViewProductStaff from "./StaffViews/scense/ViewProductStaff";


function App() {
  return (
    <>

=======
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
      path="/biddingHistory"
      element= {<MyBidding/>}    
    />   
  
    </Routes>
      <AdminPages />
      <StaffPages />
    </>
  );
}

export default App;
