export default function netrc(plop) {
  plop.setGenerator("netrc", {
    description: "add netrc file from environment",
    prompts: [
      {
        type: "input",
        name: "email",
        message: "Email Address for Storyblok user",
      },
      {
        type: "input",
        name: "oauthToken",
        message: "Next Storyblok Oauth Token",
      },
      {
        type: "input",
        name: "region",
        message: "Region your space uses",
      },
    ],
    actions: [
      {
        type: "add",
        path: `${process.env.HOME}/.netrc`,
        skipIfExists: true,
        templateFile: "resources/netrc.hbs",
      },
    ],
  });
  plop.setGenerator("env", {
    description: "add .env.local to project",
    prompts: [
      {
        type: "input",
        name: "apiToken",
        message: "Next Storyblok API Token",
      },
      {
        type: "input",
        name: "oauthToken",
        message: "Next Storyblok Oauth Token",
      },
      {
        type: "input",
        name: "spaceId",
        message: "Next Storyblok Space ID",
      },
    ],
    actions: [
      {
        type: "add",
        path: `.env.local`,
        templateFile: "resources/env.hbs",
      },
    ],
  });
}
