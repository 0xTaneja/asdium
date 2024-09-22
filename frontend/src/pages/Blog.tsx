import { BlogData } from "../components/BlogData";
import { Skeleton } from "../components/Skeleton";
import { useOneBlog } from "../hooks"
import { useParams } from "react-router-dom";
export function Blog()
{

  const {id}=useParams();
  const { loading, Blog: oneblog } = useOneBlog({ id: id || "" });
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
  return (
    <div>
       <BlogData blog={oneblog}/>
    </div>
  )

}