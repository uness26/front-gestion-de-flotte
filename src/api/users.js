import api from "./api";

export const createUser = (body) => {
  return api.post("/users", body);
};
export const getUsers = () => {
    return api.get("/users");
}
export const getUserProfile = () => {
  return api.get("/users/me");
}

export const getUserById = (id) => {
  return api.get(`/users/${id}`);
};

export const updateUser = (id, body) => {
  return api.patch(`/users/${id}`, body);
};

export const deleteUser = (id) => {
  return api.delete(`/users/${id}`);
};

export const logout = ()=>{
  return api.post('/users/logout');
}