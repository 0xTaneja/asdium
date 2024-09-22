import { Blogint } from "../hooks"
import { AppBar } from "./AppBar"
import { Avatar } from "./BlogCard";
import { Skeleton } from "./Skeleton";

export function BlogData({blog}:{blog:Blogint | null})
{
    if (!blog) {
        // Handle case where blog is null or undefined
        return <div>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
        </div>;
    }
    return (
      <div>
        <AppBar/>
      <div className="flex justify-center">
      <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12 ">
       <div className="col-span-8 ">
        <div className="text-5xl font-extrabold">
        {blog.title}
        </div>
        <div className="text-slate-500 pt-2">
            Posted On 2nd December 2023
        </div>
        <div className="pt-4">
        {blog.content}
        </div>
       </div>
       <div className="col-span-4">
        <div className="text-slate-600 text-lg">
        Author
        </div> 
        <div className="flex w-full">
            <div className="pr-4 flex justify-center flex-col">
                <Avatar size={"big"} name={blog.author.name||"Anonymous"}/>
            </div>
            <div>
            <div className="text-xl font-bold">
        {blog.author.name||"Anonymous"}
        </div>
        <div className="pt-2 text-slate-500">
            Random Catch Phrase about the Author's Ability to grab the User's Attention
        </div>
            </div>

        </div>
       
       </div>
      </div>
      </div>
      </div>
    )
}