# Getting Started

1. Clone our Starter space by visiting https://app.storyblok.com/#!/build/242426.
2. Clone `energyui-storyblok-starter`-Repo by clicking on "Use this template"
   -> "Create new repository".
3. Go to Vercel and click on "Add New..." -> "Project". Import your cloned
   Github Repository. Unfold "Environment Variables" and add the following:
   - `NPM_RC` with `//<your package registry>:_authToken=<your npm token>`
   - `STORYBLOK_API_TOKEN` with a preview token from the cloned Stroyblok
      Space above.
4. Click on "Deploy"
5. Configure your freshly deployt App as the default preview URL in Storyblok
   ("Settings" -> "Visual Editor"). Type in the base URL of your deployment and
   add `/preview/` as the path, e.g.
   `https://energyui-storyblok-starter.vercel.app/preview/`.

See ["Local Development"-Section](#local-development) below for the necessary steps to start developing locally with rapid feedback cycles.

You can use this button to deploy the EnergyUI@Storyblok starter repo on Vercel. Feel free to change the repository URL for quicker deployment of the clone repository:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftaktsoft%2Fenergyui-storyblok-starter&env=NPM_RC,STORYBLOK_API_TOKEN&envDescription=NPM_RC%20must%20contain%20at%20least%20%60%2F%2Fgit.taktsoft.com%2Fapi%2Fv4%2Fprojects%2F378%2Fpackages%2Fnpm%2F%3A_authToken%3D%3Cyour%20npm%20token%3E%60)

# Local Development

## Dependencies

- [`mkcert`](https://github.com/FiloSottile/mkcert#installation)
- `npm` (unless you opt for devcontainer)

## Setup

### Docker/Devcontainer

You will need the [devcontainer-cli](https://github.com/devcontainers/cli#npm-install)
or the [externsion for vscode](https://code.visualstudio.com/docs/devcontainers/containers#_installation).

You might also need to manually install BuildKit capabilities for Docker:

- https://docs.docker.com/build/buildkit/
- https://docs.docker.com/engine/reference/commandline/buildx_build/

1. Copy `.env.local.sample` to `.env.local`. Replace all placeholders with your
   specific configuration and adapt to your needs.
2. If your design system npm package is published on a protected registry,
   please configure the auth token in your `~/.npmrc`. This file will be mounted
   as a secret onto the devcontainer filesystem.
3. On your host, run: `mkcert -cert-file .devcontainer/traefik/certificate.pem -key-file .devcontainer/traefik/certificate-key.pem localhost energyui.localhost`
4. `devcontainer up --workspace-folder .` or in vscode `Dev Containers: Reopen in Container`
5. `devcontainer exec --workspace-folder . npm run dev` or run `npm run dev` in a new vscode terminal.
6. Run `storyblok login` for being able to use the storyblok-cli.

The application is now available on https://energyui.localhost/.

### Locally

1. Copy `.env.local.sample` to `.env.local`. Replace all placeholders with your
   specific configuration and adapt to your needs.
2. If your design system npm package is published on a protected registry,
   please configure the auth token in your `~/.npmrc`.
2. Run a Next.js server process locally:
   1. `npm i`
   2. `npm run dev`
3. Setup a local proxy server for ssl: (in a new terminal)
   1. `mkcert localhost`
   2. `npx local-ssl-proxy --source 3010 --target 3000 --cert localhost.pem --key localhost-key.pem`
4. In storyblok change the preview URL to "Dev".
5. Run `storyblok login` for being able to use the storyblok-cli.

# Working with the content schema

## Typescript Support

Generate ts types according to the content schema by running
`STORYBLOK_SPACE_ID=<your-space-id> npm run generate-content-types`.

## Migrations

When changing the content schema we recommend sticking to [Storyblok's Best
Practices](https://www.storyblok.com/tp/storyblok-cli-best-practices#modify-blok-structure).
