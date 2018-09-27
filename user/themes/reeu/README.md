# REEU Theme

The **REEU** Theme is for [Grav CMS](http://github.com/getgrav/grav).

## Structure

Aside from the basic structure of a Grav theme, this theme has the following
assets structure:

```
src/         # Contains all the frontend sources and assets other than HTML
|
| – bundles   # Contains the entry points for webpack bundles on a per page basis
| – images    # Contains the images used by the theme
| – fonts     # Contains the fonts used by the theme
| – js        # Contains the javascript sources
| – css       # Contains the css (SASS) sources of the theme
|
|
|
|
```

### Bundles
The structure of this directory is as follows:

```
bundle/
|
| – bundle-dev.js      # Bundle used by webpack for hot reload
| – pageOne.js         # Bundle for assets (css + js) needed by "page one"
| – pageTwo.js         # Bundle for assets (css + js) needed by "page two"
| – ...
|
```
### Javascript

The structure of this directory is as follows:
```
js/
|
| – app.js                           # js code shared by all pages
| – animation.js                     # Helper for on scroll animations
| – hamburger-menu.js                # Code that handle the hamburger menu of mobile devices
| – utils.js                         # Utility functions
| – pages/                           # Code specific to some pages
| | – pages/                         # Code specific to some pages
|   | – website-optimization report/ # Contains JS code specific to website optimization
|       | – vue/                     # Vue JS Templates
|       | – index.js                 # main entry point of the page's code
|
| – ...
```

### CSS

The structure of this directory is as follows:

```
css/
|
| – _variables.scss    # Sass Variables + Spectre.css overrides
| – _mixins.scss       # Sass Mixins
| – _common.scss       # Common code to be used by page specific style
| - _base.scss         # Base Styling
| – _buttons.scss      # Buttons
| – _header.scss       # Header
| – _layout.scss       # General layout  styling
| – _footer.scss       # Footer
|
| – _style.scss        # Primary Sass File
| – page-one.scss      # One per page
|
```



## Builds
The following tooling is used to generate builds:

    - npm/yarn
    - webpack
    - vuejs

There are two types of builds `production`  & `development` builds.

### Production builds
The production builds are as follows:
```
dist/
|
| – images             # Contains the images used by the theme
| – fonts              # Contains the fonts used by the theme
|
| – css/               # Contains CSS sources
| | – style.min.css    # Contains the common style for all the app
| | – page-one.min.css # Contains style specific to a page named "page one"
|
| – js/                # Contains the javascript sources
| | – app.min.js       # js code shared by all pages
| | – page-one.js      # Code specific to a page named "page one"
|
```

### Development builds
For the dev builds javascript and css assets are bundled together in a bundle.js file.
This file must be served over the `webpack-dev-server` to allow for hot reload
of the assets. (http://localhost:8000/dist/bundle.js)
Any asset that must be hot reloaded should be explicitely required
in the src/bundle-dev.js file.

Webpack-dev-server serves the assets from memory and not from disk so the dev build
does not produce the assets in the dist directory.


### Assets bundling process
For production build webpack only packs js assets, the css assets are handled
by gulp.

So the tooling process is as follows:

DEV BUILD:

    - gulp processes :
        - fonts
        - images
    - webpack (all in a single bundle)
        - css
        - js

PROD BUILD:

    - gulp processes
        - fonts
        - images
        - css
    - webpack
        - js





