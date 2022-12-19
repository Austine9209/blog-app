import React from "react";
import { Link } from "react-router-dom";

const BlogSection = ({
  id,
  title,
  description,
  category,
  imgUrl,
  userId,
  author,
  timestamp,
  user,
  handleDelete,
}) => {
  return (
    <div>
      <div className="blog-section" key={id}>
        <img className="blogSection-cover" src={imgUrl} alt={title} />
        <h6 className="category">{category}</h6>
        <h3>{title}</h3>
        <p className="blogSection-desc">{(description, 120)}</p>
        <footer>
          <div className="blogSection-author">
            {/* author avatar */}
            <div>
              <h6>{author}</h6>
              <p>{timestamp.toDate().toDateString}</p>
            </div>
          </div>
          <Link className="blogSection-link" to={`/detail/${id}`}>
            ➝
          </Link>
        </footer>
        {user && user.uid === userId && (
            <div style={{ float: "right" }}>
              <button onClick={() => handleDelete(id)}></button>
              <Link to={`/update/${id}`}>
                <button
                  style={{ cursor: "pointer" }}
                  size="2x">Edit</button>
              </Link>
            </div>
          )}
      </div>
    </div>
  );
};

export default BlogSection;
