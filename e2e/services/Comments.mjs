import { expect } from "@playwright/test";
import { Common } from "./Common.mjs";

// export const injectCommentService = async ({ request }, use) =>
//   await use(new Comment(request));

// class Comment {
//   constructor(request) {
//     this.request = request;
//   }

//   async create({ articleUrl, articleId, authorId, comment, token }) {
//     const response = await this.request.post(
//       `http://localhost:5500/api/articles/${articleUrl}/comments`,
//       {
//         headers: {
//           Authorization: `Token ${token}`,
//         },
//         data: {
//           articleId,
//           authorId,
//           comment,
//         },
//       }
//     );

//     expect(response.status()).toBe(200);
//     return response.json();
//   }
// }

export const injectCommentService = async ({ request }, use) =>
  await use(new Comment(request));

class Comment extends Common {
  constructor(request) {
    super(request);
  }

  async create({ articleUrl, articleId, authorId, comment, token }) {
    const data = { articleId, authorId, comment };

    const response = await this.requestToEndpoint(
      `/api/articles/${articleUrl}/comments`,
      {
        data,
        method: "post",
        status: 200,
        token,
      }
    );

    return response.json();
  }
}
