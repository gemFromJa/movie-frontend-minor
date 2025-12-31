"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageContentWrapper from "../ui/PageContentWrapper";
import clsx from "clsx";
import { updateParams } from "@/utils/params";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);
  const pivot = Math.max(1, currentPage - 2);

  const pages = [];
  for (let i = pivot; i <= Math.min(totalPages, pivot + 5); i++) {
    pages.push(i);
  }

  const updatePage = (newPage: number) => {
    const params = updateParams({ page: String(newPage) });

    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      <PageContentWrapper className="px-4 py-3 flex justify-between">
        {!!totalPages && (
          <div>
            Page {currentPage} of {totalPages}
          </div>
        )}

        {totalPages > 1 && (
          <div>
            <button
              className="mr-2 cursor-pointer disabled:opacity-30 disabled:cursor-auto"
              onClick={() => updatePage(1)}
              disabled={currentPage === 1}
            >
              First
            </button>
            {pages.length > 0 &&
              pages.map((p) => (
                <PageButton
                  key={p}
                  active={p === currentPage}
                  onClick={() => updatePage(p)}
                  disabled={p === currentPage}
                >
                  {p}
                </PageButton>
              ))}

            <button
              onClick={() => updatePage(totalPages)}
              disabled={currentPage === totalPages}
              className="ml-2 cursor-pointer disabled:opacity-30 disabled:cursor-auto"
            >
              Last
            </button>
          </div>
        )}
      </PageContentWrapper>
    </div>
  );
}

const PageButton = ({
  children,
  onClick,
  active,
  disabled,
}: {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "cursor-pointer mx-1 px-3 py-1 rounded-md ",
        active && "bg-blue-500 text-white",
        !active && "bg-gray-200"
      )}
    >
      {children}
    </button>
  );
};
