import PageContentWrapper from "@/components/ui/PageContentWrapper";
import Search from "@/components/ui/Search";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 font-sans dark:bg-black">
      {/* list all movies here */}
      <PageContentWrapper className="my-auto">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-zinc-800 dark:text-zinc-200">
            Welcome to MovieAPP
          </h1>
          <p className="mb-8 text-zinc-600 dark:text-zinc-400">
            Your ultimate destination for movie information and reviews.
          </p>
          <div className="max-w-1/2 mx-auto">
            <Suspense>
              <Search />
            </Suspense>
          </div>
          <div>
            <Link
              href="/movies"
              className="text-blue-600 hover:underline mt-6 inline-block"
            >
              Or browse all movies
            </Link>
          </div>
        </div>
      </PageContentWrapper>
    </div>
  );
}
