# Getting Started

Ensure you have [.NET Core](https://www.microsoft.com/net/core) installed.

To run the sample API perform the following from the root project directory:

```
cd Api
dotnet restore
dotnet run
```

This will run the API on port 5000, you can verify be navigating to http://localhost:5000/api/values. You should see a list of values returned.

To run the front-end perform the following from the root project directory from other command prompt:

```
npm install
npm start
```

This will run the front-end at http://localhost:3000. The front-end makes an API request to http://localhost:5000/api/values (cross origin). You can test that the request is successful in both modern browsers and older browsers (e.g. IE9) where CORS is not typically supported.
