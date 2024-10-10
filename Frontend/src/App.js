import { Routes, Route } from "react-router-dom";
import AdminPages from "./AdminPages";
import SignInSide from "./FrontEnd/login/SignInSide";
import StaffPages from "./StaffPages";
import Home from "./FrontEnd/others/Home";


function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<SignInSide />}
        />
        <Route
          path="/home"
          element={<Home />}
        />
        <Route
          path="/bidding/:productId/:userId"
          element={<BiddingComponent />}
        />
        <Route
          path="/winning-bid/:productId"
          element={<WinningBidPage />}
        />
      </Routes>
      
      <AdminPages />
      <StaffPages />
    </>
  );
}

export default App;
