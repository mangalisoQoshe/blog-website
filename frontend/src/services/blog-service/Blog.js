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

const getOne = async (id) => {
  try {
    const response = await fetch(endpoint.concat("/", id));
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

const create = async (newObject, uid) => {
  try {
    const response = await fetch(endpoint, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `UID ${uid}`,
      },
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

const update = async (id, newObject, uid) => {
  try {
    const response = await fetch(endpoint.concat("/", id), {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `UID ${uid}`,
      },
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

const deleteBlog = async (id, uid) => {
  try {
    const response = await fetch(endpoint.concat("/", id), {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `UID ${uid}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data);
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
