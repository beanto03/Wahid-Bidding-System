// App.js

import { Routes, Route } from "react-router-dom";
import SignInSide from "./FrontEnd/login/SignInSide";
import Home from "./FrontEnd/others/Home";
import RegisterSide from "./FrontEnd/register/RegisterSide";
import MyBidding from "./FrontEnd/MyBidding";
import StaffPages from "./StaffPages";

function App() {
  // const [buyerId, setBuyerId] = useState(null);
  // const [productId, setProductId] = useState(null);

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
      path="/biddingHistory"
      element= {<MyBidding/>}    
    />   
    <Route
    path= "dashboard-staff"
    element= {<DashboardStaff/>}
    />
    </Routes>
<StaffPages/>
      </>


  );
}

export default App;
