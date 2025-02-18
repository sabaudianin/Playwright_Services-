import { expect } from "@playwright/test";
import { Common } from "./Common.mjs";
// export const injectAuthService = async ({ request }, use) =>
//   await use(new Auth(request));

// class Auth {
//   constructor(request) {
//     this.request = request;
//   }

//   async login({ email, password }) {
//     const response = await this.request.post(
//       "http://localhost:5500/api/users/login",
//       {
//         data: {
//           user: {
//             email,
//             password,
//           },
//         },
//       }
//     );

//     expect(response.status()).toBe(200);
//     return response.json();
//   }
// }

//z clasa Common
export const injectAuthService = async ({ request }, use) =>
  await use(new Auth(request));

class Auth extends Common {
  constructor(request) {
    super(request);
  }

  async login({ email, password }) {
    const data = { user: { email, password } };
    const response = await this.requestToEndpoint("/api/users/login", {
      data,
      method: "post",
      status: 200,
    });
    return response.json();
  }
}
