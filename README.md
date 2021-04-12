## Lecture 11

### Client side

* [x] Update with what we've learned since then
  * [x] Upgrade parcel
  * [x] Improve scripts
* [ ] Refactor the app to allow for better testing
  * [x] Extract `fetchJSON` function for reuse
  * [ ] Introduce BookApi calls in `CreateBookPage` and `EditBookPage`
* [ ] Review existing `BookListPage.test.tsx`
  * [ ] Add test for loading
  * [ ] Add test for errors
* [ ] Add tests for `EditBookPage.jsx`

### Server side

* [ ] Extract route
* [ ] Create API tests with Supertest
* [ ] Review Supertests for quiz application
* [ ] Review plain JavaScript tests for quiz application

## Lecture 8

Setting up a react application:

1. `npm init`
2. `npm install -D parcel@1.12.3` (1.12.4 has a bug! When fixed, you can leave out the version reference)
3. Add scripts start `"parcel": "parcel src/client/index.html"`
4. Add index.html
5. `npm start` => http://localhost:1234
6. Add index.jsx and reference from index.html
7. `npm install -P react react-dom`
8. Restart `npm start`
9. Add `ReactDOM.render(<h1>Hello world</h1>, document.getElementById("root"))`
10. In order to use promises, you have to add to `package.json` a section with "`browserslist`"

Now the React application should be showing

Adding tests:

1. `npm install -D jest babel-jest @babel/preset-env @babel/preset-react`
2. Add `"test": "jest"` as a script in `package.json`
3. Add `package.json` sections for `"jest"` to transform with `babel-jest` and for `babel` to use the installed presets from #1
4. Add a test file under `__tests__`


## Troubleshooting

* Check parcel version
* Restart parcel (npm start)
* Delete .cache directory
* Run `npm install` - perhaps also delete `node_modules` directory


