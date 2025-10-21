import {
  PlusIcon,
  UploadCloudIcon,
  FilePenLine,
  Trash2,
  Pencil,
  XIcon,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";

export default function Dashboard() {
  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [EditResumeId, setEditResumeId] = useState("");

  const navigate = useNavigate();

  async function create(e) {
    e.preventDefault();
    setShowCreateResume(false);
    navigate("/app/builder/res123");
  }

  async function upload(e) {
    e.preventDefault();
    setShowUploadResume(false);
    navigate("/app/builder/res123");
  }

  async function deleteResume(resumeId){
    const confirmDelete = window.confirm("Are you sure you want to delete this resume?");

    if (confirmDelete) {
      setAllResumes(prevResumes => prevResumes.filter(resume => resume._id !== resumeId))
    }
  }

  async function editTitle(e) {
    e.preventDefault();
    setEditResumeId("");
  }

  const colors = [
    "#9333ea",
    "#d97706",
    "#dc2626",
    "#0284c7",
    "#16a34a",
    "#8b5cf6",
    "#f59e0b",
    "#ef4444",
    "#0ea5e9",
  ];

  const loadAllResumes = async () => {
    setAllResumes(dummyResumeData);
  };

  useEffect(() => {
    loadAllResumes();
  }, []); // Add empty dependency array to run only once

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome, Joe doe
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => setShowCreateResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 rounded-lg text-slate-600 border border-dashed border-slate-300 hover:border-indigo-500 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center gap-2 group cursor-pointer"
          >
            <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-indigo-600 transition-all duration-300">
              Create new resume
            </p>
          </button>

          <button
            onClick={() => setShowUploadResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 rounded-lg text-slate-600 border border-dashed border-slate-300 hover:border-indigo-500 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center gap-1 group cursor-pointer"
          >
            <UploadCloudIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-indigo-600 transition-all duration-300">
              Upload Existing
            </p>
          </button>
        </div>

        <hr className="border-slate-300 my-6 sm:w-[305px]" />

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];
            return (
              <button
                key={index}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                  borderColor: baseColor + "40",
                }}
              >
                <FilePenLine
                  className="size-7 group-hover:scale-105 transition-all"
                  style={{ color: baseColor }}
                />

                <p className="text-sm group-hover:scale-105 transition-all px-2 text-center">
                  {resume.title}
                </p>

                <p
                  className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center"
                  style={{ color: baseColor + "90" }}
                >
                  Updated on {new Date(resume?.updatedAt).toLocaleDateString()}
                </p>

                <div className="absolute top-1 right-1 group-hover:flex items-center hidden">
                  <Trash2
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteResume(resume._id);
                    }}
                    className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
                  />
                  <Pencil
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditResumeId(resume._id);
                      setTitle(resume.title);
                    }}
                    className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* this is the start of the create resume box*/}
        {showCreateResume && (
          <form
            onSubmit={create}
            onClick={() => {
              setShowCreateResume(false);
              setTitle("");
            }}
            className="fixed inset-0 z-10 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md"
            >
              <h1 className="text-2xl font-semibold mb-4 text-center">
                Create New Resume
              </h1>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Resume title"
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-600 outline-none"
                required
              />

              <button className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
                Create Resume
              </button>

              <XIcon
                className="absolute top-4 right-4 size-6 text-gray-400 hover:text-gray-600 cursor-pointer"
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}
        {/* this is the end of the create resume box*/}

        {/* this is the start of the upload resume box*/}
        {showUploadResume && (
          <form
            onSubmit={upload}
            onClick={() => {
              setShowUploadResume(false);
              setTitle("");
            }}
            className="fixed inset-0 z-10 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md"
            >
              <h1 className="text-2xl font-semibold mb-4 text-center">
                Upload Your Resume
              </h1>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Resume title"
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-600 outline-none"
                required
              />

              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="resume-input"
                >
                  Upload file
                  <div className="flex items-center justify-center flex-col gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover_border-indigo-500 hover:text-indigo-700 cursor-pointer transition-colors">
                    {resume ? (
                      <p className="text-sm">{resume.name}</p>
                    ) : (
                      <>
                        <UploadCloudIcon className="size-14 stroke-1" />
                        <p className="text-sm">Click to upload</p>
                      </>
                    )}
                  </div>
                </label>
                <input
                  className="hidden"
                  id="resume-input"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setResume(e.target.files[0])}
                  hidden
                />
              </div>

              <button className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
                Upload Resume
              </button>

              <XIcon
                className="absolute top-4 right-4 size-6 text-gray-400 hover:text-gray-600 cursor-pointer"
                onClick={() => {
                  setShowUploadResume(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}
        {/* this is the end of the upload resume box*/}

        {/* this is the start of the create resume box*/}
        {EditResumeId && (
          <form
            onSubmit={editTitle}
            onClick={() => {
              setEditResumeId("");
              setTitle("");
            }}
            className="fixed inset-0 z-10 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md"
            >
              <h1 className="text-2xl font-semibold mb-4 text-center">
                Edit Resume Title
              </h1>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Resume title"
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-600 outline-none"
                required
              />

              <button className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
                Update Resume
              </button>

              <XIcon
                className="absolute top-4 right-4 size-6 text-gray-400 hover:text-gray-600 cursor-pointer"
                onClick={() => {
                  setEditResumeId("");
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}
        {/* this is the end of the edit resume box*/}
      </div>
    </div>
  );
}
