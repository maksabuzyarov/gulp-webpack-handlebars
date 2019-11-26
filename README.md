## Front-end Boilerplate

![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)
[![license](https://img.shields.io/github/license/maksabuzyarov/gulp-webpack-hbs)](https://github.com/maksabuzyarov/gulp-webpack-hbs/blob/master/LICENSE)
![version](https://img.shields.io/github/package-json/v/maksabuzyarov/gulp-webpack-hbs)
[![commit activity](https://img.shields.io/github/commit-activity/m/maksabuzyarov/gulp-webpack-hbs?cache=boost)](https://github.com/maksabuzyarov/gulp-webpack-hbs/commits/master)
[![gulp](https://img.shields.io/github/package-json/dependency-version/maksabuzyarov/gulp-webpack-hbs/dev/gulp)](https://www.npmjs.com/package/gulp)
[![webpack](https://img.shields.io/github/package-json/dependency-version/maksabuzyarov/gulp-webpack-hbs/dev/webpack)](https://www.npmjs.com/package/webpack)
[![babel](https://img.shields.io/github/package-json/dependency-version/maksabuzyarov/gulp-webpack-hbs/dev/@babel/core)](https://www.npmjs.com/package/@babel/core)

**gulp-webpack-hbs** is a flexible template for web development. It includes many tools for creating responsive, high-performance and lightweight pages.

:rocket: Gulp 4 + Webpack 4 +​ ​Handlebars + Babel + ​BrowserSync :fire:




## Features

| Type           | List                                                         |
| -------------- | ------------------------------------------------------------ |
| Task Runner    | [Gulp](https://www.npmjs.com/package/gulp)                   |
| CSS            | [SASS / SCSS](https://www.npmjs.com/package/gulp-sass), [CleanCSS](https://www.npmjs.com/package/gulp-clean-css), [Autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) |
| JS             | [Webpack](https://www.npmjs.com/package/webpack), [Babel](https://www.npmjs.com/package/babel-loader) |
| JS Examples    | [FileInclude](https://www.npmjs.com/package/gulp-file-include), [Uglify](https://www.npmjs.com/package/gulp-uglify) |
| HTML Templates | [Handlebars.js](https://www.npmjs.com/package/handlebars), [handlebars-layouts](https://github.com/shannonmoeller/handlebars-layouts) |
| Images         | [ImageMin](https://www.npmjs.com/package/gulp-imagemin)      |
| Live Reload    | [BrowserSync](https://www.npmjs.com/package/browser-sync)    |
| Debug          | [Sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps), [Plumber](https://www.npmjs.com/package/gulp-plumber) |
| More           | [Favicons](https://www.npmjs.com/package/favicons), [SVG Sprites](https://www.npmjs.com/package/gulp-svg-sprite), [Notifier](https://www.npmjs.com/package/node-notifier), [Changed](https://www.npmjs.com/package/gulp-changed) |
| Included JS    | [Jquery](https://www.npmjs.com/package/jquery), [Bootstrap 4](https://www.npmjs.com/package/bootstrap), [CurrentDevice](https://www.npmjs.com/package/current-device) |



## Usage

### Start

1. Install **NodeJS** and **npm**
2. Clone this repository
3. Run `npm install`

```bash
git clone https://github.com/maksabuzyarov/gulp-webpack-hbs.git
cd gulp-webpack-hbs
npm install
```



### Use tasks

| Task Name                                    | Description                                               | Environment |
| :------------------------------------------- | :-------------------------------------------------------- | :---------- |
| `gulp` or `npm run gulp`                     | Compile dev build, start the server and watch for changes | Development |
| `npm run build` or `gulp build --production` | Compile production build                                  | Production  |



## File structure

```
|-- dist
|-- tasks
|-- src
|   |-- fonts
|   |-- img
|   |   |-- favicon
|   |   |   |-- logo.png
|   |   |-- sample
|   |   |-- svg-sprite
|   |-- js
|   |   |-- modules
|   |   |-- other
|   |       |-- scripts.js
|   |   |-- app.js
|   |   |-- main.js
|   |-- styles
|   |   |-- components
|   |   |-- main.scss
|   |   |-- _app.scss
|   |   |-- _variables.scss
|   |-- views
|       |-- helpers
|       |-- partials
|       |-- templates
|           |-- pages
|           |-- index.html
|-- .babelrc.js
|-- .browserslistrc
|-- .gitignore
|-- gulpfile.babel.js
|-- package.json
|-- webpack.config.js
```

- `dist` - folder with the finished results of assembly. In dev mode, is the root of the server.

- `tasks` -  directory with gulp tasks.

- `.babelrc.js` - babel static configuration.

- `gulpfile.babel.js` - config and main tasks.

- `src` - source files

  - `fonts` - fonts files in directories named by font name. For example *fonts/Ubuntu/Regular.{woff, woff2, ttf}*

  - `img` - all images for optimization excluding directories with special logic:

    - `favicon` -  generating favicons from one image

    - `svg-sprite` - optimizes them and bakes them into SVG sprites

  - `views` 

    - `helpers` - *Handlebars.js* helpers

    - `partials` - *Handlebars.js* templates

    - `template` - site pages

      - `index.html` - entry point

      - `pages` - all pages

        



## Copyright and license

Copyright 2019 Maksim Abuzyarov under the [MIT license](http://opensource.org/licenses/MIT).
