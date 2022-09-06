const request = require("supertest");
const server = require('../index');

beforeEach( async () => {
    await server.start;
  });

afterEach(async () => {
    await server.close;
  });


describe("Check that api is working", () => {
    it("return 200 response", async () => {
      await request(server).get("/").expect(200);
      await new Promise(process.nextTick);
    });
});
