# Advanced Medium API

#### Contents

- [Overview](#1-overview)
- [API Details](#2-api-details)
  - [Medium feed in JSON](#21-medium-feed-in-json)
  - [Medium Advanced Data](#22-medium-advanced-data)

## 1. Overview

Advanced [Medium](https://medium.com) API is a JSON-based API. All requests must be secure, i.e. `https`, not `http`.
This API aims to retrieve the missing parts of Medium's [Rss feed](https://help.medium.com/hc/en-us/articles/214874118-Using-RSS-feeds-of-profiles-publications-and-topics)

## 2. API Details

Users could be able to get 4 types of responses from this API. `base URL` of the API is [https://advanced-medium-api.herokuapp.com/](https://advanced-medium-api.herokuapp.com/).

### 2.1 Medium feed in JSON

endpoint: `/medium/user/:userId`

Medium gives public access to get [RSS feed](https://help.medium.com/hc/en-us/articles/214874118-Using-RSS-feeds-of-profiles-publications-and-topics) for the last 10 medium posts. This end point gives the direct JSON conversion of that RSS Feed.

[Sample JSON](./docs/NormalData.json)

#### description for the `feed` object's key values

|   Key   |          description          |
| :-----: | :---------------------------: |
|  `url`  |     url of medium profile     |
| `title` |      title of your feed       |
| `link`  | hyperlink to the feed profile |

### 2.2 Medium Advanced Data

endpoint: `/advanced/user/:userId`

This response contains the above Medium feed in JSON and moreover it contains the missing part of the Medium feed such as `clapCount`, `voterCount`, `responseCount`, `readingTime`.

[Sample JSON](./docs/NormalAdvancedData.json)
