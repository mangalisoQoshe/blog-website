import { useParams,useNavigate } from "react-router-dom";
import blogService from "../../services/blog-service/Blog";
import { useEffect, useState } from "react";

function PostDetails() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    blogService
      .getOne(id)
      .then((response) => setPost(response))
      .catch((err) => {
        console.log("failed to fetch post with ID: ", id);
      });
  }, []);

  const handleBackBtn=()=>{
    navigate("/blog")

  }

  return (
    <>
      <button onClick={handleBackBtn}>Back</button>
      {post ? (
        <div>
          <h2>{post.PublishDate}</h2>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <p>{post.tag}</p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default PostDetails;
