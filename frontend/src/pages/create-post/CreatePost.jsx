import styles from "./CreatePost.module.css";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";

function CreatePost() {
  const [input, setInput] = useState({ title: "", brief: "", content: "" });

  const handleChangeInput = (e) => {
    switch (e.target.name) {
      case "title":
        setInput({ ...input, title: e.target.value });
        break;

      case "brief":
        setInput({ ...input, brief: e.target.value });
        break;

      default:
        console.log("Error occured in CreapePost component");
        break;
    }
  };

  const handleEditor = (value) => {
    setInput({ ...input, content: value });
  };

  const handleSubmitBtn = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmitBtn}>
      <div className={styles.container}>
        <div className={styles["input-container"]}>
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
        <div className={styles["add-tag"]}>
          <label htmlFor="#tag" style={{"display":"block"}}>Add Tag</label>
          <input type="text"/>
          <button className={styles["btn-tag"]}>add</button>
          <ul></ul>
        </div>
      </div>
      <div>
        <Editor
          apiKey="rfvabu9tkel58kg3a1obhmpzlfitavaxdbjw5dlmo3u28cpz"
          initialValue={input.content}
          menu={true}
          onEditorChange={(newValue) => handleEditor(newValue)}
          init={{
            height: 300,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </div>
      <button type="submit">Post</button>
    </form>
  );
}

export default CreatePost;
