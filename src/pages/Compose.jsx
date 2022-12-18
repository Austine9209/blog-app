import React, { useState, useEffect } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

const initialState = {
  title: "",
  tags: [],
  trending: "no",
  category: "",
  description: "",
  comments: "",
  likes: [],
};

const categoryOption = ["Isekai", "Action", "Drama", "Sports", "Mecha"];

const Compose = () => {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);

  const { title, tags, category, trending, description } = form;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTags = (tags) => {
    setForm({ ...form, tags });
  };

  const handleTrending = (e) => {
    setForm({ ...form, trending: e.target.value });
  };

  const onCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  return (
    <div>
      <div>Create Blog</div>
      <div>
        <form>
          <div>
            <input
              type="text"
              className="form-control input-text-box"
              placeholder="Title"
              name="title"
              value={title}
              onChange={handleChange}
            />
          </div>
          <div>
            <ReactTagInput
              tags={tags}
              placeholder="Tags"
              onChange={handleTags}
            />
          </div>
          <div>
            <p className="trending">Is it trending blog ?</p>
            <div className="form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                value="yes"
                name="radioOption"
                checked={trending === "yes"}
                onChange={handleTrending}
              />
              <label htmlFor="radioOption" className="form-check-label">
                Yes&nbsp;
              </label>
              <input
                type="radio"
                className="form-check-input"
                value="no"
                name="radioOption"
                checked={trending === "no"}
                onChange={handleTrending}
              />
              <label htmlFor="radioOption" className="form-check-label">
                No
              </label>
            </div>
          </div>
          <div>
                <select
                  value={category}
                  onChange={onCategoryChange}
                  className="category-dropdown"
                >
                  <option>Please select category</option>
                  {categoryOption.map((option, index) => (
                    <option value={option || ""} key={index}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
        </form>
      </div>
    </div>
  );
};

export default Compose;
