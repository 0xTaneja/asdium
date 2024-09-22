import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";


export interface Blogint{
    "title":string,
    "content":string,
    "id":string,
    "author":{
        "name":string
    }

}

export function useOneBlog({id}:{id:string})
{
    const [loading,setLoading] = useState(true);
    const [Blog, setBlog] = useState<Blogint | null>(null);
    const token=localStorage.getItem("token");
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response)=>{
            setBlog(response.data.resultblog);
            setLoading(false);
        })
    },[id]);

      
    return {
        loading,
        Blog
    }
}
export function useBlog()
{
    const [loading,setLoading] = useState(true);
    const [Blogs,setBlogs]=useState<Blogint[]>([]);
    const token=localStorage.getItem("token");
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response)=>{
            setBlogs(response.data.allblogs);
            setLoading(false);
        })
    },[]);

      
    return {
        loading,
        Blogs
    }
}