import { useEffect,useState } from "react"

function App() {

  const [message,setMessage] = useState("");

  useEffect(()=>{
    fetch("http://localhost:3000/test")
    .then((res)=>res.json())
    .then((data)=>setMessage(data.message))
    .catch((err)=>{
      console.error("error to message",err)
    })
  },[])

  return (
    <>
      <h1>New B2B project is building!</h1>
      <h2>{message}</h2>
    </>
  )
}

export default App
