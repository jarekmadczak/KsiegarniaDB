import Link from "next/link";

export default function Logo() {
  return (
    <Link href={'/'} className="flex m-3">
     
      <span className="text-xl font-bold">
          AdminPanel
        </span>
    </Link>
  );
}