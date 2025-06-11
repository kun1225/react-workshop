import Link from 'next/link';

export default function Home() {
  return (
    <nav className="container mx-auto py-32">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/react-compiler">react-compiler</Link>
        </li>
        <li>
          <Link href="/use-transition">use-transition</Link>
        </li>
        <li>
          <Link href="/use-deferred-value">use-deferred-value</Link>
        </li>
      </ul>

      <p className="mt-8">Reels</p>
      <ul>
        <li>
          <Link href="/reels/use-memo">use-memo</Link>
        </li>
      </ul>

      <p className="mt-8">Test</p>
      <ul>
        <li>
          <Link href="/test/combine-context">combine-context</Link>
        </li>
      </ul>
    </nav>
  );
}
