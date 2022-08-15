# Babylon Tutorial

## インストール

### public/index.html作成

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Babylon Game</title>
  </head>
  <body></body>
</html>
```

### Babylon.js　パッケージインストール

```bash
$ yarn init
$ yarn add --dev @babylonjs/core @babylonjs/inspector @babylonjs/loaders/glTF @babylonjs/materials @babylonjs/loaders @babylonjs/serializers @babylonjs/gui @babylonjs/gui-editor
```

### TypeScript 対応

```bash
$ tsc --init

* tsconfig.json を編集

$ yarn add --dev typescript webpack ts-loader webpack-cli
```

### Webpack 対応

```bash
$ yarn add --dev html-webpack-plugin webpack-dev-server
```

### アプリケーション作成

- public/app.ts 作成

### ビルド

```bash
$ yarn build
```

### 実行

```bash
$ yarn start
```

[http://localhost:8080/](http://localhost:8080/) で動作確認
# babylon
