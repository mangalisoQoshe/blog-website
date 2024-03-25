import EditorComponent from "../../components/txt-editor/EditorComponent";
import styles from "./CreatePost.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost({ editedBlog, addBlog }) {
  const [input, setInput] = useState({ ...editedBlog });
  const [tagList, setTagList] = useState([...editedBlog.tags]);
  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditor = (value) => {
    setInput({ ...input, body: value });
  };

  const handleFormSubmitBtn = (e) => {
    e.preventDefault();
    //will finish later
    //generate id
    const id = Math.ceil(Math.random() * 1000);

    addBlog({
      id: id,
      tags: [...tagList],
      brief: input.brief,
      title: input.title,
      body: input.body,
      publishDate: new Date().toDateString(),
    });

    navigate(`/blog/${input.id}`);
  };

  const handleAddTagBtn = (e) => {
    e.preventDefault();

    setTagList((prev) => [...prev, input.tag]);
    setInput({ ...input, tag: "" });
  };

  const deleteTag = (id) => {
    setTagList((prevState) => prevState.filter((t) => t != id));
  };

  return (
    <form onSubmit={handleFormSubmitBtn}>
      <div className={styles.container}>
        <div>
          <input
            placeholder="Title"
            type="text"
            name="title"
            maxLength={100}
            value={input.title}
            onChange={handleChangeInput}
            required
            className={styles.label}
          />

          <textarea
            placeholder="Brief"
            type="text"
            name="brief"
            required
            value={input.brief}
            onChange={handleChangeInput}
            maxLength={300}
            className={styles["txt-area"]}
          />
        </div>
        <div>
          <input
            type="text"
            className={styles["input-tag"]}
            placeholder="  Add Tag"
            value={input.tag}
            name="tag"
            onChange={handleChangeInput}
          />
          <button className={styles["btn-tag"]} onClick={handleAddTagBtn}>
            add
          </button>
          <ul>
            {tagList.map((tag) => (
              <li key={tag}>
                {tag}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    deleteTag(tag);
                  }}
                >
                  delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <EditorComponent input={input} handleEditor={handleEditor} />
      </div>
      <button type="submit">Post</button>
    </form>
  );
}

export default CreatePost;
