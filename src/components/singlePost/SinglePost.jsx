import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import axios from "axios";
import "./singlePost.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [categories, setCategories] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/posts/" + path);
        setPost(res.data.post);

        const userRes = await axios.get(
          `http://localhost:8000/api/users/${res.data.post.user_id}`
        );
        setAuthor(userRes.data.user);
        setCurrentUser(JSON.parse(localStorage.getItem("userData")));
        setTitle(res.data.post.title);
        setDesc(res.data.post.description);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getPost();
  }, [path]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/categories");
        setCategories(res.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/posts/${post.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      navigate("/");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/posts/${post.id}`,
        {
          title,
          description: desc,
          category_id: selectedCategory,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Post Updated successful.");
      setUpdateMode(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating post:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Updating Post failed. Please try again.");
      }
    }
  };

  if (!post || !author ) {
    return <div>Loading...</div>;
  }

  const PF = "http://localhost:8000";
  const defaultImage =
    "https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500";

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && post.photo !== "null" ? (
          <img
            className="singlePostImg"
            src={PF + post.photo}
            alt={post.title}
          />
        ) : (
          <img className="singlePostImg" src={defaultImage} alt={post.title} />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {post.title}
            {currentUser && currentUser.username === author.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span>
            Author:{" "}
            <b className="singlePostAuthor">
              <Link className="link" to={`/?user=${author.id}`}>
                {author.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.created_at).toDateString()}</span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{post.description}</p>
        )}
        {/* Dropdown to select category */}
        {updateMode && (
          <div className="writeFormGroup">
            <select
              className="writeInput"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
