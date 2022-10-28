import { registerApplication, start } from "single-spa";

fetch("https://run.mocky.io/v3/ade44f21-777f-4086-b660-c084523c8e07")
  .then(res => res.json())
  .then(responseRoutesAPI => {
    responseRoutesAPI.applications.map(singleRoute => {
      registerApplication({
        name: singleRoute.name,
        app: () => System.import(singleRoute.package),
        activeWhen: singleRoute.exact ? 
          (location) => location.pathname === singleRoute.activeWhen :
          [singleRoute.activeWhen],
      });
    })
  })
  .finally(() => {
    start({
      urlRerouteOnly: true,
    });
  })

  // RETORNO DA API:

  /*
  {
  "applications": [
    {
      "name": "@single-spa/welcome",
      "package": "@single-spa/welcome",
      "activeWhen": "/",
      "exact": true
    },
     {
      "name": "@rvp/react-single",
      "package": "@rvp/react-single",
      "activeWhen": "/react-single",
      "exact": true
    },
    {
      "name": "@rvp/react-multiples",
      "package": "@rvp/react-multiples",
      "activeWhen": "/react-multiples",
      "exact": false
    },
    {
      "name": "@rvp/react-route",
      "package": "@rvp/react-route",
      "activeWhen": "/",
      "exact": true
    },
      {
      "name": "@rvp/react-lazy",
      "package": "@rvp/react-lazy",
      "activeWhen": "/react-lazy",
      "exact": false
    },
    {
      "name": "@rvp/react-header",
      "package": "@rvp/react-header",
      "activeWhen": "/",
      "exact": false
    }
  ]
}
  */