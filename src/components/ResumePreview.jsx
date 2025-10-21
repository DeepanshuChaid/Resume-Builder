import React from 'react'
import ModernTemplate from '../assets/templates/ModernTemplate'
import MinimalTemplate from '../assets/templates/MinimalTemplate'
import MinimalImageTemplate from '../assets/templates/MinimalImageTemplate'
import ClassicTemplate from '../assets/templates/ClassicTemplate'

export default function ResumePreview({ data, template, accentColor, classses= "" }) {
  function renderTemplate () {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} image={true} />
      default :
        return <ClassicTemplate data={data} accentColor={accentColor} />
    }
  }
  
  return(
    <div className='w-full bg-gray-100'>
      <div id="resume-preview" className={`border border-gray-300 ${classses} print:shadow-none print:border-none`}>
        {renderTemplate()}
      </div>

      <style jsx> 
        {`
          @page {
            size: letter;
            margin: 0;
          }
          @media print {
            html, body {
              width: 8.5in;
              height: 11in;
              overflow: hidden;
            }
            body * {
              visibility: hidden;
            }
            #resume-preview, #resume-preview * {
            visibility: visible;
            }
            #resume-preview {
              position: absolute;
              left: 0,
              top: 0,
              width: 100%;
              height: auto;
              margin: 0;
              padding: 0;
              box-shadow: none !important;
              border: none !important;
            }
          }
        `}
      </style>
    </div>
  )
}