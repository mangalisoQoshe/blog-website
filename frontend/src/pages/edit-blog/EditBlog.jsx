import CreatePost from "../create-blog/CreateBlog";
import PropTypes from "prop-types";

function EditBlog({ updateBlog }) {
  return <CreatePost insertBlog={updateBlog} />;
}

EditBlog.propTypes ={
  updateBlog: PropTypes.func.isRequired
}

export default EditBlog;
