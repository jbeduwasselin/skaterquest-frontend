import {
  createCrew,
  createSpot,
  extendTokenRequest,
  getCrewInfo,
  getNearestSpot,
  getSpotInfo,
  leaveCrew,
  signInRequest,
  signUpRequest,
} from "./request";

const validToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxvZGFoYmxhYkBhbWxmcG1sLmZwYWlibmwiLCJ1SUQiOiJINWRhQ212cFFZMWI5MHVBUmVYalZ0bWZnVHZqRklvOSIsImlhdCI6MTc0NDY0NzQ0NywiZXhwIjoxNzQ0NzMzODQ3fQ.bpDOSSHNe2okTCccoi4fxDecbWNKY9yotONm8N1QsJY";

const dummyEmail = "text0@test.test";
const dummyPassword = "test";

const dummySpot = {
  name: "test",
  lon: 5,
  lat: 5,
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
  console.error(result, data);
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
