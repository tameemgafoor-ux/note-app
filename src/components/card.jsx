import { Pencil, Star, Trash2 } from "lucide-react";
import { useContext } from "react";
import {mycontext} from "../App.jsx"
function Card({note}) {
  const {remove,seteditnote}=useContext(mycontext)
  return (
    <div className={`w-fit max-w-sm ${note.color} rounded-2xl border border-purple-100 p-8 shadow-lg shadow-purple-100/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>

      {/* Buttons */}
      <div className="flex justify-end gap-2 mb-4">
        <button className="px-3 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition"
        onClick={()=>seteditnote(note)}
        >
          Edit
        </button>

        <button className="px-3 py-1.5 text-sm font-medium text-purple-600 bg-indigo-50 rounded-lg hover:bg-purple-100 transition"
        onClick={()=>remove(note.id)}
        >
          <Trash2 size={18} className="text-red-500" />
        </button>
      </div>

      {/* Title */}
      <h1 className="text-xl font-bold text-slate-800 mb-3 [overflow-wrap:anywhere]">
        {note.title}
      </h1>

      {/* Content */}
      <p className="text-sm leading-6 text-slate-600 mb-5 [overflow-wrap:anywhere]">
       {note.content}
      </p>

      {/* Date */}
      <div className="border-t border-slate-100 pt-3">
        <p className="text-xs font-medium text-slate-400">
          {new Date(note.date).toLocaleString("en-IN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
})}
        </p>
      </div>

    </div>
  );
}

export default Card;
