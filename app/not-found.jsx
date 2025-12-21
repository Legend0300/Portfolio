import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-white to-blue-50 text-slate-900">
      <div className="card-surface p-8 text-center flex flex-col gap-4 max-w-lg">
        <p className="badge w-max mx-auto">Page not found</p>
        <h1 className="text-3xl font-extrabold">That page drifted away</h1>
        <p className="text-slate-600">The route you tried to reach does not exist. Let’s get you back to the portfolio.</p>
        <Link href="/" className="btn-primary mx-auto">
          Back home
        </Link>
      </div>
    </main>
  );
}
