import { AuthContextProvider } from "./util/AuthContext";
import { Navigate, Route, Routes } from "react-router-dom";
import PublicNavbar from "./components/publicNavbar/PublicNavbar";
import "./App.css";
import PrivateRoute from "./util/PrivateRoute";
import AppLayout from "./pages/AppLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Hotel from "./pages/Hotel";
import UserReservations from "./pages/UserReservations";
import UserFeedbacks from "./pages/UserFeedbacks";
import BookRoom from "./components/bookRoom/BookRoom";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/login" element={<PublicNavbar />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<AppLayout path="/" />}>
            <Route path="/" element={<Home />} />
            <Route path="/hotels/:id" element={<Hotel />} />
            <Route
              path="/user/:userId/reservations"
              element={<UserReservations />}
            />
            <Route path="/user/:userId/feedbacks" element={<UserFeedbacks />} />
            <Route path="/hotels/:hotelId/book/" element={<BookRoom />} />
            <Route path="/admin/userlist" element={<AdminPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
