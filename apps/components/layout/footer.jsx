import Link from 'next/link';
import { siteTitle } from '@/config/setting';

function Footer() {
  return (
    <footer className="bg-light border-top">
      <p className="text-center small my-3">
        Copyright ©{new Date().getFullYear() + ' '}
        <Link href="/">
          <a className="text-decoration-none text-dark">{siteTitle()}</a>
        </Link>
      </p>
    </footer>
  );
}

export default Footer;
