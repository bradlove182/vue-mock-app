# vue-mock-app

[https://vue-mock-app.vercel.app](Live Demo)

## Getting started

First, install the required dependencies:

```bash
pnpm i
# or
npm i
```

Second, start the development server:

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the login page.

You can either login with an existing account below or register a new one.

```bash
# Admin User
Email: admin@mock.app
Password: password

# Banned User
Email: banned@mock.app
Password: password
```

All data is persisted through the localStorage API acting as a mock database which means any new accounts created will be stored until cleared manually, this also means that the logged in account will remain logged in until specifically logged out.

## Production

```bash
pnpm build
# or
npm run build
```

## Testing

```bash
pnpm test
# or
npm run test
```
