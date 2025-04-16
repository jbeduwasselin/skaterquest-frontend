import {
  addUserToCrew,
  createCrew,
  createSpot,
  extendTokenRequest,
  getCrewInfo,
  getNearestSpot,
  getSpotInfo,
  leaveCrew,
  promoteToCrewAdmin,
  removeFromCrewAdmin,
  signInRequest,
  signUpRequest,
} from "./request";

const validToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRleHQyQHRlc3QudGVzdCIsInVJRCI6IkV3TkdTWWlxb2Fwcm9RSEpTTGdONU5yR0tWS2haNmczIiwiaWF0IjoxNzQ0NzkxNTM5LCJleHAiOjE3NDQ4Nzc5Mzl9.rhIQniZffbCi33OM-LeSWJ3Zs-uDEB-nbfP3eDpVFvQ";

const dummyEmail = "text0@test.test";
const dummyPassword = "test";

const dummySpot = {
  name: "test",
  lon: Math.random() * 360 - 180,
  lat: Math.random() * 180 - 90,
  category: ["SWITCH"],
};

it("Sign In", async () => {
  const { result } = await signInRequest(dummyEmail, dummyPassword);
  expect(result).toBe(true);
});

it("Sign In : no user", async () => {
  const { result } = await signInRequest("not a mail", dummyPassword);
  expect(result).toBe(false);
});

it("Sign In : invalid Password", async () => {
  const { result } = await signInRequest(dummyEmail, "not a password");
  expect(result).toBe(false);
});

it("Sign Up and SignIn", async () => {
  const newUserEmail = "newuser@newuser.f" + Math.random().toString();
  const { result: ok1 } = await signUpRequest("newUser", newUserEmail, "pass");
  expect(ok1).toBe(true);
  const { result: ok2 } = await signInRequest(newUserEmail, "pass");
  expect(ok2).toBe(true);
});

it("Sign Up allready existing email", async () => {
  const { result } = await signUpRequest(dummyEmail, dummyPassword, "name");
  expect(result).toBe(false);
});

it("Sign Up invalid email", async () => {
  const { result } = await signUpRequest("not a email", "pass", "name");
  expect(result).toBe(false);
});

it("Token extension request", async () => {
  const { result } = await extendTokenRequest(validToken);
  expect(result).toBe(true);
});

it("Create and query a spot", async () => {
  const {
    result: ok1,
    data: { _id: spotID },
  } = await createSpot(validToken, dummySpot);
  expect(ok1).toBe(true);
  const { result: ok2, data } = await getSpotInfo(validToken, spotID);
  expect(ok2).toBe(true);
  expect(data.name).toBe(dummySpot.name);
});

it("Get all spot near to 10, 10 ", async () => {
  const { result, data } = await getNearestSpot(validToken, 10, 10, 2);
  expect(result).toBe(true);
  expect(data.length).toBe(2);
});

//Posting video will have to be tested later when we'll be more confortable with
//the whole video thingy

it("Create a crew", async () => {
  //leave previous crew
  await leaveCrew(validToken);
  //create new crew
  const { result: ok2, data } = await createCrew(validToken, "crewName");
  expect(ok2).toBe(true);
  //get crew info and check if one member
  const { data: data2 } = await getCrewInfo(validToken, data._id);
  expect(data2.name).toBe("crewName");
  expect(data2.members.length).toBe(1);

  //leave crew and check if zero member
  const { result: ok3 } = await leaveCrew(validToken);
  const { data: data3 } = await getCrewInfo(validToken, data._id);
  expect(ok3).toBe(true);
  expect(data3.members.length).toBe(0);
});

it("Add and remove crew member", async () => {
  const dummyUID = "PJLX5s-eompnOTUts7vU3lyuEPrOFCbx";
  //leave previous crew
  await leaveCrew(validToken);
  //create new crew
  const {
    result: ok,
    data: { _id: crewID },
  } = await createCrew(validToken, "crewName");
  expect(ok).toBe(true);

  //add new user
  const { result: ok1 } = await addUserToCrew(validToken, dummyUID);
  expect(ok1).toBe(true);

  const {
    result: ok2,
    data: { members },
  } = await getCrewInfo(validToken, crewID);
  expect(ok2).toBe(true);
  expect(members.length).toBe(2);

  //promote to admin
  const { result: ok3 } = await promoteToCrewAdmin(validToken, dummyUID);
  expect(ok3).toBe(true);

  const {
    data: { admins },
  } = await getCrewInfo(validToken, crewID);
  expect(admins.includes(dummyUID)).toBe(true);

  //demote from admin
  const { result: ok4 } = await removeFromCrewAdmin(validToken, dummyUID);
  expect(ok4).toBe(true);

  const {
    data: { admins: admins2 },
  } = await getCrewInfo(validToken, crewID);
  expect(admins2.includes(dummyUID)).toBe(false);

  //remove from crew

  //demote from admin
  const { result: ok5 } = await removeFromCrewAdmin(validToken, dummyUID);
  expect(ok5).toBe(true);

  const {
    data: { admins: admins3, members: members2 },
  } = await getCrewInfo(validToken, crewID);
  expect(admins3.includes(dummyUID)).toBe(false);
  expect(members2.length).toBe(1);
});
