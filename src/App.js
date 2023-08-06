import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import './App.css';
import axios from "axios";
function App(){
  // if i make setState(with same variable) this not re-render compnent
  const [seacrhquery,setSearch] = useState('javascript');
  let currentRef = useRef(null);
  const [results,setResults] = useState(null);
  let getDateFromApi = useCallback(async function(check){
    if(seacrhquery){
      let {data:{query:{search}}} =await axios.get('https://en.wikipedia.org/w/api.php',{
        // params => url?action:'' وهكذا
        params:{
          action:'query',
          list:'search',
          origin:'*',
          format:'json',
          srsearch:seacrhquery,
        }
      });
      // let respone =await fetchedResult.json();
      check&&setResults(search);
    }
  },[seacrhquery])
  //without debounce technique
  
  // useEffect(()=>{
  //   // check variable for race condition
  //   let check = true;
  //   executeSeacr()
  //   return()=>{
  //     // for prevent race condition
  //     check = false;
  //   }
  // },[seacrhquery]);

  // *******************************************************

  //with debounce technique

  useEffect(()=>{
    // check variable for race condition
    let check = true;
    if(!currentRef.current){
      getDateFromApi(check);
      currentRef.current = true;
    }else{
      let handleSetTime = setTimeout(async function fetchData(){
        getDateFromApi(check);
      },1200);
      return()=>{
        // for prevent race condition
        clearTimeout(handleSetTime);
        check = false;
      }
    }
    // here results will trigger useEffect always
  },[getDateFromApi]);
  // *************************************************
  
  // 
  
  function mapResults(results){
    return (results)?results.map(el=>{
      console.log("omer");
      return(<tr key={el.pageid}>
        <td>{el.pageid}</td>
        <td>{el.title}</td>
        {/* text بتحولها ل  react اتنفذ مباشره ف  api لو الكود اللى جايلى من */}
        {/* XSS attack ( هل هو موثوق ولا لا هل اعرض الحاجه اللى جايه منه و لا لا api وده اللى لازم اعرفه عن ال ) */}
        {/* فى الحاله ديه ولا لا react  وهل اكتفى بالحمايه اللى بتوفرها */}
        {/* dangerousltyleSetInnerHtml كود اللى جاى من برهhtmlو بتاخد ال  */}
        <td><span dangerouslySetInnerHTML={{"__html":el.snippet}} /></td>
      </tr>);
    }):undefined;
  }
  // with useMemo
  let resultTable = useMemo(()=>{return mapResults(results)},[results]);
  // without useMemo
  // let resultTable = mapResults(results);
  return(
    <div className="App">
      <p>Search input</p>
      <input type="test" onChange={(e)=>{
        setSearch(e.target.value);
      }}/>
      <table >
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Desc</th>
          </tr>
        </thead>
        <tbody>
            {
              (results)&&
              <>
                {resultTable}
              </>
            }
        </tbody>
      </table>
    </div>
  );
}
export default App;