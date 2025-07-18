import css from "./Header.module.css";
import Link from "next/link";
import TagsMenu from "../TagsMenu/TagsMenu";
import AuthNavigation from "../AuthNavigation/AuthNavigation";

const Header = () => {
  return (
    <header className={css.header}>
      <Link href="/" className={css.headerLink}>
        NoteHub
      </Link>

      <nav className={css.nav} aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link href="/" className={css.navigationLink}>
              Home
            </Link>
          </li>
          <li className={css.navigationItem}>
            <TagsMenu />
          </li>

          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
