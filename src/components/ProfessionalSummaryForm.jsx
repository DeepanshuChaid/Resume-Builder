import React from "react";
import { Sparkles } from "lucide-react";

export default function  ProfessionalSummaryForm({data, onChange, setResumeData}) {
  return(
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">Professional Summary</h3>
          <p className="text-sm text-gray-500">Add summary for your resume here.</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50">
          <Sparkles className="size-4" />
          At Enhance
        </button>
      </div>

      <div className="mt-6">
        <textarea className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Write your professional summary here..." name="professionalSummary" id="professionalSummary" rows={7} value={data || ""} onChange={(e) => onChange(e.target.value)} />
        <p className="text-xs text-gray-500 max-w-4/5 mx-auto text-center">Tip: Keep it concise (3-4 sentences) and focus on your most relevant achievements and skills.</p>
      </div>
    </div>
  )
}