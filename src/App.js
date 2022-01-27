import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import AddMeeting from "./pages/AddMeeting";
import AllMeeting from "./pages/AllMeeting";
import FavoriteMeeting from "./pages/FavoriteMeeting";
import MainNav from "./components/navbar/MainNav";
import Auth from "./pages/Auth";
import AuthContext from "./stores/auth-context";

function App() {
  const AuthCtx = useContext(AuthContext);

  return (
    <div>
      <MainNav />
      <Routes>
        <Route path="/" element={<AllMeeting />} />
        <Route
          path="/add-meeting"
          element={
            AuthCtx.isLoggedIn ? <AddMeeting /> : <Navigate to="/auth" />
          }
        />
        <Route
          path="/favorite-meeting"
          element={
            AuthCtx.isLoggedIn ? <FavoriteMeeting /> : <Navigate to="/auth" />
          }
        />
        <Route
          path="/auth"
          element={!AuthCtx.isLoggedIn ? <Auth /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
