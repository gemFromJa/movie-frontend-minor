import PageContentWrapper from "./PageContentWrapper";
import Search from "./Search";
import Link from "next/link";

interface HeaderProps {
  withSearch?: boolean;
}

export default function Header({ withSearch = true }: HeaderProps) {
  return (
    <header className="mb-10">
      <PageContentWrapper className="py-4 grid grid-cols-3 gap-2 items-center px-3">
        <>
          <h1 className="text-3xl font-bold">MovieApp</h1>
          {withSearch && <Search />}
          <div>
            <Link
              href="/movies"
              className="text-blue-600 hover:underline float-right"
            >
              Movies
            </Link>
          </div>
        </>
      </PageContentWrapper>
    </header>
  );
}
