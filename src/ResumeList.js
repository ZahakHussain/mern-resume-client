import { useEffect, useState } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

const ResumeList = () => {
  const [resumes, setResumes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    const fetchResumes = async () => {
      try {
        const res = await api.get("/api/resumes", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setResumes(res.data);
      } catch (err) {
        console.error("Failed to fetch resumes:", err);
        alert("Session expired. Please login again.");
        navigate("/login");
      }
    };

    fetchResumes();
  }, [navigate]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      await api.delete(`/api/resumes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResumes((prev) => prev.filter((r) => r._id !== id));
      alert("Resume deleted");
    } catch (err) {
      console.error("Error deleting resume:", err);
      alert("Failed to delete resume");
    }
  };

  return (
    <div className="p-4">
      
      <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold mb-4">Your Resumes</h1>
      <button
        onClick={() => navigate("/builder")}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >Back to Builder
      </button>
      </div>

      <ul className="space-y-2">
        {resumes.map((resume) => (
          <li key={resume._id} className="border p-3 rounded shadow-sm">
            <h2 className="font-semibold">{resume.name}</h2>
            <p>Email: {resume.email}</p>
            <p>Phone: {resume.phone}</p>
            <p>Skills: {resume.skills.join(", ")}</p>
            <button
              onClick={() => handleDelete(resume._id)}
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
            >Delete</button>
          </li>
        ))}
        
      </ul>
    </div>
  );
}

export default ResumeList;
