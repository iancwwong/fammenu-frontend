# Frontend
The frontend component of the fammenu project!

Currently a CRUD application for Food Items (must make sure fammenu-backend is running)

## Running notes

### Prereq
- Yarn

Running the front-end:

```
yarn run build
yarn run serve

# In dev mode
yarn run dev-server
```

Before building docker image, make sure to run `yarn build` first!
```
yarn build
docker build -t fammenu_frontend .
```