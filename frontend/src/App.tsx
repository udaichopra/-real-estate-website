
import { Routes, Route } from "react-router-dom";
import ContactForm from './components/ContactForm'
import ListingsPage from './components/ListingsPage'
import PropertyDetails from "./components/PropertyDetails";
import AddListingForm from "./components/AddListingForm";
import NavBar from "./components/Navbar";
import HomePage from "./components/HomePage";
import AdminLogin from "./components/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminViewListing from "./components/AdminViewListings";
import AdminEditListing from "./components/AdminEditListing";
function App() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <NavBar />
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/contact" element={<ContactForm showIntro={true}/>}/>
          <Route path="/listings" element={<ListingsPage/>} />
          <Route path="/listings/:id" element={<PropertyDetails />} />
          <Route path="/admin/newlisting" element={<ProtectedRoute> <AddListingForm /></ProtectedRoute>} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/viewlistings" element={<ProtectedRoute> <AdminViewListing /></ProtectedRoute>} />
          <Route path="/admin/editlisting/:id" element={<ProtectedRoute> <AdminEditListing /></ProtectedRoute>} />
        </Routes>
        </div>
    </main >

  );
}

export default App;