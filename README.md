
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

Now the React application should be showing

## Troubleshooting

* Check parcel version
* Restart parcel (npm start)
* Delete .cache directory
* Run `npm install` - perhaps also delete `node_modules` directory


