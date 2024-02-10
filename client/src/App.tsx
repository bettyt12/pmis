import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
} from "./constants";
import ToastProvider from "./components/Toast/ToastProvider";
import ToastShelf from "./components/Toast/ToastShelf";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/Signup";
import Home from "./pages/Home";
import DashBoard from "./pages/DashBoard";
// import ProtectedRoute from './ProtectedRoute';

export interface IAlert {
  msg: string;
  type: string;
  show: boolean;
}

const App = () => {
  return (
    <ToastProvider>
      <ToastShelf />
      {/* <AdminManagerProvider> */}
        <div>
          <Router>
            <Routes>
              <Route index element={<Home />} />
              <Route path={SIGN_IN_ROUTE} element={<SignIn />} />
              <Route path={SIGN_UP_ROUTE} element={<SignUp />} />
              <Route path={"/dashboard/*"} element={<DashBoard />} />
            
            </Routes>
          </Router>
        </div>
      {/* </AdminManagerProvider> */}
    </ToastProvider>
  ); 
};

export default App;
