import { redirect, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { loginSessionStorage } from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return [{ title: "PortNet | Traffic Monitoring" }];
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await loginSessionStorage.getSession(request.headers.get("Cookie"));

  if (!session || !session.data.user) return redirect("/login");

  return redirect("/dashboard");
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div>Redirecting...</div>
    </div>
  );
}

