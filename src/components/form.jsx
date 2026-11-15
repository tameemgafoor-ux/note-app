
import{useState}from"react"
function Form({onsave}) {
   const[title,settitle]=useState("")
   const[content,setcontent]=useState("")
   const[color,setcolor]=useState("")
   const[date,setdate]=useState("")
   const[error,setError]=useState("")

  const colors = [
    { name: "blue", class: "bg-blue-200" },
    { name: "green", class: "bg-green-100" },
    { name: "yellow", class: "bg-yellow-100" },
    { name: "pink", class: "bg-pink-100" },
    { name: "purple", class: "bg-purple-100" },
    { name: "white", class: "bg-white" },
  ];


  function ifsubmit(e){
    e.preventDefault();

      if (!title.trim()) {
      setError("First creat a title ");
      return;
    }

    // Content validation
    if (!content.trim()) {
      setError("Content cannot be empty");
      return;
    }

    // Title validation
    if (title.length > 100) {
      setError("Title cannot exceed 100 characters");
      return;
    }

    // Category validation
    // if (category.length > 30) {
    //   setError("Category cannot exceed 30 characters");
    //   return;
    // }

    // Duplicate validation
    // const duplicate = notes.some((note) => {
    //   return (
    //     note.id !== editingNote?.id &&
    //     note.title.trim().toLowerCase() === title.trim().toLowerCase() &&
    //     note.content.trim().toLowerCase() === content.trim().toLowerCase()
    //   );
    // });
  
    // if (duplicate) {
    //   setError("This note already exists");
    //   return;
    // }
   
  const notedata={
        id:crypto.randomUUID(),
        title:title.trim(),
        content:content.trim(),
        color:color,
        date:new Date()
   }
   onsave(notedata)

   settitle("");
  setcontent("");
  setcolor("");
  setError("");

  }
  return (
    <div className="shrink-0 h-fit bg-gradient-to-br from-slate-100 via-purple-50 to-indigo-100 flex flex-col items-start justify-start p-3">

  <form
    onSubmit={ifsubmit}
    className="w-full max-w-[350px] bg-white rounded-2xl shadow-xl shadow-purple-100 border border-purple-100 p-5 space-y-3"
  >
        {/* Heading */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-2xl">
            ✎
          </div>

          <h1 className="text-3xl font-bold text-slate-800">
            Create Your Note
          </h1>

          <p className="text-sm text-slate-500">
            Capture your thoughts and ideas
          </p>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">
            Note Title
          </label>

          <input
           value={title}
            type="text"
            placeholder="Enter your note title..."
            maxLength={100}
            onChange={(e)=>settitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
          />
          <p className="text-xs text-slate-400 text-right">
            Maximum 100 characters
          </p>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">
            Note Content
          </label>

          <textarea
            value={content}
            rows={5}
            placeholder="Write your thoughts here..."
            onChange={(e)=>setcontent(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 outline-none resize-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
          />
        </div>

        {error&& (<p className="mb-4 text-sm text-red-500">
            {error}</p>)}

        {/* Color */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-700">
            Choose Note Color
          </label>

          <div className="flex items-center gap-3">
           {colors.map((item)=>(
              <button
              type="button"
              key={item.name}
              onClick={()=>(setcolor(item.class))}
              className={`w-8 h-8 rounded-full border-2 border-gray-300 ${item.class}
                active:scale-110 hover:shadow-lg hover:border-purple-500
        transition-all duration-200`}
              />
              ))}
           </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg shadow-purple-200 hover:from-purple-700 hover:to-indigo-700 hover:shadow-xl active:scale-[0.98] transition duration-200"
         
        >
          + Create Note
        </button>

      </form>
    </div>
  );
}

export default Form;
