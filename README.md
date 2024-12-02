# kickstartDS Storyblok starter <!-- omit in toc -->

This project provides a starter template for building marketing websites using Storyblok and a Design System backed by [**kickstartDS**](https://www.kickstartDS.com). It includes pre-configured components, content schema, and best practices to streamline development and ensure consistency.

You can learn more about it on our dedicated landing page for these starters:<br>
https://about.design-system.agency/

[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE-MIT)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue)](LICENSE-APACHE)

## Quickstart <!-- omit in toc -->

### Netlify Deploy <!-- omit in toc -->

The Netlify Deploy button provides an easy and convenient way to deploy your project to Netlify. By clicking the button, you can quickly set up your project on Netlify without manually configuring the deployment settings. It automates the process and ensures that your project is deployed correctly with just a few clicks. This saves time and effort, especially for users who are new to Netlify or want a streamlined deployment process.

To start, you'll need some variables defined [here](#).

// TODO use correct URL in premium starter

// TODO mention next local steps still needed (like `npm run generate-content-types`)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/kickstartDS/storyblok-starter)

## Table of Contents <!-- omit in toc -->

- [Features](#features)
- [Deploy your own](#deploy-your-own)
  - [Requirements](#requirements)
  - [Environment Variables](#environment-variables)
  - [Manually](#manually)
    - [Setup](#setup)
    - [Start locally](#start-locally)
    - [Host on Netlify](#host-on-netlify)
    - [Netlify Webhook on Storyblok change](#netlify-webhook-on-storyblok-change)
    - [Storyblok hosted preview](#storyblok-hosted-preview)
- [Local Development](#local-development)
  - [Setup](#setup-1)
    - [TODO](#todo)
  - [Adding initial content](#adding-initial-content)
    - [Root page (your index page)](#root-page-your-index-page)
    - [Global Settings (header, footer, seo)](#global-settings-header-footer-seo)
    - [404](#404)
  - [Creating branded component and preset previews](#creating-branded-component-and-preset-previews)
- [Working with the content schema](#working-with-the-content-schema)
  - [Typescript Support](#typescript-support)
  - [Migrations](#migrations)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## Features

This CMS Starter comes prepared with a nice list of features out-of-the-box:

- **Easy theming** for brand compliance
- **Flexible landing pages**, build up freely from sections
- **Perfect Lighthouse scores** for Performance, A11y, Seo and Best Practices
- **Structured blog** / news posts, and blog / news overview
- Editable, **global header and footer**
- **Basic and free:** **10** ready-to-use components with a total of **30** variants
- **Premium:** **14** ready-to-use components with a total of **43** variants
- **Layout components** for sections (with **9** variants) and sliders (with **3** variants)
- **Presets for all components**, including preview screenshots
- **Global element support**, selectively manage content in a central place (e.g., blog authors)
- **Editable 404 pages**, add any content you like yourself
- **Icon picker** for custom icon sprite, as a Storyblok field plugin
- **Image optimization** (blurhashes, responsive image resizing, Design System token connected)
- **Content alt-tag support**, with fallback to general asset alt if not defined
- **Optimized font loading**, with granular control over swapping behaviour
- **High performance option**, to render completely without React + Next.js ("fully static")
- **Sitemaps + robots.txt** automatically generated
- **Built-in** page, settings, and Seo **templates**
- Easy **custom template support** (e.g., structured page types like products, news, etc)
- **Fully automated initial setup**, < 30 minutes to production
- **Config automatically generated** from Design System component APIs
- **Automated content generation** from Storyblok Ideas with AI prompter

## Deploy your own

### Requirements

- Node / `npm`: Ensure you're using the correct Node version 18+ locally; `nvs use`, `nvm use` for automatic selection, if you use one of those tools.
- [`mkcert`](https://github.com/FiloSottile/mkcert#installation): for local setup, to get a locally trusted SSL certificate... needed to run inside the Visual Editor iframe of `app.storyblok.com`
- If you want to use video files in your space, you'll also need a verified space by adding a credit card to it... or by contacting support to add that flag for you (TODO additional note about this being required in premium)

### Environment Variables

| Variable                     | Description                                                             | Where to find                                                                                                                                                                                                             |
| ---------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_STORYBLOK_API_TOKEN`   | The Preview API Token for your Storyblok Space.                         | You can find the Space ID in your Storyblok Spaces "Settings", on the initially opened page (called "Space"). Make sure to exclude(!) the `#` sign in front of it (`297364` instead of `#297364`)                         |
| `NEXT_STORYBLOK_OAUTH_TOKEN` | The Management API OAUTH Token for your Storyblok account.              | You can find the needed Preview API Token in those same "Settings", but in the sub page called "Access Tokens". You can just use the initially created `Preview`-Token (just copy it using the handy icon)                |
| `NEXT_STORYBLOK_SPACE_ID`    | The Space ID for your Storyblok Space.                                  | Your Management API OAUTH Token needs to be created in your "My account" settings, just follow this guide: https://www.storyblok.com/docs/api/management/getting-started/authentication                                   |
| `STORYBLOK_LOGIN_EMAIL`      | The email address for the account you created the Storyblok Space with. | If you're not sure about this, just double check here: https://app.storyblok.com/#/me/account?tab=account                                                                                                                 |
| `STORYBLOK_REGION`           | The region your Storyblok Space is hosted in.                           | This is the one you selected when creating your new Space. Can also be found on the same page the Space ID is displayed on (see above)                                                                                    |
| `NEXT_PUBLIC_SITE_URL`       | The URL of your site.                                                   | The full URL **with** protocol, without a trailing slash, where your production setup will live. For new projects this can be the `*.netlify.app` one provided by Netlify, later on this will be your real production URL |

### Manually

#### Setup

1. Create a new Storyblok Space to host your project (you can just go with the free "Community" tier here, to start): https://app.storyblok.com/#/me/spaces/new
2. Fork the starter to your own account or organisation, this way you can easily benefit from future improvements: https://github.com/kickstartDS/storyblok-starter/fork
3. Clone the forked repository to your local machine
4. Switch to the freshly cloned directory, and inside:
   1. `npm i` to install dependencies
   2. Copy `.env.local.sample` to `.env.local`, and replace all placeholders, [see above](#environment-variables) for definitions... and where to find them
   3. (Re-)login to the Storyblok CLI: `npm run storyblok-logout` followed by `npm run storyblok-login`. The logout first ensures the CLI can actually see all projects, especially newly created ones (which would be likely for a starter like this) can error out otherwise. Use your Storyblok-Login and the region chosen when creating your Space here
   4. Run the project initialization: `npm run init`. This removes demo content, adds all the needed preset and demo content images (into distinct folders, as not to pollute your future project), all components and preset configuration, and creates an initial demo page
   5. Final small adjustment you need to make is to add your future site url in `.env` (variable `NEXT_PUBLIC_SITE_URL`)
   6. You can now commit & push all the locally updated files (`git add --all && git commit -m "Initial Storyblok setup" && git push origin main`):
      - `cms/components.123456.json` is the automatically generated component schema, which was already part of the repository when forked (you can regenerate it with `npm run create-storyblok-config`). It now includes the correct asset references for visual component previews
      - `cms/presets.123456.json` is the same for presets, now with updated asset references for visual preset previews and correct space and component id references
      - `types/components-schema.json` is your live component schema pulled from Storyblok (seeded by `cms/components.123456.json`, this now includes all correct ids and references, pulled by `npm run pull-content-schema`)
      - `types/components-presets.json` again is the same for presets
      - `types/components-schema.d.ts` includes TypeScript types matching your content and component schemas. This is generated based off your `components-schema.json` by using https://github.com/dohomi/storyblok-generate-ts
      - `.env` containing general project related configuration

#### Start locally

1. Inside the project directory start by creating a local certificate for the project: `mkcert localhost`. This generates local key and cert files used when starting the local server (you don't commit those, which is why they're on the `.gitignore`)
2. Run a first full build with `npm run build`
3. Start the local server (including proxy) with `npm run dev`
4. Open your Space in Storyblok (https://app.storyblok.com)
5. Go into the projects "Settings", and open the entry "Visual Editor"
6. Add a new "Preview URL" called "Development", and set its value to `https://localhost:3010/api/preview/`
7. Save your changes by hitting "Save" at the top right
8. On the main "Content" pane, open the page "Getting Started", that was created on initial project setup
9. At the top of the window, inside the simulated address bar of the page preview, click on the small settings icon to the right... and select your "Development" Preview URL
10. Et voila... you should see your locally hosted page preview

TODO: check initial `npm run init` locally again... failed for `push-components` in initial try, because of missing environment variable `NEXT_STORYBLOK_SPACE_ID` in `push-components` script

#### Host on Netlify

1. Add a new site in your Netlify dashboard, choose "Import an existing project"
2. Select the repository you forked here, presumably from Github
3. Choose a fitting name, and leave the rest of the settings as is... only add the following variables through "New variable" in "Environment variables" ([see here](#environment-variables) for definitions / where to find those):
   - `NEXT_STORYBLOK_API_TOKEN`
   - `NEXT_STORYBLOK_OAUTH_TOKEN`
   - `NEXT_STORYBLOK_SPACE_ID`
   - `STORYBLOK_LOGIN_EMAIL`
   - `STORYBLOK_REGION`
4. Run the first deployment for your project by hitting the final button
5. You should be able to open the site url configured in Netlify now

#### Netlify Webhook on Storyblok change

1. Open the settings for your Netlify site ("Site configuration"), and switch to "Build & deploy" -> "Continuous deployment". Scroll down to the section titled "Build hooks", and click "Add build hook"
2. Give that hook a distinct name (e.g. "Storyblok"), and probably keep `main` as the branch to build from
3. Save and copy the generated hook URL
4. Open your Storyblok Space "Settings", and switch to "Webhooks"
5. Click "+ New Webhook", and give hook a distinct name, too (e.g. "Netlify")
6. Replace the "Endpoint URL" with the copied URL from Netlify
7. For "Triggers", open "Story" and select all 4 entries
8. Save the hook

From now on your build process in Netlify should be automatically triggered, deploying a new version of the site in the background, whenever an editor adds, deletes or changes a Story in Storyblok.

#### Storyblok hosted preview

1. Open the Storyblok Spaces "Settings", and switch to "Visual Editor"
2. For "Location (default environment)" enter the site URL configured in Netlify, with `/api/preview` added to it (e.g. if your site URL happens to be `https://storyblok.netlify.app`, the URL you'd enter would have to be `https://storyblok.netlify.app/api/preview/`)
3. Save your changes by hitting "Save" at the top right
4. On the main "Content" pane, open the page "Getting Started", that was created on initial project setup
5. If you already went through configuring a local preview URL, you will most likely have to change back to the default preview environment now by clicking on the settings icons (cogs) on the top right of the preview frame

## Local Development

### Setup

#### TODO

- Favicon
- Fonts
- HTML lang
- (robots.txt)
- 404 / 500
- TODO: check! initial branding seems broken currently, at least for Premium Starter. Maybe a consequence of failed merges with Lughausen repository
- add general note that nothing here _needs_ to be done with Github and / or Netlify, and while some commands might change slightly... everything should be much the same no matter where you want to host
- add section pointing at and explaining DSA DS
- add note about initial initialization taking a while (without any feedback currently)

### Adding initial content

#### Root page (your index page)

TODO

#### Global Settings (header, footer, seo)

TODO

#### 404

TODO

### Creating branded component and preset previews

`YOUR_WEBSITE` should be the path pointing to your website project, the one you want to update the previews for.

TODO adjust this to `ds-agency` on non-premium version

1. Clone the Design System this is based on locally: https://github.com/kickstartDS/ds-agency-premium
2. Switch to the freshly cloned directory, and inside (ensure you're using the correct Node version 18+; `nvs use`, `nvm use` for automatic selection, if you use one of those tools):
   1. `yarn` to install dependencies
   2. `rm -rf src/token` to remove the existing default theme
   3. `cp -r YOUR_WEBSITE/token src/token` to copy your Design Token / Style Dictionary configuration to the Design System project
   4. Adjust the `background-color` for the `.preview--wrapper` CSS class in `global.scss`, to a color suitable for your component screenshots (depends on your applied design)
      1. Optionally, if you've done customizations in `index.scss`, you should add an import to the file `.storybook/preview.tsx` (e.g. right after the already existing `import "./preview.css";`): `import YOUR_WEBSITE/index.scss`
      2. If you've also changed your fonts, you should probably change the content of `fonts.scss` accordingly (if not done already). Finally uncomment the font import in `index.scss` temporarily, to include the correct fonts in preview generation. Fonts are normally loaded by Next.js, which is missing when building from Storybook.
   5. `yarn build-storybook` to build a Storybook that can then be used to create screenshots
   6. `yarn create-component-previews` to re-create the existing previews with your branding
   7. `mkdir -p YOUR_WEBSITE/public/img && rm -rf YOUR_WEBSITE/public/img/screenshots && cp -r static/img/screenshots YOUR_WEBSITE/public/img/` to copy the generated screenshots to your project
   8. `cd YOUR_WEBSITE` to switch to your website project
   9. `npm run update-previews` to update those newly created screenshots in your Storyblok space (can take 2-3 mins)
3. That's it!

Reminder: Undo the import for `fonts.scss` in `index.scss` if you had to change that for your previews, otherwise you'd load redundant fonts on your page later.

## Working with the content schema

### Typescript Support

Generate ts types according to the content schema by running
`NEXT_STORYBLOK_SPACE_ID=<your-space-id> npm run generate-content-types`.

### Migrations

When changing the content schema we recommend sticking to [Storyblok's Best
Practices](https://www.storyblok.com/tp/storyblok-cli-best-practices#modify-blok-structure).

## Contributing

Contributions are welcome. Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in the work by you, as defined in the Apache-2.0 license, shall be dual licensed as below, without any additional terms or conditions.

## License

This project is licensed under either of

- [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0) ([LICENSE-APACHE](LICENSE-APACHE))
- [MIT license](https://opensource.org/license/mit/) ([LICENSE-MIT](LICENSE-MIT))

at your option.

The SPDX license identifier for this project is MIT OR Apache-2.0.

---

For more information and updates, please visit the project's GitHub repository.

## Support

Join our [Discord community](https://discord.gg/mwKzD5gejY) for support, or leave an issue on this repository!
