

import { useState,useEffect } from "react";
import Form from "./components/form";
import Head from "./components/head";
import Card from "./components/card";

function App() {
  const [note, setnote] = useState(()=>{
    const savedNotes=localStorage.getItem("note");
    
    return savedNotes?JSON.parse(savedNotes) :[]
  });

  useEffect(() => {
    localStorage.setItem("note", JSON.stringify(note));
  }, [note]);

  function onsave(notedata) {
    setnote((prev) => [notedata, ...prev]);
  }
  function remove(id){
    {setnote(note.filter((item)=>item.id !== id))}
  }
  
  return (
    <div>
      <Head />

      <div className="flex items-stretch bg-gradient-to-br from-slate-100 ">
        <Form onsave={onsave} />
       <div className="flex-1 flex flex-wrap items-start content-start gap-4 p-4">
         {note.map((item)=>(
          <Card remove={remove}key={item.id} note={item}/>
         ))}
         </div>
      </div>
    </div>
  );
 
}

export default App;
