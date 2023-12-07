import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

import { getUserByUsername } from "~/models/user.server";
import { getPageTitleByUserIdAndOrder } from "~/models/page.server";
import invariant from "tiny-invariant";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.userName, "Missing userName param");
  const user = await getUserByUsername(params.userName);
  if (!user) {
    throw new Response("Not Found", { status: 404 });
  }
  const nextPageTitle = await getPageTitleByUserIdAndOrder(user.id, 1);
  return json({ user, nextPageTitle });
};

export default function PortfolioHome() {
  const { user, nextPageTitle } = useLoaderData<typeof loader>();

  return (
    <div className="w-full h-screen relative">
      <div className="absolute w-full h-full bg-cover bg-center bg-hero-1 opacity-50 z-0" />
      <div className="pt-10 md:pt-0 sm:pt-10 2xl:pt-0 flex h-full items-center">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid items-center grid-cols-1 lg:grid-cols-2">
            <div className="z-10 flex flex-col">
              <h2 className="flex justify-center lg:inline text-4xl font-serif leading-tight sm:text-5xl lg:text-5xl">
                {user.bio}
              </h2>
              <p className="font-sans font-light mt-3 text-xl leading-relaxed md:mt-8">
                {user.intro}
              </p>
              <Link
                to={`./${nextPageTitle}`}
                title=""
                className="inline-flex justify-center lg:justify-left items-center px-6 py-4 mt-8 lg:mt-16 font-serif duration-500 bg-gray-200 border-2 border-gray-500 text-2xl rounded-full hover:bg-white hover:text-black hover:translate-x-4 hover:-translate-y-2"
                role="button"
              >
                OK, let's see how it'll go!
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={4}
                  stroke="#BBBBBB"
                  className="w-6 h-6 pl-2 !relative !flex-[0_0_auto]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Link>
            </div>

            <div className="relative">
              <img
                className="w-full max-h-full object-contain xl:max-w-lg xl:mx-auto"
                src={user.profilePic ?? "https://www.placeholder.com/600x800"}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
