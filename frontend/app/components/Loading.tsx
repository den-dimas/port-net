export default function Loading({
  message = "Loading...",
}: {
  message?: string;
}) {
  return (
    <div
      id="loading..."
      className="w-full h-full flex items-center justify-center"
    >
      <h1 className="font-bold text-xl">{message}</h1>
    </div>
  );
}
