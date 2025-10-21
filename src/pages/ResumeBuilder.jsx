
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import {
  ArrowLeftIcon,
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Sparkles,
  FolderIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";

export default function ResumeBuilder() {
  const { resumeid } = useParams();

  const [resume, setResume] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    skills: [],
    template: "classic",
    accent_color: "#3b82f6",
    public: false,
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal_info", name: "Personal Info", icon: User },
    { id: "summary", name: "Professional Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "skills", name: "Skills", icon: Sparkles },
    { id: "project", name: "Projects", icon: FolderIcon },
  ];

  const activeSection = sections[activeSectionIndex];

  useEffect(() => {
    const found = dummyResumeData.find((r) => String(r._id) === String(resumeid));
    if (found) {
      setResume(found);
      document.title = found.title;
    }
  }, [resumeid, dummyResumeData]);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link to="/app" className="flex items-center gap-2">
          <ArrowLeftIcon className="w-6 h-6 text-slate-600 hover:text-slate-800 transition-colors" />
          Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Panel - Form */}
          <div className="relative rounded-lg overflow-hidden lg:col-span-5">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1 relative">
              {/* Progress Bar */}
              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
              <hr
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-indigo-600 border-none transition-all duration-2000"
                style={{
                  width: `${(activeSectionIndex * 100) / (sections.length - 1)}%`,
                }}
              />

              {/* Section Navigation */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                  <TemplateSelector selectedTemplate={resume.template} onChange={(template) => setResume((prev) => ({ ...prev, template }))} />
                </div>
                <div className="flex items-center gap-2">
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() => setActiveSectionIndex((prev) => Math.max(prev - 1, 0))}
                      className="flex items-center gap-1 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      <ChevronLeftIcon className="w-5 h-5" /> Previous
                    </button>
                  )}
                  <button
                    onClick={() =>
                      setActiveSectionIndex((prev) => Math.min(prev + 1, sections.length - 1))
                    }
                    className={`flex items-center gap-1 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors ${
                      activeSectionIndex === sections.length - 1 ? "opacity-50 pointer-events-none" : ""
                    }`}
                  >
                    Next <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <div className="space-y-6">
                {activeSection.id === "personal_info" && (
                  <PersonalInfoForm
                    data={resume.personal_info}
                    onChange={(data) =>
                      setResume((prev) => ({ ...prev, personal_info: data }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:col-span-7 max-lg:mt-6">
            <div>
              {/* --- buttons for changing the template and accent color --- */}
            </div>

            {/* --- reusme preview -- */}
            <ResumePreview data={resume} template={resume.template} accentColor={resume.accent_color} />
          </div>
        </div>
      </div>
    </div>
  );
}

