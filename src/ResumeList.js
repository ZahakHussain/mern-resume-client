import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResumeList = () => {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    const fetchResumes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/resumes", {
          headers: { Authorization: token }
        });
        setResumes(res.data);
      } catch (err) {
        console.error("Failed to fetch resumes:", err);
      }
    };

    fetchResumes();
  }, [navigate]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Resumes</h1>
      <ul className="space-y-2">
        {resumes.map((resume) => (
          <li key={resume._id} className="border p-3 rounded shadow-sm">
            <h2 className="font-semibold">{resume.name}</h2>
            <p>Email: {resume.email}</p>
            <p>Phone: {resume.phone}</p>
            <p>Skills: {resume.skills.join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResumeList;
