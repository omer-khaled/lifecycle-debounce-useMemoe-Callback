/*
    if change state or ne prop
    component will rerender 
*/
import { useEffect, useState } from "react";
function Test(){
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    /*
        when component first render only (empty dependence array); [componentdidmount]
    */
    useEffect(()=>{
        console.log('useEffect (component did mount)');
        return ()=>{
        console.log('useEffect (compontn did unmount)')
        }
    },[]);
    /********************************************************* */
    /*
        when component first render and if update state (dependice array) [component did mount]
        whatcher => state , new prop
    */
    useEffect(()=>{
        // if name is empty not change from first time
        (name)&&console.log('useEffect (component did update)')
        return ()=>{
            console.log('useEffect (compontn did unmount)')
        }
    },[name]);
    /********************************************************* */
    /*
        component did update anoth solution 2
        without any debendicis useEffect is awlays run (first render and all renders (update state or new props))
    */
    useEffect(()=>{
        console.log('useEffect will alway fire every render');
    });
    /***********************************************************/
    useEffect(()=>{
        if(name){
            let handleTimeOut = setTimeout(()=>{
                console.log('effect');
            },2000)
            // component did mount or state change it fire to clean previous state when new render
            return ()=>{
                clearTimeout(handleTimeOut);
            }
        }
    },[name]);
    return(<div className="App">
        <label>Name</label>
        <input type="text" onChange={(e)=>{
        setName(e.target.value);
        }}/>
        <br />
        <label>Phone</label>
        <input type="tel" onChange={(e)=>{
        setPhone(e.target.value);
        }}/>
        <br />
        <p>name: {name} <br /> phone: {phone}</p>
    </div>);
}
export default Test;