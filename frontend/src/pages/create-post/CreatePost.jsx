import EditorComponent from "../../components/txt-editor/EditorComponent";
import styles from "./CreatePost.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost({ initialInput, addBlog }) {
  const [input, setInput] = useState({ initialInput });
  const [tagList, setTagList] = useState([]);
  const navigate = useNavigate()

  const handleChangeInput = (e) => {
    switch (e.target.name) {
      case "title":
        setInput({ ...input, title: e.target.value });
        break;

      case "brief":
        setInput({ ...input, brief: e.target.value });
        break;

      case "tag":
        setInput({ ...input, tag: e.target.value });
        break;

      default:
        console.log("Error occured in CreapePost component");
        break;
    }
  };

  const handleEditor = (value) => {
    setInput({ ...input, content: value });
  };

  const handleFormSubmitBtn = (e) => {
    e.preventDefault();
    //will finish later
    //generate id
    const id = Math.ceil(Math.random() * 1000);
   
    addBlog({
      id: id,
      tag: input.tag,
      brief: input.brief,
      title: input.title,
      body: input.body,
      publishDate: new Date().toDateString(),
    });
    navigate('/blog')
  };

  const handleAddTagBtn = (e) => {
    e.preventDefault();
    setTagList([...tagList, input.tag]);
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
