All of this assumes you're on a Mac. If any part of these instructions are wrong or incomplete, please update them!

## Installs

Get [Homebrew](https://brew.sh/).

```bash
> /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Get [node.js](https://nodejs.org/en/).

```bash
> brew install node
```

Get [nvm](https://github.com/nvm-sh/nvm).

```bash
> curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

## Setup

Use the correct node version and install node_modules.

```bash
> nvm use
> npm install
```

Create a `.env.dev` file at the root level of the project with the connection information for the database you created. You may optionally specify a port. By default, the dev server runs on `5004` and the test server runs on `5005`.

```
MORE_HUMAN_INTERNET_GETSTREAM_KEY=
MORE_HUMAN_INTERNET_GETSTREAM_SECRET=
MORE_HUMAN_INTERNET_GETSTREAM_APP_ID=
MORE_HUMAN_INTERNET_GETSTREAM_LOCATION=
MORE_HUMAN_INTERNET_GETSTREAM_TIMEOUT=
MORE_HUMAN_INTERNET_PORT=
```

Do the same for `.env.test`.

```
MORE_HUMAN_INTERNET_GETSTREAM_KEY=
MORE_HUMAN_INTERNET_GETSTREAM_SECRET=
MORE_HUMAN_INTERNET_GETSTREAM_APP_ID=
MORE_HUMAN_INTERNET_GETSTREAM_LOCATION=
MORE_HUMAN_INTERNET_GETSTREAM_TIMEOUT=
MORE_HUMAN_INTERNET_PORT=
```
