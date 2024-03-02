export default function netrc(plop) {
  plop.setGenerator("netrc", {
    description: "add netrc file from environment",
    prompts: [
      {
        type: "input",
        name: "email",
        message: "Email Adress for Storyblok user",
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
        templateFile: "helpers/netrc.hbs",
      },
    ],
  });
}
