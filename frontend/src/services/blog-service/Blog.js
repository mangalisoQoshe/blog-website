const endpoint = "/v1/blogs";

const getAll = async () => {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    throw new Error("Failed to fetch");
  }
};

const getOne = async (id) => {
  try {
    const response = await fetch(endpoint.concat("/", id));
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    throw new Error("Failed to fetch");
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
      throw new Error(data.message);
    }
  } catch (err) {
    throw new Error("Failed to fetch");
  }
};

const update = async (newObject, uid) => {
  try {
    const response = await fetch(endpoint.concat("/", newObject.id), {
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
      throw new Error(data.message);
    }
  } catch (err) {
    throw new Error("Failed to fetch");
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
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    throw new Error("Failed to fetch");
  }
};

export default {
  getAll,
  create,
  update,
  deleteBlog,
  getOne,
};
