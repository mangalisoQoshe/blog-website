import styles from "./CreatePost.module.css"

function CreatePost() {
  return (
    <form>
      <input
        placeholder="Title"
        type="text"
        name="title"
        maxLength={100}
        required
        className={styles.label}
      />
 
      <textarea
        placeholder="Brief"
        type="text"
        name="brief"
        required
        maxLength={300}
        className={styles["txt-area"]}
      />
      <div>
        <input placeholder="Content" type="text" name="content" required />
      </div>
    </form>
  );
}

export default CreatePost