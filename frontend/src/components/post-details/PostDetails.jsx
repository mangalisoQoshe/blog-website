import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMsg from "../../pages/blog/ErrorMsg";
import { ArrowLeft, InstagramIcon, LinkedinIcon } from "../icons/Icons";
import Post from "../post/Post";
import styles from "./PostDetails.module.css";
import PropTypes from "prop-types";

function PostDetails({ blogs, errorMessage, deleteBlog }) {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const obj = blogs.find((b) => b.id === id);
    setPost(obj);
  }, [blogs, post, id]);

  useEffect(() => {
    document.title = post ? post.title : "Loading...";
  }, [post]);

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
      <button onClick={handleBackBtn} className={` ${styles["btn-back"]}`}>
        <ArrowLeft />
        <span style={{ fontSize: "17px", marginLeft: "0.6rem" }}> Go Back</span>
      </button>
      <h2 className={styles.title}>{post.title}</h2>
      <div>
        <div className={styles.date}>
          <p>
            Publish on
            {new Date(post.createdAt.slice(0, 10)).toDateString().slice(3)}
          </p>
          {post.version > 0 ? (
            <p>
              Last Updated on
              {new Date(post.updatedAt.slice(0, 10)).toDateString().slice(3)}
            </p>
          ) : (
            ""
          )}
        </div>

        <div>
          <p
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </div>
        <p className={styles.tags}>
          Tags:{" "}
          {post.tags.map((tag) => {
            return tag.concat(" ");
          })}
        </p>
      </div>
      <div className={styles["author-info"]}>
        <img
          src="/potrait1.jpg"
          alt="My picture"
          className={styles["p-picture"]}
        />
        <div className={styles["author-details"]}>
          <p className={styles["author-name"]}>Witten by Samkelisiwe</p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque
            veniam ipsum hic suscipit, earum, molestiae reprehenderit eum fugit
            adipisci quaerat culpa temporibus harum praesentium facere totam
            aliquid eveniet corporis quibusdam!
          </p>
          <div className={styles["socials"]}>
            <button className={styles["btn-insta"]}>
              <InstagramIcon />
            </button>
            <button className={styles["btn-linked"]}>
              <LinkedinIcon />
            </button>
          </div>
        </div>
      </div>
      {filteredList.length > 0 ? (
        <div>
          <h2 style={{ marginBottom: "1rem" }}>
            If you found this article helpful.
          </h2>
          <p style={{ marginBottom: "2rem" }}>
            You will love these ones as well.
          </p>
          <div className={styles.posts}>
            {filteredList.map((blog) => {
              return <Post key={blog.id} blog={blog} deleteBlog={deleteBlog} />;
            })}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

PostDetails.propTypes = {
  blogs: PropTypes.array.isRequired,
  errorMessage: PropTypes.string,
  deleteBlog: PropTypes.func.isRequired,
};

export default PostDetails;
