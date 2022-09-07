const request = require("supertest");
const server = require('../index');
const jwt_decode = require("jwt-decode");
const jwt = require('jsonwebtoken');


beforeEach( async () => {
  jest.setTimeout(120000);
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

  it("should successfully adds a new user to the database", async (done) => {
    new_user = {
      userName: 'user_test_0',
      email: 'user_test_0@gmail.com',
      hashedPassword: 'user_test_0_password'
    }
    await request(server).post("/api/v1/user/newuser").send(new_user).expect(201 || 409).toBeTruthy;
    done();
  })

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

describe("test the login route", () => {
  
  it("should return an error because user is not yet registred ", (done) => {
    user = {
      email: 'not_found@gmail.com',
      password: 'user_not_found'
    }
    request(server).post("/api/v1/auth/login").send(user).then(response => {
      expect(response.status).toEqual(400);
      done();
    })
  })
  it("should return an error because password is invalid", (done) => {
    user = {
      email: 'user_test_0@gmail.com',
      password: 'wrong_password'
    }
    request(server).post("/api/v1/auth/login").send(user).then(response => {
      expect(response.status).toEqual(500);
      done();
    })
  })

  it("should return an error because email is invalid", (done) => {
    user = {
      email: 'fake_user@gmail.com',
      password: 'user_test_0_password'
    }
    request(server).post("/api/v1/auth/login").send(user).then(response => {
      expect(response.status).toEqual(400);
      done();
    })
  })

  it("should sucessfully give acess to valid user", async (done) => {
    user = {
      email: 'user_test_0@gmail.com',
      hashedPassword: 'user_test_0_password'
    }
    const response = await request(server).post("/api/v1/auth/login").send(user)
    expect(response.body.message).toEqual("Logged in successfully");
    done();
  })

  it("should sucessfully give a token to valid user", async (done) => {
    user = {
      email: 'user_test_0@gmail.com',
      hashedPassword: 'user_test_0_password'
    }
    const response = await request(server).post("/api/v1/auth/login").send(user)
    expect(response.body.token).toBeTruthy();
    done();
  })

  it("should sucessfully give a token that contains required data", async (done) => {
    user = {
      userName: 'user_test_0',
      email: 'user_test_0@gmail.com',
      hashedPassword: 'user_test_0_password'
    }
    const response = await request(server).post("/api/v1/auth/login").send(user)
    const token = response.body.token
    const decoded = jwt_decode(token);
    expect(decoded["Username"]).toEqual("user_test_0");
    expect(decoded["imagePath"]).toEqual("");
    expect(decoded["is"]).not.toBe("");
    done();
  })

  it("should verify that id given to user in token is valid", async (done) => {
    user = {
      userName: 'user_test_0',
      email: 'user_test_0@gmail.com',
      hashedPassword: 'user_test_0_password'
    }
    const response = await request(server).post("/api/v1/auth/login").send(user)
    const token = response.body.token
    const decoded = jwt_decode(token);
    const id = decoded["id"];
    const response_2 = await request(server).get("/api/v1/user/" + id)
    expect(id).toEqual(response_2.body.id);
    done();
  })

})
