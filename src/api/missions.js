import api from "./api";

export const createMission = (body) => {
  return api.post("/missions", body);
};
export const getMissions = () => {
    return api.get("/missions");
}

export const getMissionById = (id) => {
  return api.get(`/missions/${id}`);
};

export const updateMission = (id, body) => {
  return api.patch(`/missions/${id}`, body);
};

export const deleteMission = (id) => {
  return api.delete(`/missions/${id}`);
};