import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { Skeleton } from "../components/Skeleton";
import { useBlog } from "../hooks";

export function Blogs()
{
  const {loading,Blogs} = useBlog();
    if(loading)
    {
      return (
        <div>
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
        </div>
      )

    }

  return(
    <div>
    <AppBar/>
    
    <div className="flex justify-center">

    
    <div>
    {
     Blogs.map(blog=><BlogCard id={blog.id}
      title={blog.title}
      content={blog.content}
      author={blog.author.name||"Anonymous"}
      publishedDate={"2nd Feb 2024"}></BlogCard>)
    }




   </div>
   </div>
   </div>
  )   
}