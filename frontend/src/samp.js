import react, { useEffect,useState} from 'react'; //to use this in app function we need data and set data
//react imported and created some variables

function App() {
  const [data, setData] = useState({})
  useEffect(()=>{
    fetchData();
  },[]);

  const fetchData = async ()=> {
    try{
      const response = await fetch('http://localhost:5000/api/data') //api called here
      const jsonData = await response.json(); //json data of api
      setData(jsonData)  //set data variable 
    }
    catch(error){
      console.log('Error',error)
    }
  }
  return (
    <div className="App">
    <h2>FrontEnd</h2>
    <h3>{ data.message}</h3>
    </div>
  );
}

export default App;