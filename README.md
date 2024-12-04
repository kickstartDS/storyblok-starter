# kickstartDS Storyblok starter <!-- omit in toc -->

## **TODO**

- check! initial branding seems broken currently, at least for Premium Starter. Maybe a consequence of failed merges with Lughausen repository
- add section pointing at and explaining DSA DS
- document global component / reference usage
- document token extraction (and how to add values)
- document image optimizations
- document initial schema mismatch in Storyblok after init (needs hard refresh in browser to load correct component schemas)
- document index page configuration: https://github.com/kickstartDS/storyblok-starter/blob/main/helpers/storyblok.ts#L324
- fix global element error on initial `push-components`

This project provides a starter template for building marketing websites using Storyblok and a Design System backed by [**kickstartDS**](https://www.kickstartDS.com). It includes pre-configured components, content schema, and best practices to streamline development and ensure consistency.

You can learn more about it on our dedicated landing page for these starters:<br>
https://about.design-system.agency/

[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE-MIT)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue)](LICENSE-APACHE)

## Quickstart <!-- omit in toc -->

To start, you'll need some environment variables defined [here](#environment-variables), and accounts with Netlify, Github and Storyblok, [see here](#requirements).

**TODO** add note about continuing with "Manual" if you don't need / want this... refer to other options (Vercel et al), too. But those just as a side note

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/kickstartDS/storyblok-starter)

For other hosting options have a look at our [hosting](#hosting) section.
You can also do everything [manually](#manual), too!

## Table of Contents <!-- omit in toc -->

- [**TODO**](#todo)
- [Features](#features)
- [Requirements](#requirements)
  - [Development](#development)
  - [Storyblok](#storyblok)
  - [Hosting](#hosting)
  - [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
  - [Netlify Deploy](#netlify-deploy)
  - [Manual](#manual)
    - [Setup](#setup)
    - [Host on Netlify](#host-on-netlify)
  - [Integration](#integration)
    - [Netlify Webhook on Storyblok change](#netlify-webhook-on-storyblok-change)
    - [Storyblok hosted preview](#storyblok-hosted-preview)
  - [Adding initial content](#adding-initial-content)
    - [Root page (your index page)](#root-page-your-index-page)
    - [Blog Post](#blog-post)
    - [Blog Overview](#blog-overview)
    - [Global settings (header, footer, seo)](#global-settings-header-footer-seo)
    - [404](#404)
- [Local Development](#local-development)
- [Configuration](#configuration)
  - [Applying your own design / branding](#applying-your-own-design--branding)
  - [Creating branded previews](#creating-branded-previews)
  - [Working with the content schema](#working-with-the-content-schema)
    - [Typescript Support](#typescript-support)
    - [Migrations](#migrations)
  - [Changing the favicon](#changing-the-favicon)
  - [Using your own custom fonts](#using-your-own-custom-fonts)
  - [Adjusting website language](#adjusting-website-language)
  - [Changing 404 / 500 content](#changing-404--500-content)
  - [Configuring sitemap.xml / robots.txt](#configuring-sitemapxml--robotstxt)
  - [Adding redirects](#adding-redirects)
- [Customization](#customization)
  - [Customizing component design](#customizing-component-design)
  - [Adding a component](#adding-a-component)
  - [Customizing a component](#customizing-a-component)
  - [Adding a new content template](#adding-a-new-content-template)
  - [Switch to your own Design System](#switch-to-your-own-design-system)
- [Technical background](#technical-background)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## Features

**TODO** maybe split this into some topical sections to make it more digestible

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
- **Full TypeScript** support, including content schemas
- **Editable 404 pages**, add any content you like yourself
- **Icon picker** for custom icon sprite, as a Storyblok field plugin
- **Image optimization** (blurhashes, responsive image resizing, Design System token connected)
- **Content alt-tag support**, with fallback to general asset alt if not defined
- **Optimized font loading**, with granular control over swapping behaviour
- **High performance option**, to render completely without React + Next.js ("fully static")
- **Sitemaps + robots.txt** automatically generated
- **Built-in** page, settings, and Seo **templates**
- Easy **custom template support** (e.g., structured page types like products, events, etc)
- **Fully automated initial setup**, < 30 minutes to production
- **Config automatically generated** from Design System component APIs
- **Automated content generation** from Storyblok Ideas with AI prompter

## Requirements

#### Development

- Node / `npm`: Ensure you're using the correct Node version (18+) locally; `nvs use`, `nvm use` for automatic selection, if you use one of those tools.
- [`mkcert`](https://github.com/FiloSottile/mkcert#installation): for local setup, to get a locally trusted SSL certificate... needed to run inside the Visual Editor iframe of `app.storyblok.com`
- If you want to go with the default hosting setup, you'll need an account with [Github](https://github.com/) (code repository hosting) and [Netlify](https://www.netlify.com/) (website hosting and build process)

#### Storyblok

- A Space: Create a new Storyblok Space to host your project (you can just go with the free "Community" tier here, to start): https://app.storyblok.com/#/me/spaces/new
- If you want to use video files in your space, you'll also need a verified space by adding a credit card to it... or by contacting support to add that flag for you (**TODO** additional note about this being required in premium)

#### Hosting

- If you want to go with the default hosting setup, you'll need an account with [Github](https://github.com/), for code repository hosting,
- and one with [Netlify](https://www.netlify.com/), for website and build process hosting

**TODO** add general note that nothing here _needs_ to be done with Github and / or Netlify, and while some commands might change slightly... everything should be much the same no matter where you want to host

#### Environment Variables

The following variables depend on you already having created a Storyblok Space: [see here](#storyblok).

| Variable                     | Description                                                             | Where to find                                                                                                                                                                                                                                                                                        |
| ---------------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_STORYBLOK_API_TOKEN`   | The Preview API Token for your Storyblok Space.                         | You can find the needed **Preview API** Token in those same "Settings", but in the sub page called "Access Tokens". You can just use the initially created `Preview`-Token (just copy it using the handy icon).<br>This is used to consume your content when building or previewing your website     |
| `NEXT_STORYBLOK_OAUTH_TOKEN` | The Management API OAUTH Token for your Storyblok account.              | Your **Management API** OAUTH Token needs to be created in your "My account" settings, just follow this guide: https://www.storyblok.com/docs/api/management/getting-started/authentication<br>This is only used initially, to set up your project (adding components, presets, content and assets). |
| `NEXT_STORYBLOK_SPACE_ID`    | The Space ID for your Storyblok Space.                                  | You can find the **Space ID** in your Storyblok Spaces "Settings", on the initially opened page (called "Space"). Make sure to exclude(!) the `#` sign in front of it (`297364` instead of `#297364`)                                                                                                |
| `STORYBLOK_LOGIN_EMAIL`      | The email address for the account you created the Storyblok Space with. | If you're not sure about this, just double check here: https://app.storyblok.com/#/me/account?tab=account                                                                                                                                                                                            |
| `STORYBLOK_REGION`           | The region your Storyblok Space is hosted in.                           | This is the one you selected when creating your new Space. Can also be found on the same page the Space ID is displayed on (see above)                                                                                                                                                               |
| `NEXT_PUBLIC_SITE_URL`       | The URL of your site.                                                   | The full URL **with** protocol, without a trailing slash, where your production setup will live. For new projects this can be the `*.netlify.app` one provided by Netlify, later on this will be your real production URL                                                                            |

## Getting Started

### Netlify Deploy

The [Netlify Deploy button](https://docs.netlify.com/site-deploys/create-deploys/#deploy-to-netlify-button) provides an easy and convenient way to deploy your project to Netlify. By clicking the button, you can quickly set up your project on Netlify and Github without manually configuring the deployment settings. It automates the process and ensures that your project is deployed correctly with just a few clicks. This saves time and effort, especially for users who are new to Netlify or want a streamlined deployment process:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/kickstartDS/storyblok-starter)

For other options see [hosting](#hosting) or go down the [manual route](#manual).

### Manual

When going the manual route, you'll need the same environment variables, but you'll start the project initialization locally. This can all be done without involving any specific hosting.

#### Setup

Setup consists of creating your own code repository, cloning the project and running the Storyblok project inititialization locally.

> :information_source: initialization itself can take a while (2-3 minutes), as in the process of adding all demo content, components and presets we also upload quite a lot of assets (especially component and preset previews) according to the [throttling imposed by Storyblok](https://www.storyblok.com/cl/rate-limit-management-api)

1. Fork the starter to your own account or organisation, this way you can easily benefit from future improvements: https://github.com/kickstartDS/storyblok-starter/fork
2. Clone the forked repository to your local machine
3. Switch to the freshly cloned directory, and inside:
   1. `npm i` to install dependencies
   2. Copy `.env.local.sample` to `.env.local`, and replace all placeholders, [see above](#environment-variables) for definitions... and where to find them
   3. (Re-)login to the Storyblok CLI: `npm run storyblok-logout` followed by `npm run storyblok-login`. The logout first ensures the CLI can actually see all projects, especially newly created ones (which would be likely for a starter like this) can error out otherwise. Use your Storyblok-Login and the region chosen when creating your Space here
   4. Run the project initialization: `npm run init`. This removes demo content, adds all the needed preset and demo content images (into distinct folders, as not to pollute your future project), all components and preset configuration, and creates an initial demo page
   5. Final small adjustment you need to make is to add your future site url in `.env` (variable `NEXT_PUBLIC_SITE_URL`)
   6. You can now commit & push all the locally updated files (`git add --all && git commit -m "Initial Storyblok setup" && git push origin main`)

Changed files in detail:
| Filename | Description |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cms/components.123456.json` | The automatically generated component schema, which was already part of the repository when forked (you can regenerate it with `npm run create-storyblok-config`). It now includes the correct asset references for visual component previews |
| `cms/presets.123456.json` | The same for presets, now with updated asset references for visual preset previews and correct space and component id references |
| `types/components-schema.json` | Your live component schema pulled from Storyblok (seeded by `cms/components.123456.json`, this now includes all correct ids and references, pulled by `npm run pull-content-schema`) |
| `types/components-presets.json` | The same for presets |
| `types/components-schema.d.ts` | Includes TypeScript types matching your content and component schemas. This is generated based off your `components-schema.json` by using [storyblok-generate-ts](https://github.com/dohomi/storyblok-generate-ts) |
| `.env` | Contains general project related configuration, should contain your updated website url |

#### Host on Netlify

If you want to add this project to Netlify without using the [Netlify Deploy](#netlify-deploy) button:

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

### Integration

Irrespective of going the manual route, or using the [Netlify Deploy](#netlify-deploy) button, you'll want to configure some more integration between Storyblok and Netlify.

> :information_source: As for all those hosting options, this works the same for other hosters like Vercel as well... you'll just have to change some values around a bit.

#### Netlify Webhook on Storyblok change

To automitcally trigger your build process in Netlify, deploying a new version of the site in the background whenever an editor adds, deletes or changes a Story in Storyblok:

1. Open the settings for your Netlify site ("Site configuration"), and switch to "Build & deploy" -> "Continuous deployment". Scroll down to the section titled "Build hooks", and click "Add build hook"
2. Give that hook a distinct name (e.g. "Storyblok"), and probably keep `main` as the branch to build from
3. Save and copy the generated hook URL
4. Open your Storyblok Space "Settings", and switch to "Webhooks"
5. Click "+ New Webhook", and give hook a distinct name, too (e.g. "Netlify")
6. Replace the "Endpoint URL" with the copied URL from Netlify
7. For "Triggers", open "Story" and select all 4 entries
8. Save the hook

Read more about Webhooks and Storyblok: https://www.storyblok.com/docs/guide/in-depth/webhooks

#### Storyblok hosted preview

To view a hosted preview inside the Storyblok Visual Editor, e.g. after your first successful Netlify deployment:

1. Open the Storyblok Spaces "Settings", and switch to "Visual Editor"
2. For "Location (default environment)" enter the site URL configured in Netlify, with `/api/preview` added to it (e.g. if your site URL happens to be `https://storyblok.netlify.app`, the URL you'd enter would have to be `https://storyblok.netlify.app/api/preview/`)
3. Save your changes by hitting "Save" at the top right
4. On the main "Content" pane, open the page "Getting Started", that was created on initial project setup
5. If you already went through configuring a local preview URL, you will most likely have to change back to the default preview environment now by clicking on the settings icons (cogs) on the top right of the preview frame

Read more about the Visual Editor: https://www.storyblok.com/docs/guide/essentials/visual-editor

### Adding initial content

#### Root page (your index page)

**TODO**

#### Blog Post

**TODO**, possibly document switching authors to be global

#### Blog Overview

**TODO**, also document switching Blog Teasers to Blog Post references

#### Global settings (header, footer, seo)

**TODO**

#### 404

**TODO**

## Local Development

Using this, you can essentially forego any hosting setup to start testing or developing. Start using just your local setup and a Storyblok Space.<br>
This is also the setup we encourage to use to test changes before commiting / pushing them to production, even if already using a hosting setup.

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

**TODO**: check initial `npm run init` locally again... failed for `push-components` in initial try, because of missing environment variable `NEXT_STORYBLOK_SPACE_ID` in `push-components` script

## Configuration

There's a lot that needs to be configurable, to make a good starter. This involves stuff like applying your branding, configuring technical SEO aspects or generally changing the setup to your liking. Here you'll find short descriptions for all of those aspects.

### Applying your own design / branding

When getting started with your **Design System**, you will find the current **Design Token** set to be pretty bland and boring... this is because you are looking at the default, pretty much unstyled versions of components.

**TODO** link https://design-system.agency/

There are two concepts involved with design and token application in **kickstartDS**:

1. [**Branding Token**](https://www.kickstartds.com/docs/foundations/token/branding-token): Small set of expressive values to seed your initial **Design Token** set
2. [**Design Token**](https://www.kickstartds.com/docs/foundations/token/design-token/): Managed **Style Dictionary** containing your semantic **Design Token** set

**Branding Token** are set in `src/token/branding-token.json`, while your **Design Token** set lives at `src/token/dictionary`. Initialization of token happens through `yarn init-tokens`, while compiling your **Design Token** set to **Component Token** (among other formats) is done by running `yarn build-tokens`.

[**Component Token**](https://www.kickstartds.com/docs/foundations/token/component-token) are the third type of token involved, but those only come into play later. They are not concerned with the general styling / theming of your **Design System**, but rather map your **Design Token** set to components in a layered way.

To learn more about this process, follow the section ["2. Design Application"](https://www.kickstartds.com/docs/guides/create/design) of our ["Create your Design System"](https://www.kickstartds.com/docs/guides/create) guide.

**TODO** link theming page https://about.design-system.agency/theming/

### Creating branded previews

Use this to adjust the included component and preset previews, shown when working with content inside your Storyblok Space. By default, these will feature the demo design included with this starter. After you've applied your own branding to this starter **TODO** link this to section about design application, you'll probably want to update said previews, too!

**TODO** link https://design-system.agency/

`YOUR_WEBSITE` should be the path pointing to your website project, the one you want to update the previews for.

**TODO** adjust this to `ds-agency` on non-premium version

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

### Working with the content schema

#### Typescript Support

**TODO** update this, outdated... but still a good idea to document

Generate ts types according to the content schema by running
`NEXT_STORYBLOK_SPACE_ID=<your-space-id> npm run generate-content-types`.

#### Migrations

When changing the content schema we recommend sticking to [Storyblok's Best
Practices](https://www.storyblok.com/tp/storyblok-cli-best-practices#modify-blok-structure).

### Changing the favicon

**TODO**

### Using your own custom fonts

**TODO**

### Adjusting website language

**TODO**

### Changing 404 / 500 content

**TODO**

### Configuring sitemap.xml / robots.txt

**TODO**

### Adding redirects

**TODO**

## Customization

### Customizing component design

- **TODO** document customizing DSA component token / SCSS

### Adding a component

- **TODO** document new component (example Info Table; add notices about providers / image optimization)

### Customizing a component

- **TODO** document customizing a new component

### Adding a new content template

- **TODO** document adding a custom template type

### Switch to your own Design System

- **TODO** document switching to your own Design System instance

## Technical background

**TODO** detail Design System concept of components, templates and globals

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
