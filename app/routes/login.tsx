import { json, type MetaFunction } from "@remix-run/node";
import { db } from "../utils/db.server";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Drawdash" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  return json({
    jokeListItems: await db.joke.findMany(),
  });
};

export default function Login() {
  const data = useLoaderData<typeof loader>();

  console.log(data);

  return (
    <div>
      <section className="flex flex-col items-center justify-center min-h-screen py-2">
        Login
      </section>
    </div>
  );
}
