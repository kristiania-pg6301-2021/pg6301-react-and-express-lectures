
PAUSE TIL 22:35


## Goal

Create a page that displays user details for a login-provider (Google or Active Directory)

## Plan

* [ ] Basic React + Express application
    * [x] `npm init -y`
    * [x] `npm install -D nodemon parcel@next prettier concurrently`
    * [x] `npm install -P react react-dom react-router react-router-dom express`
    * [x] start scripts
    * [x] `index.html`, `index.jsx`, `server.js`
* [x] Routing: /profile, /login, /login/callback
* [x] Call GET /api/profile with hypothetical access token
* [x] Create an authorization URL
    * [x] create client_id at https://console.cloud.google.com/apis/credentials
    * [x] redirect to authorization_endpoint from discovery URL https://accounts.google.com/.well-known/openid-configuration
    * [x] include `client_id`, `redirect_uri` + other parameters (scope, response_type)
    * [x] `window.location.href = authorization_endpoint + "?" + new URLSearchParams({})`
* [x] Handle callback
    * [x] `const hash = Object.fromEntries(new URLSearchParams(window.location.hash.substr(1))); const {access_token} = hash;`
* [x] Lookup userinfo
* [x] `state`
* [x] Active Directory
    * [x] Create Active Directory Tenant at https://portal.azure.com
    * [x] Create Active Directory App Registration
    * [x] Use discovery URL https://login.microsoftonline.com/common/.well-known/openid-configuration
* [x] PKCE - Proof of Key Code Exchange
* [x] ID-porten
    * [x] Create client_id at https://selvbetjening-samarbeid-ver1.difi.no/integrations
    * [x] Discovery URL at https://oidc-ver1.difi.no/idporten-oidc-provider/.well-known/openid-configuration



## Snippets

### fetchJSON

```javascript
export async function fetchJson(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return await res.json();
}
```

### useLoader

```javascript
import { useEffect, useState } from "react";

export function useLoading(loadingFunction, deps = []) {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  async function reload() {
    setLoading(true);
    setData(undefined);
    setError(undefined);
    try {
      setData(await loadingFunction());
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(reload, deps);

  return { error, loading, data, reload };
}
```


### Generate authorization URL

```javascript
    const { authorization_endpoint } = await fetchJson(openIdConnectUrl);
    const payload = {
      response_type: "code",
      response_mode: "fragment",
      client_id,
      scope: "openid email profile",
      redirect_uri: window.location.origin + "/login/callback",
    };

    window.location.href =
      authorization_endpoint + "?" + new URLSearchParams(payload);
```

### Decode hash:

```javascript
const hash = Object.fromEntries(
  new URLSearchParams(window.location.hash.substr(1))
);
const { error, error_description, state, code } = hash;
```

### randomString

```javascript
export function randomString(length) {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmopqrstuvwxyz1234567890";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return result;
}
```

### sha256

```javascript
export async function sha256(string) {
  const binaryHash = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(string)
  );
  return btoa(String.fromCharCode.apply(null, new Uint8Array(binaryHash)))
    .split("=")[0]
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

```
