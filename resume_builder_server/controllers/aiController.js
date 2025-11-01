import Resume from "../models/Resume.js"
import ai from "../configs/ai.js"

export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const {userContent} = req.body

    if (!userContent) {
      return res.status(400).json({ message: "Content is required" })    
    }

    const response = await ai.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [
        {
          role: "system",
          content: "You are an expert in resume writin. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highliin key skills, expeience, and career objectives. Make it compelling and ATS-friendly and only return text no options or anything else. Realize that the resume main goal is to get the candidate an interview not poetry."
        },
        {
          role: "user",
          content: `Enhance this professional summary: ${userContent}`
        }
      ]
    })

    const enhancedSummary = response.choices[0].message.content
    return res.status(200).json({ enhancedSummary })
  }catch (error) {
    return res.status(500).json({ message: error.message });
  }
}





export const enhanceJobDescription = async (req, res) => {
  try {
    const {userContent} = req.body

    if (!userContent) {
      return res.status(400).json({ message: "Content is required" })    
    }

    const response = await ai.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [
        {
          role: "system",
          content: "You are an expert in resume writin. Your task is to enhance the job description of a resume. The job description should be 1-2 sentences also highliin key responsibilities, achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly and only return text no options or anything else. Realize that the resume main goal is to get the candidate an interview not poetry."
        },
        {
          role: "user",
          content: `Enhance this Job Description: ${userContent}`
        }
      ]
    })

    const enhancedSummary = response.choices[0].message.content
    return res.status(200).json({ enhancedSummary })
  }catch (error) {
    return res.status(500).json({ message: error.message });
  }
}




export const uploadResume = async (req, res) => {
  try {

    const {resumeText, title} = req.body;
    const userId = req.userId;

    if (!resumeText || !title) {
      return res.status(400).json({ message: "Missing Required Fields" })
    }

    

    const systemPrompt = "You are an expert Ai agent to extract data from resume"

    const userPrompt = `extract data from this resume: ${resumeText}
    
    provide the data in the following json format with no additional text before or after: 
    
    {
    professional_summary: { type: String, default: "" },
    skills: [{ type: String }],

    personal_info: {
      image: { type: String, default: "" },
      full_name: { type: String, default: "" },
      profession: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      location: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      website: { type: String, default: "" },
    },

    experiences: [
      {
        company: { type: String },
        position: { type: String },
        start_date: { type: String },
        end_date: { type: String },
        description: { type: String },
        is_current: { type: Boolean },
      },
    ],
    projects: [
      {
        name: { type: String },
        type: { type: String },
        description: { type: String },
      },
    ],


    educations: [{
      institution: { type: String },
      degree: { type: String },
      field: { type: String },
      graduation_date: { type: String },
      gpa: { type: String },
    }]
    }`

    

    const response = await ai.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userPrompt
        }
      ],
      response_format: { type: "json_object" }
    })

    const extractedData = response.choices[0].message.content;
    const parsedData = JSON.parse(extractedData)

    console.log(parsedData)
    console.log(req.body)

    parsedData.personal_info = parsedData.personal_info || {};
    parsedData.skills = parsedData.skills || [];
    parsedData.experiences = parsedData.experiences || [];
    parsedData.projects = parsedData.projects || [];
    parsedData.educations = parsedData.educations || [];

    
    
    const newResume = await Resume.create({userId, title, ...parsedData})
    
    return res.json({ resume: newResume._id })
  }catch (error) {
    return res.status(500).json({ message: error.message });
  }
}



