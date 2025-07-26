import {createRootRoute, Outlet} from "@tanstack/react-router";
import {TanStackRouterDevtools} from "@tanstack/react-router-devtools";
import "../index.css";
import {Provider} from "react-redux";
import {store} from "@/app/store";

export const Route = createRootRoute({
  component: () => (
    <>
      <Provider store={store}>
        <Outlet />
      </Provider>
      <TanStackRouterDevtools />
    </>
  ),
});
