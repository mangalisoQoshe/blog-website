

const endpoint = "/v1/blogs";

const getAll = async () => {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    if (response.ok) {
    
      return data;
    } else {
      throw new Error("Server Error ", data.error.message);
    }
  } catch (err) {
    throw new Error("Fetch Error: " + err);
  }
};

const getOne = async(id) => {
  try {
    const response = await fetch(`${endpoint}/${id}`);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error("Server Error ", data.error.message);
    }
  } catch (err) {
    throw new Error("Fetch Error: " + err);
  }
};

const create = async(newObject) => {
  try {
    const response = await fetch(endpoint, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newObject),
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error("Server Error ", data.error.message);
    }
  } catch (err) {
    throw new Error("Fetch Error: " + err);
  }
};

const update = async (id, newObject) => {
  try {
    const response = await fetch(`endpoint/${id}`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newObject),
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error("Server Error ", data.error.message);
    }
  } catch (err) {
    throw new Error("Fetch Error: " + err);
  }
};

const deleteBlog = async (id) => {
  try {
    const response = await fetch(`endpoint/${id}`, {
      method: "delete",
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error("Server Error ", data.error.message);
    }
  } catch (err) {
    throw new Error("Fetch Error: " + err);
  }
};

export default {
  getAll,
  create,
  update,
  deleteBlog,
  getOne,
};
