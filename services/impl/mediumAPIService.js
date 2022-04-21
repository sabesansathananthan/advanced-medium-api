const axios = require("axios");
const sortAndSetCategory = require("../../utils/sortAndSetCategeory");
const scrapRequest = require("../../utils/request");

const mediumAPIService = async (userName, advanced) => {
  const mediumURL = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${userName}`;

  return await axios
    .get(mediumURL)
    .then(async (response) => {
      const {
        feed: { image, link },
        items,
      } = response.data || {};

      const posts = items.filter((item) => item.categories.length > 0);

      const tagArrays = posts.map((item) => {
        return item.categories;
      });

      const allTags = tagArrays.flat();

      const sortedTagsArray = sortAndSetCategory(allTags) || [];

      const tagArticle = [];
      let removedBlogs = posts;

      for (let i = 0; i < sortedTagsArray.length; ++i) {
        const blogsWithTag = removedBlogs.filter((blog) =>
          blog.categories.includes(sortedTagsArray[i])
        ); //filter

        removedBlogs = removedBlogs.filter(
          (blog) => blogsWithTag.indexOf(blog) === -1
        ); //exclude

        if (blogsWithTag.length > 0) {
          blogsWithTag.forEach((item) => {
            item.tag = sortedTagsArray[i];
            tagArticle.push(item);
          });
        }
      }

      const filteredTagArrays = tagArticle.map((item) => {
        return item.tag;
      });

      const filteredSortedTagsArray =
        sortAndSetCategory(filteredTagArrays) || [];

      tagArticle.forEach((item) => {
        item.tagNo = filteredSortedTagsArray.indexOf(item.tag) + 1;
        item.avatar = image; // push avatar inside the json
        item.profileLink = link; // push profile link inside the JSON
      });

      const tagArticleWithRow = [];

      await Promise.all(
        tagArticle.map(async (item, i) => {
          const row = Math.floor(i / 3);
          const element = item.guid.split("/");
          const postId = element[element.length - 1];
          const postLink = item.guid;

          if (advanced === true) {
            const scrappedJson = await scrapRequest(postLink, postId);

            let postContent = {
              author: item.author,
              avatar: item.avatar,
              content: item.content,
              link: item.guid,
              postImage: item.thumbnail,
              profileLink: item.profileLink,
              pubDate: item.pubDate,
              tag: item.tag,
              tagOrder: item.tagNo,
              title: item.title,
              clapCount: scrappedJson.clapCount,
              voterCount: scrappedJson.voterCount,
              responseCount: scrappedJson.responseCount,
              readingTime: scrappedJson.readingTime,
            };
            if (!tagArticleWithRow[row]) tagArticleWithRow[row] = [];
            tagArticleWithRow[row].push(postContent);
          } else {
            let postContent = {
              author: item.author,
              avatar: item.avatar,
              content: item.content,
              link: item.guid,
              postImage: item.thumbnail,
              profileLink: item.profileLink,
              pubDate: item.pubDate,
              tag: item.tag,
              tagOrder: item.tagNo,
              title: item.title,
            };
            if (!tagArticleWithRow[row]) tagArticleWithRow[row] = [];
            tagArticleWithRow[row].push(postContent);
          }
        })
      );

      return await tagArticleWithRow;
    })
    .catch((err) => console.log(err));
};

module.exports = mediumAPIService;
