import {
  redirect,
  type LoaderFunction,
  type MetaFunction,
} from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "PortNet | Traffic Monitoring" }];
};

export const loader: LoaderFunction = async ({ request }) => {
  return redirect("/dashboard");
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div>Redirecting...</div>
    </div>
  );
}
