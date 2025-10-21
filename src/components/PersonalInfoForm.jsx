import React from 'react'

export default function  PersonalInfoForm({data, onChange, removeBackground, setRemoveBackground}) {
  return (
    <div>
      <h3 className='text-lg font-semibold text-gray-900'>Personal Information</h3>
      <p className='text-sm text-gray-600'>Get Started with the personal information.</p>

      <div className="flex items-center gap-2">
        <label>
          {data.iamge ? (
            <>
            </>
          ) : (
            <>
            </>
          )}
        </label>
      </div>
    </div>
  )
}