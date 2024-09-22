import { signupinput } from "@rushabt11/common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export function Account({type}:{type:"signup"|"signin"})
{
    const navigate=useNavigate();
    const [postinputs,setpostinputs]=useState<signupinput>({
        name:"",
        username:"",
        password:"",
    })
    async function sendRequest()
    { 
       try{
        const response=await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postinputs);
        const jwt=response.data;
          // console.log(jwt)
        if(type==="signup")
        {
            const jwtToken = typeof jwt === 'string' ? jwt : jwt.jwtToken;
            localStorage.setItem("token", jwtToken);
        }
        else
        {
            const jwttoken = typeof jwt === 'string' ? jwt : jwt.jwttoken;
            localStorage.setItem("token", jwttoken);
        } // Store only the token string        
        navigate("/blogs");
        
       }
       catch(e)
       {
          alert("Something went Wrong")
          console.log("Some Error Occured",e);
       }
    }
    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
            <div>
            <div className="px-10">
            <div className="text-3xl font-extrabold">
                Create an Account
            </div> 
            <div className="text-center text-slate-500">
            {type=='signin'?"Dont have an Account":"Already have an account?"}  
             <Link to={type==='signin'?"/signup":"/signin"} className="pl-2 underline">{type==='signin'?"Sign Up":"Sign In"}</Link>
            </div>
            </div>
            <div className="pt-8">
            {type==='signup'?<Label label="Name" placeholder="Harkirat Singh..." onChange={(e)=>{
             setpostinputs(c=>({
                ...c,
                name:e.target.value
             }))
            }}></Label>:null}

             <Label label="Username" placeholder="Harkirat@gmail.com" onChange={(e)=>{
             setpostinputs(c=>({
                ...c,
                username:e.target.value
             }))
            }}></Label>

             <Label label="Password" type={"password"} placeholder="123456" onChange={(e)=>{
             setpostinputs(c=>({
                ...c,
                password:e.target.value
             }))
            }}></Label>
            <button onClick={sendRequest} type="button" className="w-full mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700
             dark:focus:ring-gray-700 dark:border-gray-700">{type==="signup"?'Sign Up':'Sign in'}</button>
            </div>
            </div>
           </div>
        </div>
    )
}

interface labeltypes{
  label:string,
  placeholder:string,
  onChange:(e:ChangeEvent<HTMLInputElement>)=>void,
  type?:string
}
function Label({label,placeholder,onChange,type}:labeltypes)
{
    return (
        <div>
        <label className="block mb-2 text-sm text-black font-bold">{label}</label>
        <input onChange={onChange} type={type||"text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    )
}
