# Getting Started

Ensure you have [.NET Core](https://www.microsoft.com/net/core) installed.

To run the sample API perform the following from the root project directory:

```
cd Api
dotnet restore
dotnet run
```

This will run the API on port 5000, you can verify be navigating to `http://localhost:5000/api/values`. You should see a list of values returned.

To run the front-end perform the following from the root project directory from other command prompt:

```
npm install
npm start
```

This will run the front-end at `http://localhost:3000`. The front-end makes an API request to `http://localhost:5000/api/values` (cross origin).

You can test that the request is successful in both modern browsers and older browsers (e.g. IE8/9) - the list of integer values returned from the `/api/values` endpoint should be displayed as an unordered list in the front-end.

# The Issue with CORS

Cross origin requests with `XMLHttpRequest` within IE8/9 are not possible, they will result in `Access is denied` error messages. To get around this issue, IE8/9 support a [`XDomainRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XDomainRequest) object. However, `XDomainRequest` has a number of restrictions:

* Requests must be `GET` or `POST`
* Requests must use the same protocol as the page
* Requests only emit `progress`, `timeout`, and `error`
* Requests may only use the `Content-Type` header

> Note `XDomainRequest` was removed in IE10 in favour of using `XMLHttpRequest` with proper CORS support.

This sample uses an alternative to CORS and `XDomainRequest` to achieve cross origin requests.

# Testing in Old IE Versions

In order to test on IE < 10, you can either use an online service such as [BrowserStack](https://www.browserstack.com/) or use one of the various [IE virtual images](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) supplied by Microsoft.

For example, you can download the IE9 on Windows 7 image for [VirtualBox](https://www.virtualbox.org/). With VirtualBox and the image imported, you can select `Machine -> Settings... -> Network -> Adapter 1 -> Attached to: NAT`. Your host machine should then be accessible from `http://10.0.2.2:3000`.

The sample configures both `10.0.2.2` and `localhost` as white listed origins for this purpose. You can edit the `onVirtualMachine` flag within `App.jsx` if you wish to test on VirtualBox.

# How it Works

The sample uses an open source project called [XDomain](https://github.com/jpillora/xdomain), which is available as an npm package.

XDomain uses an alternative technique to CORS completely, and also avoids the use of IE's `XDomainRequest` object. Underneath the hoods it uses [XHook](https://github.com/jpillora/xhook) to intercept `XMLHttpRequest` calls:

1. An iframe is created on the `master` (front-end web app) which points to the `slave`'s (API) proxy
2. `XMLHttpRequest` calls are converted to `postMessage` calls to the iframe
3. The `slave` code running in the iframe recieves those post messages and converts them to XHR requests (effectively to itself, therefore no CORS issues)
4. The `slave` takes the responses and communicates them back to the `master` (front-end) via the iframe

Browser support is any browser that has `postMessage` and `JSON` available. This includes IE 8 and 9, **but does not include IE 6 or IE 7**.

XDomain works with any library that uses `XMLHttpRequest` - this includes jQuery's `$.ajax`, `$.get`, and `$.post`.

This sample is a React application which uses [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) to perform the API request (although a jQuery API service example is also provided).

isomorphic-fetch provides a consistent API on Node and in the browser. It wraps GitHub's [WHATWG Fetch polyfill](https://github.com/github/fetch) which allows the use of `fetch` on browsers that [do not yet support it](http://caniuse.com/#feat=fetch). The WHATWG Fetch polyfill uses `XMLHttpRequest` under the hood - hence **XDomain also works with isomorphic-fetch**.

> Note that you must also use a Promise polyfill in order to use isomorphic-fetch - this sample uses `babel-polyfill`.

With XDomain configured, the alternative iframe approach will be used in all browsers - even those that support CORS. You may wish to selectively apply this to only IE8/9 through the use of IE conditional comments.
