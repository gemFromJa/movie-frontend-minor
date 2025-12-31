"use client";

import { useRouter } from "next/navigation";

export default function Back() {
  const router = useRouter();
  return (
    <button className="px-3 cursor-pointer" onClick={() => router.back()}>
      back
    </button>
  );
}
