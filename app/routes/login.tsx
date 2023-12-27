import { json, type MetaFunction } from "@remix-run/node";
import { db } from "../utils/db.server";
import { useLoaderData, useSearchParams } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Drawdash" },
    { name: "description", content: "Welcome to Drawdash!" },
  ];
};

export const loader = async () => {
  return json({
    jokeListItems: await db.joke.findMany(),
  });
};

export default function Login() {
  const data = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();

  console.log(data);

  return (
    <div>
      <div data-light="">
        <h1>Login</h1>
        <form method="post">
          <input
            type="hidden"
            name="redirectTo"
            value={searchParams.get("redirectTo") ?? undefined}
          />
          <fieldset>
            <legend>Login or Register?</legend>
            <label>
              <input
                type="radio"
                name="loginType"
                value="login"
                defaultChecked
              />{" "}
              Login
            </label>
            <label>
              <input type="radio" name="loginType" value="register" /> Register
            </label>
          </fieldset>
          <div>
            <label htmlFor="username-input">Username</label>
            <input type="text" id="username-input" name="username" />
          </div>
          <div>
            <label htmlFor="password-input">Password</label>
            <input id="password-input" name="password" type="password" />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
