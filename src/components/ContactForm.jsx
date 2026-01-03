import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ContactForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
  });


  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validation
  useEffect(() => {
    const newErrors = {};

    // Name required
    if (!formData.name.trim()) newErrors.name = "Name is required";

    // Email optional but must be correct domain if filled
    if (formData.email) {
      const parts = formData.email.split("@");
      if (parts.length !== 2) {
        newErrors.email = "Email must contain @";
      } else if (!allowedDomains.includes(parts[1])) {
        newErrors.email = `Email must end with: ${allowedDomains.join(", ")}`;
      }
    }

    // Phone required, 10+ digits
    const phoneRegex = /^\d{10,}$/;
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = "Phone must be at least 10 digits";

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [formData]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!isValid) return;

    try {
      await axios.post("/api/contacts", formData);
      toast.success("Contact saved successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save contact.");
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name *"
          value={formData.name}
          onChange={handleChange}
          onBlur={() => setTouched({ ...touched, name: true })}
        />

        {touched.name && errors.name && (
          <div className="error">{errors.name}</div>
        )}

      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          onBlur={() => setTouched({ ...touched, email: true })}
        />

        {touched.email && errors.email && (
          <div className="error">{errors.email}</div>
        )}

      </div>

      <div>
        <input
          type="text"
          name="phone"
          placeholder="Phone *"
          value={formData.phone}
          onChange={handleChange}
          onBlur={() => setTouched({ ...touched, phone: true })}
        />
        {touched.phone && errors.phone && (
          <div className="error">{errors.phone}</div>
        )}

      </div>

      <div>
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
        ></textarea>
      </div>

      <button
        className="fancy-btn"
        type="submit"
        disabled={!isValid}
      >
        Save Contact
      </button>


    </form>
  );
}

export default ContactForm;
