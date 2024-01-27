import React from 'react'

export default function CategoryForm({handleSubmit,value,setValue}) {
  return (
    <div><form onSubmit={handleSubmit}>
    <div className="mb-3">
      <input type="text" value={value} onChange={(e)=>setValue(e.target.value)} className="form-control" placeholder='Enter New Category Name'/>
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
</div>
  )
}
