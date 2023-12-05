# my-vue-test

This template should help get you started developing with Vue 3 in Vite.

## json-server

```sh
  npm install -g json-server
```

資料夾中新增db.json

```json
  // db.json
  {
    "productList": []
  }
```
用工作管理員開啟命令提示字元

移動到專案資料夾

```sh
  cd (此資料夾路徑)
```

執行json server

```sh
  json-server --watch db.json
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
