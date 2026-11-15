import { NotebookPen } from "lucide-react";
function Head (){
      return (
 <div className="w-full bg-gradient-to-r from-slate-900 via-purple-900 to-indigo-900 px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

        <h1 className="gap-2 text-2xl font-bold text-white ml-50 flex items-center" >
           <NotebookPen size={24} />My Notes  
        </h1>

        <div className="flex items-center gap-2">
          <input
            placeholder="Search..."
            className="w-48 md:w-72 rounded-xl bg-white/10 border border-white/20 px-4 py-2.5 text-white placeholder-purple-200 outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-400"
          />

          <button className="rounded-xl bg-purple-500 px-5 py-2.5 font-semibold text-white hover:bg-purple-400 transition">
            Search
          </button>
        </div>

      </div>
    </div>
  );
}
export default Head