import api from "./api";

export const createMission = (body) => {
  return api.post("/Missions", body);
};
export const getMissions = () => {
    return api.get("/Missions");
}

export const getMissionById = (id) => {
  return api.get(`/Missions/${id}`);
};

export const updateMission = (id, body) => {
  return api.patch(`/Missions/${id}`, body);
};

export const deleteMission = (id) => {
  return api.delete(`/Missions/${id}`);
};