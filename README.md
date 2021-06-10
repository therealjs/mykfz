# myKFZ codebase

## start backend

```bash
cd backend
mongod --dbpath ~/mongodb_data # start mongo
npm run devstart
```

## start frontend

```bash
cd frontend
npm start
```

## run prettier (only if you want to prettify all files, precommit hook should run automatically on git add .)

```bash
prettier --write "**/*.js"
```
