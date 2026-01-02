import { useState, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ContactList({ contacts, onDelete }) {
    const [sortOption, setSortOption] = useState("date_desc");
    const [open, setOpen] = useState(false);

    const sortedContacts = useMemo(() => {
        const sorted = [...contacts];

        switch (sortOption) {
            case "date_asc":
                return sorted.sort(
                    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
                );

            case "name_asc":
                return sorted.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );

            case "name_desc":
                return sorted.sort((a, b) =>
                    b.name.localeCompare(a.name)
                );

            default:
                return sorted.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
        }
    }, [contacts, sortOption]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/api/contacts/${id}`);
            toast.success("Contact deleted");
            onDelete();
        } catch {
            toast.error("Delete failed");
        }
    };

    return (
        <div className="contact-list">
            {/* Sort Dropdown */}
            <div style={{ position: "relative", textAlign: "right", marginBottom: "1rem" }}>
                <button
                    className="dropdown-btn"
                    onClick={() => setOpen((prev) => !prev)}
                >
                    Sort
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="m19 9-7 7-7-7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

                {open && (
                    <div className="dropdown-menu">
                        <div
                            className="dropdown-item"
                            onClick={() => {
                                setSortOption("date_desc");
                                setOpen(false);
                            }}
                        >
                            Newest First
                        </div>

                        <div
                            className="dropdown-item"
                            onClick={() => {
                                setSortOption("date_asc");
                                setOpen(false);
                            }}
                        >
                            Oldest First
                        </div>

                        <div
                            className="dropdown-item"
                            onClick={() => {
                                setSortOption("name_asc");
                                setOpen(false);
                            }}
                        >
                            Name A → Z
                        </div>

                        <div
                            className="dropdown-item"
                            onClick={() => {
                                setSortOption("name_desc");
                                setOpen(false);
                            }}
                        >
                            Name Z → A
                        </div>
                    </div>
                )}
            </div>

            {/* Contact Table */}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {sortedContacts.map((c) => (
                        <tr key={c._id}>
                            <td>{c.name}</td>
                            <td>{c.email || "-"}</td>
                            <td>{c.phone}</td>
                            <td>
                                <button onClick={() => handleDelete(c._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ContactList;
