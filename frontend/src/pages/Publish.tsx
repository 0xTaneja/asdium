import { useState } from "react";
import axios from "axios";
import { AppBar } from "../components/AppBar";
import { SubTextEditor } from "../components/SubTextEditor";
import { TextEditor } from "../components/TextEditor";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export function Publish() {
  const [isPublishing, setIsPublishing] = useState(false);
  const [title, setTitle] = useState(""); // State for blog title
  const [content, setContent] = useState("");
  const navigate=useNavigate(); // State for blog content

  // Handle the publish action
  const handlePublish = () => {
    setIsPublishing(true); // Set publishing state to true

    // Make an Axios post request to your backend API
    const cleanedTitle = title.replace(/^#\s*/, "");
    axios.post(`${BACKEND_URL}/api/v1/blog`, {
      title: cleanedTitle,
      content: content,
    },{
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then(response => {
      // Handle successful response
      alert("Blog published successfully!");
      console.log(response.data.id)
      setIsPublishing(false);
    
      navigate(`/blog/${response.data.blogId}`);
      
    })
    .catch(error => {
      // Handle error
      alert("Error publishing blog");
      console.log(error)
      setIsPublishing(false);
    });
  };

  return (
    <div>
      <AppBar onPublish={handlePublish} isPublishing={isPublishing} />
      <div className="flex justify-center w-full pt-8">
        <div className="max-w-screen-lg w-full">
          <TextEditor title={title} setTitle={setTitle} />
          <SubTextEditor content={content} setContent={setContent} />
        </div>
      </div>
    </div>
  );
}
