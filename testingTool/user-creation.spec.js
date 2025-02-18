import { test as base } from "@playwright/test";
import { injectUserService } from "../e2e/services/User.mjs";
import { injectAuthService } from "../e2e/services/Auth.mjs";
import { injectCommentService } from "../e2e/services/Comments.mjs";

const test = base.extend({
  authService: injectAuthService,
  commentService: injectCommentService,
  userService: injectUserService,
});

const CONFIGURATION = {
  email: "example@gmail.com",
  password: "secret",
  username: "example",
  comment: "First Comment",
};

test.describe("User creation", async () => {
  test("create user with added comment", async ({
    userService,
    authService,
    commentService,
  }) => {
    const { user: createdUser } = await userService.create({
      email: CONFIGURATION.email,
      password: CONFIGURATION.password,
      username: CONFIGURATION.username,
    });

    const { user: loggedUser } = await authService.login({
      email: CONFIGURATION.email,
      password: CONFIGURATION.password,
    });
    console.log("Login response:", loggedUser);

    await commentService.create({
      articleUrl:
        "the-mastery-of-lightsaber-combat-insights-from-luke-skywalker",
      articleId: 1,
      authorId: createdUser.id,
      comment: CONFIGURATION.comment,
      token: loggedUser.token,
    });

    console.log({
      email: CONFIGURATION.email,
      password: CONFIGURATION.password,
      username: CONFIGURATION.username,
      comment: CONFIGURATION.comment,
      token: loggedUser.token,
    });
  });
});
