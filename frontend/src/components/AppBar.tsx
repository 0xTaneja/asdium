import { Link, useLocation } from "react-router-dom";
import { Avatar } from "./BlogCard";

interface AppBarProps {
  onPublish?: () => void; // Optional publish function
  isPublishing?: boolean; // Optional state for publish process
}

export function AppBar({ onPublish, isPublishing = false }: AppBarProps) {
  const location = useLocation(); // Get current route

  return (
    <div className="border-b flex justify-between px-10 py-4">
      <div className="flex flex-col justify-center">
        <Link to={"/blogs"}>Medium</Link>
      </div>

      <div className="flex items-center">
        {/* Conditionally render the button based on route and presence of `onPublish` function */}
        {location.pathname === "/publish" && onPublish ? (
          <button
            type="button"
            className="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4
          focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2"
            onClick={onPublish}
            disabled={isPublishing} // Disable button while publishing
          >
            {isPublishing ? "Publishing..." : "Publish"}
          </button>
        ) : (
          <Link to={"/publish"}>
            <button
              type="button"
              className="mr-2 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4
            focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center "
            >
              New
            </button>
          </Link>
        )}

        {/* Avatar */}
        <Avatar name={"Harkirat"} size={"big"} />
      </div>
    </div>
  );
}
