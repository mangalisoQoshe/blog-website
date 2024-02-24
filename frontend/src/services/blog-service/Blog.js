import axios from "axios";

const baseURL = "/api/blogs";

const getAll=async ()=>{
    const request = axios.get(baseURL)
    const response = await request;
    return response.data;
}

const getOne= async (id)=>{
    const request =  axios.get(`${baseURL}/${id}`)
    const response = await request
    return response.data
}

const create = async (newObject) => {
  const request = axios.post(baseURL, newObject);
  const response = await request;
    return response.data;
};

const update = async (id, newObject) => {
  const request = axios.put(`${baseURL}/${id}`, newObject);
  const response = await request;
    return response.data;
};

const deleteBlog = async (id) => {
  const request = axios.delete(`${baseURL}/${id}`);
  const response = await request;
    return response.data;
};

export default {
  getAll,
  create,
  update,
  deleteBlog,
  getOne,
};