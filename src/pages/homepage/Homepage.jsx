import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Homepage() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const categoryQuery = new URLSearchParams(search).get("cat");
        const userQuery = new URLSearchParams(search).get("user");
        let url = "http://localhost:8000/api/posts";
        if (categoryQuery) {
          url += `/category/${categoryQuery}`;
        } else if (userQuery) {
          url += `/user/${userQuery}`;
        }
        const response = await axios.get(url);
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [search]);

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        {showSidebar && <Sidebar />}
      </div>
    </>
  );
}
