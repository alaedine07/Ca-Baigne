// const { expect } = require("chai");
const request = require("supertest");
const server = require('../index');

beforeEach( async () => {
  jest.setTimeout(60000);
  await server.start;
});

afterEach( async () => {
  await server.close;
});
  
describe("Check that api is working", () => {
  it("should return 200 response", async () => {
    await request(server).get("/").expect(200);
  });
});

describe("test the user route", () => {
  
  it("adds a new user to the database", async () => {
    new_user = {
      userName: 'user_test_0',
      email: 'user_test_0@gmail.com',
      hashedPassword: 'user_test_0_password'
    }
    await request(server).post("/api/v1/user/newuser").send(new_user).expect(201);
  })

  it("should get all the users from database", async () => {
    await request(server).get("/api/v1/user/allusers").expect(200);
  });
  
  it("should return an error because the user already exists", (done) => {
    new_user = {
      userName: 'user_test_0',
      email: 'user_test_0@gmail.com',
      hashedPassword: 'user_test_0_password'
    }
    request(server).post("/api/v1/user/newuser").send(new_user).then(response => {
      expect(response.error.text).toEqual("User Already exists");
      done();
    })
  })
  
  it("should return an error because one the key fields is missing", (done) => {
    new_user = {
      email: 'user_test_0@gmail.com',
      hashedPassword: 'user_test_0_password'
    }
    request(server).post("/api/v1/user/newuser").send(new_user).then(response => {
      expect(response.status).toEqual(500);
      done();
    })
  })
  
  it("should return an error because password is an empty string", (done) => {
    new_user = {
      userName: 'user_',
      email: 'user_e@gmail.com',
      hashedPassword: ''
    }
    request(server).post("/api/v1/user/newuser").send(new_user).then(response => {
      expect(response.status).toEqual(500);
      done();
    })
  })

});
