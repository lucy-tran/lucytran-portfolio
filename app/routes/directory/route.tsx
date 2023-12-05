import { cssBundleHref } from "@remix-run/css-bundle";
import { json } from "@remix-run/node";
import {
  Form,
  NavLink,
  LiveReload,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";

import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import appStyleSheet from "./directory.css";
import { getUsers } from "~/models/user.server";
import { useEffect, useState } from "react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStyleSheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

// This runs when the URL changes due to a GET request,
// or when the app rerenders due to state changes
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const users = await getUsers(q);
  return json({ users, q });
};

export default function App() {
  const { users, q } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const submit = useSubmit();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");
  // the query now needs to be kept in state
  const [query, setQuery] = useState(q || "");

  // we still have a `useEffect` to synchronize the query
  // to the component state on back/forward button clicks
  useEffect(() => {
    setQuery(q || "");
  }, [q]);

  return (
    <body>
      <div id="sidebar">
        <h1>Narrative Portfolios</h1>
        <div>
          <Form
            id="search-form"
            role="search"
            onChange={(event) => {
              const isFirstSearch = q === null;
              submit(event.currentTarget, {
                replace: !isFirstSearch, // replace the previous entry in the navigation stack
              });
            }}
          >
            <input
              id="q"
              aria-label="Search users"
              className={searching ? "loading" : ""}
              value={query}
              placeholder="Search"
              type="search"
              name="q"
              // synchronize user's input to component state
              onChange={(event) => setQuery(event.currentTarget.value)}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
          </Form>
        </div>
        <nav>
          {users && users.length ? (
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                    to={`../directory/${user.name}`}
                  >
                    {user.firstName || user.lastName ? (
                      <>
                        {user.firstName} {user.lastName}
                      </>
                    ) : (
                      <i>No name</i>
                    )}{" "}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No users</i>
            </p>
          )}
        </nav>
      </div>
      <div
        className={
          navigation.state === "loading" && !searching ? "loading" : ""
        }
        id="detail"
      >
        <Outlet />
      </div>
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  );
}
