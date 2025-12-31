import clsx from "clsx";
import React from "react";

export default function PageContentWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("max-w-7xl w-full mx-auto", className)}>
      {children}
    </div>
  );
}
