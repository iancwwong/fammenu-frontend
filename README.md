# Frontend

## Running notes
- Node's live-server
- Node's Babel, babel-env, and babel-react preset

Running the front-end:

```
live-server public
babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch
```