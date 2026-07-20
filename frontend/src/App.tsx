import './App.css'
import { Routes, Route } from "react-router-dom";
import ContactForm from './components/ContactForm'
import ListingsPage from './components/ListingsPage'
import PropertyDetails from "./components/PropertyDetails";
import AddListingForm from "./components/AddListingForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<><ContactForm /><ListingsPage /></>} />
      <Route path="/listings/:id" element={<PropertyDetails />} />
      <Route path="/admin/newlisting" element={<AddListingForm/>} />
    </Routes>
  );
}

export default App;