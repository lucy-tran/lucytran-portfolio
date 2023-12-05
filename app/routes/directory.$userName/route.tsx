import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

import { getUserByUsername } from "~/models/user.server";
import invariant from "tiny-invariant";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.userName, "Missing userName param");
  const user = await getUserByUsername(params.userName);
  if (!user) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ user });
};

export default function UserOverview() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <div id="user">
      <div>
        <img
          alt={`${user.firstName} ${user.lastName}`}
          key={user.profilePic}
          src={user.profilePic ?? "https://placehold.co/800x600"}
        />
      </div>

      <div>
        <h1>
          {user.firstName || user.lastName ? (
            <>
              {user.firstName} {user.lastName}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
        </h1>

        {user.intro ? (
          <div className="mt-4 flex flex-col">
            <h2 className="font-bold">Introduction:</h2>
            <p>{user.bio}</p>
            <p>{user.intro}</p>
            <p className="leading" />
          </div>
        ) : null}

        <div className="mt-4">
          <Link
            className="text-blue-500 hover:text-blue-700"
            to={`../../portfolio/${user.name}`}
          >
            Link to my portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
