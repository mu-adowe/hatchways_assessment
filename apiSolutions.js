const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

//function that fetches data from api on request
async function getTag(tag) {
  const response = await fetch(
    "http://api.hatchways.io/assessment/blog/posts?tag=" + tag.toLowerCase()
  );
  const data = await response.json();
  if (data.posts.length == 0) {
    //logs to console if tag is invalid
    console.log({ error: `${tag} tag parameter is invalid` });
  }
  return data.posts;
}

async function handler(tag) {
  let fetchResponse;
  let finalArr = [];
  let tagArray;
  let multiData = [];
  // checks if its multiple tags
  if (tag.includes(",")) {
    tagArray = tag.split(","); // splits tag into array to search multiple tags on the api
    //loop array for fetch
    tagArray.forEach((tg) => multiData.push(getTag(tg)));

    fetchResponse = await Promise.allSettled(multiData);

    fetchResponse.status === "rejected"
      ? console.log(fetchResponse.reason)
      : ((fetchResponse = fetchResponse.map((t) => t.value)),
        //combines response array of objects into one array of objects
        fetchResponse.forEach((arr) => finalArr.push(...arr)));
    return finalArr;
  }
  return await getTag(tag);
}

router.route("/").get((req, res) => {
  // checks if tag is not present
  return res.status(400).send({ error: "Tags parameter is required" });
});

router.route("/:tags/:sortBy?/:direction?").get(async (req, res) => {
  const tags = req.params.tags;
  const sortBy = req.params.sortBy;
  const direction = req.params.direction;
  let result;
  const acceptedSortByFields = ["id", "reads", "likes", "popularity"];

  try {
    if (!tags)
      return res.status(400).send({ error: "The tag parameter is invalid" });

    result = await handler(tags);
    // checks if only the first tag is invalid and throws error
    if (!result.length)
      return res
        .status(400)
        .send({ error: `${tags} tag parameter is invalid` });

    //filters duplicates from result vairable
    result = result.filter(
      (value, index, self) => index === self.findIndex((t) => t.id == value.id) //|| value.hasOwnProperty("error")
    );

    //checks if no sortby exists
    if (!sortBy) {
      //default sort by id
      result.sort((a, b) => {
        return a.id - b.id;
      });
      return res.status(200).send({ posts: result });
    }

    //checks if sortby has a valid property name
    if (acceptedSortByFields.includes(sortBy.toLowerCase())) {
      //sorts by property name
      result.sort((a, b) => {
        return a[sortBy.toLowerCase()] - b[sortBy.toLowerCase()];
      });
    } else {
      return res.status(400).send({ error: "sortBy parameter is invalid" });
    }

    if (!direction || direction.toLowerCase() == "asc") {
      return res.status(200).send({ posts: result });
    }
    if (direction.toLowerCase() == "desc") {
      const rev = result.reverse();
      return res.status(200).send({ posts: rev });
    }
    return res.status(400).send({ error: "direction parameter is invalid" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
