# MapApp

Example app built with [Vue.js](https://vuejs.org/), [Vue Ant Design](https://www.antdv.com/docs/vue/introduce/) and [VueMapbox](https://github.com/soal/vue-mapbox).

App is available to view [here](https://kind-clarke-aee161.netlify.app/) 🚀.

Simple test and deploy workflows have been added with Github Actions.

## Project setup

**⚠️ WARNING:** to boot the app locally you will need a [mapbox access token](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/). Create an `.env` file in the project root and add the environment variable `VUE_APP_MAPBOX_ACCESS_TOKEN`.

```
# .env
VUE_APP_MAPBOX_ACCESS_TOKEN=[mapbox access token]
```

### Install node modules
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Run your end-to-end tests
```
yarn test:e2e
```

### Lints and fixes files
```
yarn lint
```
