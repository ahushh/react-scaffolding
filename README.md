# Shopping cart

## Contributing

##### Default credentials

```
test@test.com
123456
```

##### Used commit message convention

[https://gist.github.com/stephenparish/9941e89d80e2bc58a153](https://gist.github.com/stephenparish/9941e89d80e2bc58a153)


##### WebStorm Typescript code style configuration

`File → Settings → Code style → TypeScript → Click on gear icon → Import Scheme → Intellij IDEA code style XML`

Choose `Typescript.xml` in repository root.

##### Git configuration

`git config branch.master.mergeoptions  "--no-ff"`

### Where is .env file?

`.env.development`

`.env.production`

### Install dependencies

```
npm ci
```

### Running server in development mode

Starts webpack-dev-server with Hot-Module-Reloading on [http://localhost:3000](http://localhost:3000`)

```
npm run start 
```

### Build in production mode. 

All the result files will be stored in `dist` directory.

```
npm run build:prod
```

## Run unit tests

```
npm run jest
```

## Run unit tests in watch mode

```
npm run jest:watch
```


## Run ts, js and style linters and fix errors

```
npm run lintfix
```

## Run ts, js and style linters without fixing

```
npm run lint
```
