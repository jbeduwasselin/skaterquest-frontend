import { BACK_URL, headers } from "./config";

//User Routes
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

export async function changeUserAvatar(token, uri) {
  const formData = new FormData();

  formData.append("photoFile", {
    name: "userPhoto.jpg",
    type: "image/jpg",
    uri,
  });
  const serverResponse = await fetch(BACK_URL + `/user/avatar`, {
    method: "POST",
    headers: { ...headers, Authorization: token },
    body: formData,
  });
  return serverResponse.json();
}

export async function searchUser(token, searchUser) {
  const serverResponse = await fetch(BACK_URL + `/user/search/${searchUser}`, {
    method: "GET",
    headers: { ...headers, Authorization: token },
  });
  return serverResponse.json();
}

//Spot routes

export async function createSpot(token, name, lon, lat, category) {
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

export async function addPictureToSpot(token, uri, spotID) {
  const formData = new FormData();

  formData.append("photoFile", {
    name: "userPhoto.jpg",
    type: "image/jpeg",
    uri,
  });
  const serverResponse = await fetch(BACK_URL + `/spot/picture/${spotID}`, {
    method: "POST",
    headers: { Authorization: token },
    body: formData,
  });
  return serverResponse.json();
}

//Video

export async function postVideo(token, uri, tricksList, spotID) {
  const formData = new FormData();

  formData.append("videoFile", {
    name: "skateVideo.mp4",
    type: "video/mp4",
    uri,
  });
  for (let tricks of tricksList) {
    formData.append("tricks", tricks);
  }
  formData.append("spot", spotID);
  const serverResponse = await fetch(BACK_URL + `/video`, {
    method: "POST",
    headers: { Authorization: token },
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

//Crew Routes

export async function getCrewInfo(token, crewID) {
  const serverResponse = await fetch(BACK_URL + `/crew/${crewID}`, {
    method: "GET",
    headers: { ...headers, Authorization: token },
  });
  return serverResponse.json();
}

export async function createCrew(token, name) {
  const serverResponse = await fetch(BACK_URL + `/crew/`, {
    method: "POST",
    headers: { ...headers, Authorization: token },
    body: JSON.stringify({
      name,
    }),
  });
  return serverResponse.json();
}

export async function promoteToCrewAdmin(token, targetUserID) {
  const serverResponse = await fetch(
    BACK_URL + `/crew/promote/${targetUserID}`,
    {
      method: "PUT",
      headers: { ...headers, Authorization: token },
    }
  );
  return serverResponse.json();
}

export async function removeFromCrewAdmin(token, targetUserID) {
  const serverResponse = await fetch(
    BACK_URL + `/crew/demote/${targetUserID}`,
    {
      method: "PUT",
      headers: { ...headers, Authorization: token },
    }
  );
  return serverResponse.json();
}

export async function addUserToCrew(token, targetUserID) {
  const serverResponse = await fetch(BACK_URL + `/crew/add/${targetUserID}`, {
    method: "PUT",
    headers: { ...headers, Authorization: token },
  });
  return serverResponse.json();
}

export async function removeUserFromCrew(token, targetUserID) {
  const serverResponse = await fetch(
    BACK_URL + `/crew/remove/${targetUserID}`,
    {
      method: "PUT",
      headers: { ...headers, Authorization: token },
    }
  );
  return serverResponse.json();
}

export async function leaveCrew(token) {
  const serverResponse = await fetch(BACK_URL + `/crew/leave`, {
    method: "PUT",
    headers: { ...headers, Authorization: token },
  });
  return serverResponse.json();
}
