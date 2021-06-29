# npx

## 1) Create template...

```
npx react-native init rndemo --template react-native-template-typescript
```

## 2) Configure prettier/eslint

`.eslintrc.js`
```js
module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': 'warn',
    'no-console': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
}
```

`.prettierrc.js`
```js
module.exports = {
  "bracketSpacing": true,
  "endOfLine": "lf",
  "jsxBracketSameLine": false,
  "printWidth": 120,
  "singleQuote": true,
  "tabWidth": 2,
  "semi": false,
  "trailingComma": "es5"
}
```

`.vscode/settings`
```json
{
  "editor.defaultFormatter": "dbaeumer.vscode-eslint",
  "editor.formatOnSave": true,
  "eslint.run": "onSave",
  "eslint.format.enable": true,
  "editor.tabSize": 2
}
```

## 3) React Router

```sh
npm i react-router-native
npm i -D @types/react-router-native
```

```js
import { NativeRouter as Router, Switch, Route } from 'react-router-native'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </Router>
)

export default App
```
