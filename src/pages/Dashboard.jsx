import {
  PlusIcon,
  UploadCloudIcon,
  FilePenLine,
  Trash2,
  Pencil,
  XIcon
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { dummyResumeData } from "../assets/assets";

export default function Dashboard() {
  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [EditResumeId, setEditResumeId] = useState("");

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
          <button className="flex flex-col items-center gap-1 group">
            <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-indigo-600 transition-all duration-300">
              Create new resume
            </p>
          </button>

          <button className="flex flex-col items-center gap-1 group">
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
                  <Trash2 className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors" />
                  <Pencil className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors" />
                </div>
              </button>
            );
          })}
        </div>

        {showCreateResume && (
          <form onSubmit={create} className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center">
            <div onCLick={e => e.stopPropogation()}>
              <h1>Create new resume</h1>
              <input
                type="text"
                placeholder="Resume title"
                className="w-full px-4 py-2 mb-4 focus:border-indigo-600 ring-indigo-600"
                required
              />
              <button className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transtion-colors">
                Create Resume
              </button>

              <XIcon
                className="absolute top-4 right-4 size-6 text-white cursor-pointer hover:text-slate-600 text-slate-400"
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
