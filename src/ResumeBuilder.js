import { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from './api';

const ResumeBuilder = () => {
  const [resume, setResume] = useState({
    name: "",
    email: "",
    phone: "",
    education: [{ degree: "", institute: "", year: "" }],
    experience: [{ title: "", company: "", years: "" }],
    skills: [""]
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");  // 🗑 Remove token
    navigate("/login");                // 🚪 Redirect to login
  };

  let userEmail = "";

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      alert("Please log in first.");
      navigate("/login");
    }
  }, [navigate]);

  if (token) {
    const decoded = jwtDecode(token);
    userEmail = decoded.email;
  }



  const handleChange = (e) => {
    setResume({ ...resume, [e.target.name]: e.target.value });
  };

  const handleEduChange = (index, e) => {
  const { name, value } = e.target;
  const updated = [...resume.education];
  updated[index][name] = value;
  setResume({ ...resume, education: updated });
};

  const handleExpChange = (index, e) => {
  const { name, value } = e.target;
  const updated = [...resume.experience];
  updated[index][name] = value;
  setResume({ ...resume, experience: updated });
};

  const handleSkillChange = (index, e) => {
    const newSkills = [...resume.skills];
    newSkills[index] = e.target.value;
    setResume({ ...resume, skills: newSkills });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //  if (!token){
    //   alert("Please login first");
    //   return;
    console.log("saving resume with data", resume)

    // const res = await api.post("/api/resumes", resume, { withCredentials : true });
    // alert("Resume saved: " + res.data.name);

    try {
      const res = await api.post('/api/resumes', resume);
      alert('Resume saved:' + res.data.name);
      // console.log('Saved Resume:', res.data);
    } catch (err) {
      console.error('Save error', err.response?.data || err.message);
      alert("Error Saving resume:" + (err.response?.data?.message || "Unknown Error"));
    }
  };
  //   headers: {
  //     Authorization: `Bearer ${token}`
  //   },
  //   withCredentials: true,
  // });

  // <>

  //   <button onClick = {() => {
  //     localStorage.removeItem("token");
  //       alert("Logged out!");
  //       navigate("/login");
  //     }}
  //     className="bg-red-500 text-white p-2 rounded mt-4">Logout</button>

  // </>
  // <button onClick={() => navigate("/resumes") }
  //     className="bg-green-600 text-white p-2 rounded" >
  //       View My Resumes
  //   </button>

  return (
    <div className="p-4">

      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">Logged in as: {userEmail}</p>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        <button onClick={() => navigate("/resumes")} className="bg-green-600 text-white p-2 rounded" >View My Resumes</button>
      </div>
      <h1 className="text-2xl font-bold mb-4">Resume Builder</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input name="name" placeholder="Name" onChange={handleChange} className="border p-2 w-full" />
        <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full" />
        <input name="phone" placeholder="Phone" onChange={handleChange} className="border p-2 w-full" />

        <h2 className="font-semibold mt-4">Education</h2>
        {resume.education.map((edu, idx) => (
          <div key={idx} className="space-y-1">
            <input name="degree" placeholder="Degree" value={edu.degree} onChange={(e) => handleEduChange(idx, e)} className="border p-2 w-full" />
            <input name="institute" placeholder="Institute" value={edu.institute} onChange={(e) => handleEduChange(idx, e)} className="border p-2 w-full" />
            <input name="year" placeholder="Year" value={edu.year} onChange={(e) => handleEduChange(idx, e)} className="border p-2 w-full" />
          </div>
        ))}

        <h2 className="font-semibold mt-4">Experience</h2>
        {resume.experience.map((exp, idx) => (
          <div key={idx} className="space-y-1">
            <input name="title" placeholder="Title" value={exp.title} onChange={(e) => handleExpChange(idx, e)} className="border p-2 w-full" />
            <input name="company" placeholder="Company" value={exp.company} onChange={(e) => handleExpChange(idx, e)} className="border p-2 w-full" />
            <input name="years" placeholder="Years" value={exp.years} onChange={(e) => handleExpChange(idx, e)} className="border p-2 w-full" />
          </div>
        ))}

        <h2 className="font-semibold mt-4">Skills</h2>
        {resume.skills.map((skill, idx) => (
          <input key={idx} placeholder="Skill" value={skill} onChange={(e) => handleSkillChange(idx, e)} className="border p-2 w-full" />
        ))}

        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">Save Resume</button>
      </form>
    </div>
  );
}

export default ResumeBuilder; 