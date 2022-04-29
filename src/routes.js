import React, { Fragment, lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import { ROUTES_NAMES } from "./constants";

export const renderRoutes = (routes = []) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        {routes.map((route, i) => {
          const Guard = route.guard || Fragment;
          const Layout = route.layout || Fragment;
          const Component = route.component;

          return (
            <Route
              key={i}
              path={route.path}
              exact={route.exact}
              render={(props) => (
                <Guard>
                  <Layout>
                    {route.routes ? (
                      renderRoutes(route.routes)
                    ) : (
                      <Component {...props} />
                    )}
                  </Layout>
                </Guard>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  );
};

const routes = [
  {
    //exact: true,
    path: ROUTES_NAMES.HOME,
    //layout: Layout,
    routes: [
      {
        path: ROUTES_NAMES.HOME,
        exact: true,
        component: lazy(() => import("./pages/Home")),
      },
      {
        path: ROUTES_NAMES.MINTING,
        exact: true,
        component: lazy(() => import("./pages/Minting")),
      },
      {
        path: "/",
        exact: true,
        component: () => <Redirect to={ROUTES_NAMES.HOME} />,
      },
      {
        path: "*",
        exact: true,
        component: () => <Redirect to={ROUTES_NAMES.HOME} />,
      },
    ],
  },
  {
    path: "/",
    exact: true,
    component: () => <Redirect to={ROUTES_NAMES.HOME} />,
  },
  {
    path: "*",
    exact: true,
    component: () => <Redirect to={ROUTES_NAMES.HOME} />,
  },
];

export default routes;
