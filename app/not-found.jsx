import Link from "next/link";
import Navbar from "@/components/navbar";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="shell py-32">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">That page is not part of the architecture.</h1>
        <p className="lede mt-4">The link may be old. The work is on the home page.</p>
        <Link href="/" className="btn btn-solid mt-8 no-underline">
          Back to the portfolio
        </Link>
      </main>
    </>
  );
}
