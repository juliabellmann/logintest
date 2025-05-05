import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Willkommen zur App</h1>
      <p><Link href="/login">Zur Anmeldung</Link></p>
    </div>
  );
}
