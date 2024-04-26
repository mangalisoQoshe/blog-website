import CreatePost from "../create-blog/CreateBlog";

function EditBlog({ updateBlog }) {
  return <CreatePost insertBlog={updateBlog} />;
}

export default EditBlog;
