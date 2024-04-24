import { useParams,useNavigate } from "react-router-dom";
import blogService from "../../services/blog-service/Blog";
import { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";

function PostDetails() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    blogService
      .getOne(id)
      .then((response) => setPost(response.blog))
      .catch((err) => {
        console.log(`failed to fetch post with ID: ${id}`, err);
      });
  }, []);

  const handleBackBtn=()=>{
    navigate("/blog")

  }

  //const publishDate = new Date(post.createdAt)
  //console.log(post.createdAt)
 
  return (
    <>
      <button onClick={handleBackBtn}>Back</button>
      {post ? (
        <div>
          <h2>Publish Date {(new Date(post.createdAt.slice(0,10))).toDateString()}</h2>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <p>{(post.tags).map((tag)=>{return tag})}</p>
        </div>
      ) : (
        <Spinner/>
      )}
    </>
  );
}

export default PostDetails;
