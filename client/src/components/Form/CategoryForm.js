import React from 'react'

export default function CategoryForm({handleSubmit,value,setValue}) {
  return (
    <div className='mt-4' style={{"width":"70%"}}><form onSubmit={handleSubmit}>
    <div className="mb-3 flex gap-2">
      <input type="text" value={value} onChange={(e)=>setValue(e.target.value)} className="form-control" placeholder='Enter New Category Name'/>
      <button type="submit" className="btn bg-gray-500 text-white actions">Submit</button>
    </div>
    
  </form>
</div>
  )
}
