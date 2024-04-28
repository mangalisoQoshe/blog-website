import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMsg from "../../pages/blog/ErrorMsg";
import { ArrowLeft } from "../icons/Icons";
import Post from "../post/Post";
import styles from "./PostDetails.module.css";

function PostDetails({ blogs, errorMessage, deleteBlog }) {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const obj = blogs.find((b) => b.id === id);
    setPost(obj);
  }, [blogs, post, id]);

  const handleBackBtn = () => {
    navigate("/blog");
  };

  if (errorMessage !== null) {
    return <ErrorMsg message={errorMessage} />;
  }

  if (post === null || post === undefined) {
    return <Spinner />;
  }

  const filteredList = blogs.filter((blog) => {
    return post.tags.some(
      (tag) => blog.tags.includes(tag) && blog.id !== post.id
    );
  });

  return (
    <>
      <button onClick={handleBackBtn}>
        {" "}
        <ArrowLeft /> Go Back
      </button>

      <div>
        <h2>
          Publish on
          {new Date(post.createdAt.slice(0, 10)).toDateString().slice(3)}
        </h2>
        {post.version > 0 ? (
          <h2>
            Last Updated on
            {new Date(post.updatedAt.slice(0, 10)).toDateString().slice(3)}
          </h2>
        ) : (
          ""
        )}
        <h2>{post.title}</h2>
        <p className={styles.content}>{post.body}</p>
        <p>
          {" "}
          Tags:{" "}
          {post.tags.map((tag) => {
            return tag.concat(" ");
          })}
        </p>
      </div>
      <div>
        <img src="/default-pp.svg" alt="My picture" />
        <h2>Witten by Author's name</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque
          veniam ipsum hic suscipit, earum, molestiae reprehenderit eum fugit
          adipisci quaerat culpa temporibus harum praesentium facere totam
          aliquid eveniet corporis quibusdam!
        </p>
      </div>
      {filteredList.length > 0 ? (
        <div>
          <h2>If you found this article helpful.</h2>
          <p>You will love these ones as well.</p>
          {filteredList.map((blog) => {
            return <Post key={blog.id} blog={blog} deleteBlog={deleteBlog} />;
          })}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default PostDetails;
