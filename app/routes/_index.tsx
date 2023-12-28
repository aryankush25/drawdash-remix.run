import { json, LoaderFunction, type MetaFunction } from "@remix-run/node";
import { getUser, requireUserId } from "../utils/session.server";
import { Link, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const user = await getUser(request);

  return json({
    userId,
    user,
  });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  console.log("#### data", data);

  return (
    <div>
      {data.user ? (
        <div className="user-info">
          <span>{`Hi ${data.user.username}`}</span>
          <form action="/logout" method="post">
            <button type="submit" className="button">
              Logout
            </button>
          </form>
        </div>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
}
