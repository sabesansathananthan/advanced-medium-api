const request = require("request");
const cheerio = require("cheerio");

const scrapRequest = async (postLink, postId) => {
  return await new Promise((resolve, reject) => {
    request(postLink, async (error, response, body) => {
      if (error) {
        console.log(error);
        reject(error);
      } else if (body) {
        var $ = cheerio.load(body, { xmlMode: true });
        try {
          const scriptTagElements = $("script")
            .map((idx, el) => $(el).html())
            .toArray();

          const findState = scriptTagElements.find((element) => {
            if (element.includes("window.__APOLLO_STATE__")) {
              return true;
            }
          });
          const apolloState = findState.replace(
            "window.__APOLLO_STATE__ = ",
            ""
          );
          const jsonOfApolloState = JSON.parse(
            apolloState.replace(/&quot;/g, '"')
          );
          const clapCount = await jsonOfApolloState[`Post:${postId}`].clapCount;
          const responseCount = await jsonOfApolloState[`Post:${postId}`]
            .postResponses.count;
          const readingTime = await jsonOfApolloState[`Post:${postId}`]
            .readingTime;
          const voterCount = await jsonOfApolloState[`Post:${postId}`]
            .voterCount;
          const scrapJson = {
            clapCount: clapCount,
            responseCount: responseCount,
            voterCount: voterCount,
            readingTime: Math.round(readingTime),
          };

          resolve(scrapJson);
        } catch (e) {
          console.log("Error parsing profile", e);
        }
      } else {
        console.log("No body");
      }
    });
  });
};
module.exports = scrapRequest;
