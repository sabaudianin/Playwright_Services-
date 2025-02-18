import { expect } from "@playwright/test";

export const injectAuthService = async ({ request }, use) =>
  await use(new Auth(request));

class Auth {
  constructor(request) {
    this.request = request;
  }

  async login({ email, password }) {
    const response = await this.request.post(
      "http://localhost:5500/api/users/login",
      {
        data: {
          user: {
            email,
            password,
          },
        },
      }
    );

    expect(response.status()).toBe(200);
    return response.json();
  }
}
