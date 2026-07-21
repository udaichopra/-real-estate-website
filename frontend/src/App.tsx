import './App.css'
import { Routes, Route } from "react-router-dom";
import ContactForm from './components/ContactForm'
import ListingsPage from './components/ListingsPage'
import PropertyDetails from "./components/PropertyDetails";
import AddListingForm from "./components/AddListingForm";
import NavBar from "./components/Navbar";
import HomePage from "./components/HomePage";

function App() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/contact" element={<ContactForm/>}/>
          <Route path="/listings" element={<ListingsPage/>} />
          <Route path="/listings/:id" element={<PropertyDetails />} />
          <Route path="/admin/newlisting" element={<AddListingForm />} />
        </Routes>
        </div>
    </main >

  );
}

export default App;