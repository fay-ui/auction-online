import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from './pages/AboutUs';
import PlaceBid from './pages/PlaceBid';
import Profile from './pages/Profile';
import AddAuction from './pages/AddAuction';
import AdminDashboard from './pages/AdminDashboard';
import AuctionListing from './pages/AuctionListing';
import AuctionDetails from './pages/AuctionDetails';
import AuctionResults from './pages/AuctionResults';
import ProtectedRoute from "./components/ProtectedRoute";  // Import ProtectedRoute

export default function App() {
  return (
    <Routes>  {/* No need for UserProvider here, it's already provided in index.js */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="contact" element={<Contact />} />
        <Route path="aboutus" element={<AboutUs />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NoPage />} />

        {/* Protected Routes: Only accessible if logged in */}
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="addauction" element={<AddAuction />} />
          <Route path="auctionlisting/:id" element={<AuctionListing />} />
          <Route path="admindashboard" element={<AdminDashboard />} />
          <Route path="auctiondetails/:id" element={<AuctionDetails />} />
          <Route path="auctionresults" element={<AuctionResults />} />
          <Route path="placebid/:id" element={<PlaceBid />} />
        </Route>
      </Route>
    </Routes>
  );
}
