import { json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

export const action = async () => {
  // only for POST requests
  return redirect(`/directory/`);
};

export default function Index() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <h1 className="font-serif font-bold text-5xl mb-5">
        Welcome to Narrative Portfolio!
      </h1>
      <Form method="post">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Explore now
        </button>
      </Form>
    </div>
  );
}
