import { expect } from "@playwright/test";
import { Common } from "./Common.mjs";

// export const injectUserService = async ({ request }, use) =>
//   await use(new User(request));

// class User {
//   constructor(request) {
//     this.request = request;
//   }

//   async create({ email, username, password }) {
//     const response = await this.request.post(
//       "http://localhost:5500/api/users",
//       {
//         data: {
//           user: {
//             email,
//             username,
//             password,
//           },
//         },
//       }
//     );

//     expect(response.status()).toBe(201);
//     return response.json();
//   }
// }

export const injectUserService = async ({ request }, use) =>
  await use(new User(request));

class User extends Common {
  constructor(request) {
    super(request);
  }

  async create({ email, username, password }) {
    const data = { user: { email, username, password } };
    const response = await this.requestToEndpoint("/api/users", {
      data,
      method: "post",
      status: 201,
    });

    return response.json();
  }
}
