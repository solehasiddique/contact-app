import { useEffect, useState } from "react";
import axios from "axios";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [sortOption, setSortOption] = useState("date_desc");

  const fetchContacts = async () => {
    try {
      const res = await axios.get(`/api/contacts?sort=${sortOption}`);
      setContacts(res.data);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };


  useEffect(() => {
    fetchContacts();
  }, [sortOption]);

  return (
    <div className="app-container">
      <h1 className="app-title">Contact Management</h1>
      <ContactForm onSuccess={fetchContacts} />
      <ContactList contacts={contacts} onDelete={fetchContacts} />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
