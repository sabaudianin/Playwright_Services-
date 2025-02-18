import { test as base } from "@playwright/test";
import { injectAuthService } from "../services/Auth.mjs";
import { injectCommentService } from "../services/Comments.mjs";
import { injectUserService } from "../services/User.mjs";

const test = base.extend({
  authService: injectAuthService,
  commentService: injectCommentService,
  userService: injectUserService,
});

test.describe("Comments test", () => {
  const user = {};

  test.beforeEach(async ({ authService, commentService, userService }) => {
    const id = Date.now();

    Object.assign(user, {
      email: `test-${id}@coderslab.pl`,
      password: "secret",
    });

    const { user: createdUser } = await userService.create({
      email: user.email,
      password: user.password,
      username: "e2eUser",
    });

    const { user: loggedUser } = await authService.login({
      email: user.email,
      password: user.password,
    });
    console.log("Login response:", loggedUser);

    await commentService.create({
      articleUrl:
        "the-mastery-of-lightsaber-combat-insights-from-luke-skywalker",
      articleId: 1,
      authorId: createdUser.id,
      comment: `This is a comment created in E2E test by User ${user.email}`,
      token: loggedUser.token,
    });
  });

  test("Login,go to article page,verify if comments are presents", () => {});
});
