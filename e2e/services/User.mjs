import { expect } from "@playwright/test";

export const injectUserService = async ({ request }, use) =>
  await use(new User(request));

class User {
  constructor(request) {
    this.request = request;
  }

  async create({ email, username, password }) {
    const response = await this.request.post(
      "http://localhost:5500/api/users",
      {
        data: {
          user: {
            email,
            username,
            password,
          },
        },
      }
    );

    expect(response.status()).toBe(201);
    return response.json();
  }
}
