import logoImage from "@/assets/logo.png";
import Link from "next/link";

export default function MainHeader() {
  return (
    <header>
      <Link href="/">
        <img src={logoImage.src} alt="a plate with food on it" />
        NextLevel Food
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/meals">Browse Meals</Link>
          </li>
          <li>
            <Link href="/community">Foodies community</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
