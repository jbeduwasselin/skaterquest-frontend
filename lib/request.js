import { BACK_URL, headers } from "./config";

export async function signInRequest(email, password) {
  const serverResponse = await fetch(BACK_URL + "/user/signin", {
    method: "POST",
    headers,
    body: JSON.stringify({
      email,
      password,
    }),
  });
  return serverResponse.json();
}

export async function signUpRequest(username, email, password) {
  const serverResponse = await fetch(BACK_URL + "/user/signup", {
    method: "POST",
    headers,
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  return serverResponse.json();
}

export async function extendTokenRequest(token) {
  const serverResponse = await fetch(BACK_URL + "/user/extend", {
    method: "GET",
    headers: { ...headers, Authorization: token },
  });
  return serverResponse.json();
}

export async function getOwnUserInfo(token) {
  headers.Authorization = token;
  const serverResponse = await fetch(BACK_URL + "/user", {
    method: "GET",
    headers: { ...headers, Authorization: token },
  });
  return serverResponse.json();
}

export async function getUserInfo(token, uID) {
  const serverResponse = await fetch(BACK_URL + `/user/${uID}`, {
    method: "GET",
    headers: { ...headers, Authorization: token },
  });
  return serverResponse.json();
}

export async function getListOfTricks() {
  const serverResponse = await fetch(BACK_URL + `/tricks`, {
    method: "GET",
    headers,
  });
  return serverResponse.json();
}

export async function validateTricks(token, tricksID) {
  const serverResponse = await fetch(
    BACK_URL + `/tricks/validate/${tricksID}`,
    {
      method: "PUT",
      headers: { ...headers, Authorization: token },
    }
  );
  return serverResponse.json();
}

export async function invalidateTricks(token, tricksID) {
  const serverResponse = await fetch(
    BACK_URL + `/tricks/invalidate/${tricksID}`,
    {
      method: "PUT",
      headers: { ...headers, Authorization: token },
    }
  );
  return serverResponse.json();
}

export async function createSpot(token, { name, lon, lat, category }) {
  const serverResponse = await fetch(BACK_URL + `/spot`, {
    method: "POST",
    headers: { ...headers, Authorization: token },
    body: JSON.stringify({ name, lon, lat, category }),
  });
  return serverResponse.json();
}

export async function getSpotInfo(token, spotID) {
  const serverResponse = await fetch(BACK_URL + `/spot/${spotID}`, {
    method: "GET",
    headers: { ...headers, Authorization: token },
  });
  return serverResponse.json();
}

export async function getNearestSpot(token, lon, lat, limit = 50) {
  const serverResponse = await fetch(
    BACK_URL + `/spot/loc/${lon}/${lat}/${limit}`,
    {
      method: "GET",
      headers: { ...headers, Authorization: token },
    }
  );
  return serverResponse.json();
}

export async function postVideo(token, { uri, tricksIdList, spotID }) {
  const formData = new FormData();

  formData.append("videoFile", {
    name: "skateVideo.mp4",
    type: "video/mp4",
    uri,
  });

  for (let tricksID of tricksIdList) {
    formData.append("tricks", tricksID);
  }
  formData.append("spot", tricksID);
  const serverResponse = await fetch(BACK_URL + `/video`, {
    method: "POST",
    headers: { ...headers, Authorization: token },
    body: formData,
  });
  return serverResponse.json();
}

export async function upvoteVideo(token, videoID) {
  const serverResponse = await fetch(BACK_URL + `/video/upvote/${videoID}`, {
    method: "PUT",
    headers: { ...headers, Authorization: token },
  });
  return serverResponse.json();
}

export async function unvoteVideo(token, videoID) {
  const serverResponse = await fetch(BACK_URL + `/video/unvote/${videoID}`, {
    method: "PUT",
    headers: { ...headers, Authorization: token },
  });
  return serverResponse.json();
}

export async function deleteVideo(token, videoID) {
  const serverResponse = await fetch(BACK_URL + `/video/delete/${videoID}`, {
    method: "PUT",
    headers: { ...headers, Authorization: token },
  });
  return serverResponse.json();
}

export async function createCrew(token, name) {
  const serverResponse = await fetch(BACK_URL + `/crew/create`, {
    method: "POST",
    headers: { ...headers, Authorization: token },
    body: JSON.stringify({
      name,
    }),
  });
  return serverResponse.json();
}

export async function getCrewInfo(token, crewID) {
  const serverResponse = await fetch(BACK_URL + `/crew/${crewID}`, {
    method: "GET",
    headers: { ...headers, Authorization: token },
  });
  return serverResponse.json();
}

export async function joinCrew(token, crewID) {
  const serverResponse = await fetch(BACK_URL + `/crew/join/${crewID}`, {
    method: "PUT",
    headers: { ...headers, Authorization: token },
  });
  return serverResponse.json();
}

export async function leaveCrew(token) {
  const serverResponse = await fetch(BACK_URL + `/crew/leave`, {
    method: "PUT",
    headers: { ...headers, Authorization: token },
  });
  return serverResponse.json();
}
