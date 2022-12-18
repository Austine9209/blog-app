import React, { useState, useEffect } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { db, storage } from "../firebase/firebase";
import { useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

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
  const [progress, setProgress] = useState(null);

  const { id } = useParams();

  const { title, tags, category, trending, description } = form;

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            toast.info("Image upload to firebase successfully");
            setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

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
          <div>
            <textarea
              className="form-control description-box"
              placeholder="Description"
              value={description}
              name="description"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div>
            <button
              className="btn-add"
              type="submit"
              disabled={progress !== null && progress < 100}
            >
              {id ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Compose;
