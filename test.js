const request = require("supertest");
const server = require("./main");

describe("GET /api/posts testing", function () {
  after(function (done) {
    server.close(done());
  });
  it("responds 400 no tag", function (done) {
    request(server)
      .get("/api/posts")
      .expect(400, { error: "Tags parameter is required" })
      .expect(done());
  });
  it("responds 400 invalid tag", function (done) {
    request(server).get("/api/posts/chicken").expect(400, done());
  });
  it("responds 200 tag exists (tech)", function (done) {
    request(server).get("/api/posts/tech").expect(200, done());
  });
  it("responds 200 tags exists (tech,history)", function (done) {
    request(server).get("/api/posts/tech,history").expect(200, done());
  });
  it("responds 200 sort exists (likes)", function (done) {
    request(server).get("/api/posts/tech,history/likes").expect(200, done());
  });
  it("responds 200 sort by descending order", function (done) {
    request(server)
      .get("/api/posts/tech,history/likes/desc")
      .expect(200, done());
  });
  it("responds 400 sort doesnt exist", function (done) {
    request(server).get("/api/posts/tech,history/authorid").expect(400, done());
  });

  it("responds 400 direction doesnt exist", function (done) {
    request(server)
      .get("/api/posts/tech,history/authorid/null")
      .expect(400, done());
  });
  it("responds 404 route is incorrect", function (done) {
    request(server)
      .get("/api/post/tech")
      .expect(404, done());
  });
});
