import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import axios from "axios";
import "./singlePost.css";
import { useEffect, useState } from "react";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/posts/" + path);
        setPost(res.data.post);

        const userRes = await axios.get(
          `http://localhost:8000/api/users/${res.data.post.user_id}`
        );
        setUser(userRes.data.user);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getPost();
  }, [path]);

  if (!post || !user) {
    return <div>Loading...</div>;
  }

  const PF = "http://localhost:8000";

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img className="singlePostImg" src={PF + post.photo} alt="" />
        <h1 className="singlePostTitle">
          {post.title}
          <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit"></i>
            <i className="singlePostIcon far fa-trash-alt"></i>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:{" "}
            <b className="singlePostAuthor">
              <Link className="link" to={`/?users=${user.id}`}>
                {user.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.created_at).toDateString()}</span>
        </div>
        <p className="singlePostDesc">{post.description}</p>
      </div>
    </div>
  );
}
