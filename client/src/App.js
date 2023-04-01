import "./styles.css";
import Micron from "./components/Micron";
import {useState, useEffect} from 'react';
import MicronEditor from './components/MicronEditor';

const TITLE = "Ian's Micro-Blog";
const DESCRIPTION = "Hello! I'm Ian, a web developer working with the MERN stack. I created this micro-blog as a throwback to the early days of platforms like Twitter, where micro-blogging was about chronicling the seemingly mundane elements of everyday life.";
const AVATAR_LINK = "https://pbs.twimg.com/profile_images/1623302536261251073/16NbrQTY_400x400.jpg";

export default function App() {
  const [micronText, setMicronText] = useState("")
  const [micra, setMicra] = useState([]);


  function submitMicron() {
    fetch("http://localhost:3001/",
    {
      method:'POST',
      mode:'cors',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({text:micronText})
    }).then(response=>response.json())
    .then(res=>setMicra(previousData=>[...previousData,res]))
    .then(setMicronText(""));
  }

  function deleteMicron(id) {
    fetch('http://localhost:3001/delete/?id='+id)
    .then(()=>setMicra(saved=>{
      return saved.filter(m=> {
        return m._id!==id
      })
      
    }));
  }

  function updateMicron(id,text){
    fetch('http://localhost:3001/update/',
    {
      method:'POST',
      mode:'cors',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({id:id,newText:text}),})
      .then (()=>{
        setMicra(micra.map(item=>
            item._id == id? {...item, body:text}:item)
        )
      });
  }

  useEffect(()=>{
    fetch('http://localhost:3001/')
    .then(response=>response.json())
    .then(res=>setMicra(res.data));
   return ()=>{}},
   []);

  return (
    <div className="App">
      <h1>{TITLE}</h1>
      <div className="description-container">
        <img className="avatar" src={AVATAR_LINK} />
        <p>{DESCRIPTION}</p>
      </div>
       <MicronEditor onAdd={submitMicron} text={micronText} handleChange={setMicronText} />
      <div className="micra-box">
        {micra && micra.slice(0).reverse().map((micron) => (
          <Micron key={micron._id} id={micron._id} content={micron.body} date={micron.date} onDelete={deleteMicron} onEdit={updateMicron} />
        ))}
      </div>
    </div>
  );
}
