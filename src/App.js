import { Routes, Route } from "react-router-dom";
import AddMeeting from "./pages/AddMeeting";
import AllMeeting from "./pages/AllMeeting";
import FavoriteMeeting from "./pages/FavoriteMeeting";
import MainNav from "./components/navbar/MainNav";

function App() {
  return (
    <div>
      <MainNav />
      <Routes>
        <Route path="/" element={<AllMeeting />} />
        <Route path="/add-meeting" element={<AddMeeting />} />
        <Route path="/favorite-meeting" element={<FavoriteMeeting />} />
      </Routes>
    </div>
  );
}

export default App;
