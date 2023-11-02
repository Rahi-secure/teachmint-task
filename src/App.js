import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import UserDetails from "./Components/UserDetails";
import User from "./Components/User";
function App() {
 
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<User />} />
        <Route path="/user-details/:id" element={<UserDetails />} />
      </Routes>
    </div>
  );
}

export default App;
