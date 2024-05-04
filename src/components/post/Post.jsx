import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ post }) {
  const PF = "http://localhost:8000";
  const defaultImage = "https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500";

  return (
    <div className="post">
      {post.photo && post.photo !== "null" ? (
        <img className="postImg" src={PF + post.photo} alt={post.title} />
      ) : (
        <img className="postImg" src={defaultImage} alt={post.title} />
      )}

      <div className="postInfo">
        <div className="postCats">
          {post.categories && post.categories.map((c) => (
            <span key={c.id} className="postCat">{c.name}</span>
          ))}
        </div>
        <Link to={`/post/${post.id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.created_at).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.description}</p>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired, 
    photo: PropTypes.string, 
    created_at: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};
