

import { useState,useEffect,createContext } from "react";
import Form from "./components/form";
import Head from "./components/head";
import Card from "./components/card";
import axios from "axios"
export const mycontext=createContext();

function App() {

  const [note, setnote] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  const [total , settotal] = useState();
  const [editnote,seteditnote]=useState(null);
  const [refresh,setrefresh]=useState(false)
  const [search, setsearch] = useState("");

  async function onsave(notedata) { 
     try{
      const responce = await axios.post(
        "http://localhost:3001/notes",
        notedata)

       //while click create note refresh update 
       //and useEffect exicute  
       //then only note update and pagination works 
        setrefresh((prev) => !prev);
      }catch(error){
        console.log("error in onsave")
      }
    }


  async function onedit(id,updatednotedata){
     try{
      const response=await axios.patch(
        `http://localhost:3001/notes/${id}`
        ,updatednotedata)

        setnote((prev) =>
        prev.map((item) =>
        item.id === id ? response.data : item
       )
       );

       seteditnote(null);
      

     }catch(error){
      console.log(error)
     }
  }

   async function remove(id){
  try{
    await axios.delete(
      `http://localhost:3001/notes/${id}`)

    setnote((prev)=>prev.filter((item)=>item.id !== id))
     setrefresh((prev) => !prev);
    }catch(error){
      console.log(error)
    }
  }

  function onsearch(){
      const filtered = note.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
   // || item.content.toLowerCase().includes(search.toLowerCase())
  );

  setnote(filtered);
  setsearch("");
  }
   
  let limit = 10

  useEffect(() => {
  async function fetchget(){
   try{
    const responce=await axios.get(
      `http://localhost:3001/notes?_page=${
        currentpage}&_per_page=${limit}&_sort=-date`)

    setnote(responce.data.data)
    settotal(responce.data.pages)
    //  console.log("Current page:", currentpage);
    //  console.log("Requested limit:", limit);
    //  console.log("Total items:", responce.data.items);
    //  console.log("Total pages:", responce.data.pages);
    //  console.log("Current page notes:", responce.data.data);
    
   }catch(error){
     console.log("somthing wrong in useeffect ")
   }
  }
  fetchget()
  }, [currentpage,refresh]);
  

return (
  <div className="h-screen flex flex-col overflow-hidden">

    <mycontext.Provider
      value={{
        onsave,
        remove,
        seteditnote,
        editnote,
        onedit,
        onsearch,
        search,
        setsearch,
        setrefresh
      }}
    >
      <Head />

      {/* Main Layout */}
      <div className="flex flex-1 min-h-0 items-stretch overflow-hidden bg-gradient-to-br from-slate-100 via-purple-50 to-indigo-100">

        <Form />

        {/* Cards Section */}
        <div className="flex-1 min-w-0 min-h-0 flex flex-col p-4">

          {/* Cards - Scrollable Area */}
          <div className="flex-1 min-h-0 overflow-y-auto">

            <div className="flex flex-wrap items-start content-start gap-4">

              {note.map((item) => (
                <Card
                  key={item.id}
                  note={item}
                />
              ))}

            </div>

          </div>

{/* Pagination - Fixed Bottom */}
<div className="flex justify-center items-center gap-4 mt-auto pt-4 pb-2 shrink-0">
             
             {/* Pagination */}
<div className="flex justify-center items-center gap-2 mt-auto pt-4 pb-2 shrink-0">

  {/* Previous */}
  <button
    disabled={currentpage === 1}
    onClick={() => setcurrentpage((prev) => prev - 1)}
    className="w-10 h-10 flex items-center justify-center rounded-xl
    bg-white shadow-sm border border-slate-200
    text-indigo-600 font-semibold
    hover:bg-indigo-50 hover:border-indigo-300
    disabled:opacity-40 disabled:cursor-not-allowed
    transition-all duration-200"
  >
    ←
  </button>

  {/* Page Numbers */}
  {Array.from({ length: total }, (_, index) => {
    const pagenum = index + 1;

    return (
      <button
        key={pagenum}
        onClick={() => setcurrentpage(pagenum)}
        className={`min-w-10 h-10 px-3 flex items-center justify-center
        rounded-xl font-semibold text-sm transition-all duration-200
        ${
          currentpage === pagenum
            ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-105"
            : "bg-white text-slate-600 border border-slate-200 shadow-sm hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300"
        }`}
      >
        {pagenum}
      </button>
    );
  })}

  {/* Next */}
  <button
    disabled={currentpage >= total}
    onClick={() => setcurrentpage((prev) => prev + 1)}
    className="w-10 h-10 flex items-center justify-center rounded-xl
    bg-white shadow-sm border border-slate-200
    text-indigo-600 font-semibold
    hover:bg-indigo-50 hover:border-indigo-300
    disabled:opacity-40 disabled:cursor-not-allowed
    transition-all duration-200"
  >
    →
  </button>

</div>

</div>

        </div>
      </div>

    </mycontext.Provider>

  </div>
);


}

export default App;
