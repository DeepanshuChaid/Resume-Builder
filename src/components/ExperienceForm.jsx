import { Briefcase, Plus, Sparkles, Trash2 } from "lucide-react";

export default function ExperienceForm({ data, onChange, setResume }) {
  function addExperience() {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_present: false,
    };
    onChange([...data, newExperience]);
  }

  function removeExperience(index) {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  }

  function updateExperience(index, field, value) {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Experience
          </h3>
          <p className="text-sm text-gray-500">Add Your Job Experience Here.</p>
        </div>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50"
        >
          <Plus className="size-4" />
          Add Another
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No Work Experience added yet.</p>
          <p className="text-sm text-gray-400">
            Click "Add Another" to add your first work experience.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((experience, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex items-start justify-between">
                <h4>Experience #{index + 1}</h4>
                <button
                  onClick={() => removeExperience(index)}
                  className="text-sm text-red-500 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Company Name"
                  value={experience.company || ""}
                  onChange={(e) =>
                    updateExperience(index, "company", e.target.value)
                  }
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300"
                />
                <input
                  type="text"
                  placeholder="Job Title"
                  value={experience.position || ""}
                  onChange={(e) =>
                    updateExperience(index, "position", e.target.value)
                  }
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300"
                />
                <input
                  type="month"
                  value={experience.start_date || ""}
                  onChange={(e) =>
                    updateExperience(index, "start_date", e.target.value)
                  }
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300"
                />
                <input
                  type="month"
                  value={experience.end_date || ""}
                  onChange={(e) =>
                    updateExperience(index, "end_date", e.target.value)
                  }
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300"
                  disabled={experience.is_present}
                />
              </div>

              <label className="flex items-center gap-2">
                <input 
                  type="checkbox"
                  checked={experience.is_present || false}
                  onChange={(e) =>
                    updateExperience(index, "is_present", e.target.checked)
                  }
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                />
                <span className="text-sm text-gray-700">Currently Working here</span>
              </label>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Job Description</label>
                  <button className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50">
                    <Sparkles className="size-3" />
                    Enhance with AI
                  </button>
                </div>
                <textarea 
                  value={experience.description || ""} 
                  onChange={(e) => updateExperience(index, "description", e.target.value)} 
                  placeholder="Describe your key responsibilities and achievements..." 
                  className="w-full text-sm px-3 py-2 rounded-lg border border-gray-300 resize-none" 
                  rows={5} 
                /> 
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}





