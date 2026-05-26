import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t pt-8 pb-10 text-sm text-gray-500">
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/disclaimer" className="hover:underline">
          Disclaimer
        </Link>

        <Link href="/privacy" className="hover:underline">
          Privacy
        </Link>

        <Link href="/terms" className="hover:underline">
          Terms
        </Link>
      </div>
    </footer>
  );
}