import { Routes, Route } from "react-router-dom";
import ContactForm from "./components/ContactForm";
import ListingsPage from "./components/ListingsPage";
import PropertyDetails from "./components/PropertyDetails";
import AddListingForm from "./components/AddListingForm";
import NavBar from "./components/Navbar";
import HomePage from "./components/HomePage";
import AdminLogin from "./components/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminViewListing from "./components/AdminViewListings";
import AdminEditListing from "./components/AdminEditListing";
import AdminHome from "./components/AdminHome";

function App() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/contact"
          element={
            <div className="bg-navy">
              <ContactForm/>
            </div>
          }
        />

        <Route
          path="/listings"
          element={
            <div className=" min-h-screen bg-navy">
              <ListingsPage />
            </div>
          }
        />

        <Route
          path="/listings/:id"
          element={
            <div className="min-h-screen bg-navy">
              <PropertyDetails />
            </div>
          }
        />

        <Route
          path="/admin"
          element={
            <div className="min-h-screen bg-navy">
              <div className="mx-auto max-w-6xl px-6 py-10">
                <ProtectedRoute>
                  <AdminHome />
                </ProtectedRoute>
              </div>
            </div>
          }
        />

        <Route
          path="/admin/newlisting"
          element={
            <div className="min-h-screen bg-navy">
              <div className="mx-auto max-w-6xl px-6 py-10">
                <ProtectedRoute>
                  <AddListingForm />
                </ProtectedRoute>
              </div>
            </div>
          }
        />

        <Route
          path="/admin/login"
          element={
            <div className="min-h-screen bg-navy">
              <div className="mx-auto max-w-6xl px-6 py-10">
                <AdminLogin />
              </div>
            </div>
          }
        />

        <Route
          path="/admin/viewlistings"
          element={
            <div className="min-h-screen bg-navy">
              <div className="mx-auto max-w-6xl px-6 py-10">
                <ProtectedRoute>
                  <AdminViewListing />
                </ProtectedRoute>
              </div>
            </div>
          }
        />

        <Route
          path="/admin/editlisting/:id"
          element={
            <div className="min-h-screen bg-navy">
              <div className="mx-auto max-w-6xl px-6 py-10">
                <ProtectedRoute>
                  <AdminEditListing />
                </ProtectedRoute>
              </div>
            </div>
          }
        />
      </Routes>
    </main>
  );
}

export default App;