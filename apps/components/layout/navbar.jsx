import { useState, useEffect } from 'react';
import ActiveLink from '@/components/shared/active-link';
import { siteTitle } from '@/config/setting';
import { getAllNavItem } from '@/config/nav-item';
import Auth from '@/components/layout/auth';

function Navbar() {
  const [collapse, setCollapse] = useState(false);
  const [token, setToken] = useState(false);

  useEffect(() => {
    const tokenLocal = localStorage.getItem('token');

    if (tokenLocal) {
      setToken(true);
    }
  }, []);

  const handleClick = () => {
    setCollapse((prev) => {
      return !prev;
    });
  };

  const NAV_ITEM = getAllNavItem();

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark"
      aria-label="Main navigation"
    >
      <div className="container">
        <ActiveLink href="/" activeClassName="">
          <a className="navbar-brand">{siteTitle()}</a>
        </ActiveLink>
        <div
          className="navbar-toggler p-0 border-0"
          type="button"
          id="navbarSideCollapse"
          aria-label="Toggle navigation"
          onClick={handleClick}
          role="button"
        >
          {collapse ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              fill="currentColor"
              className="bi bi-x"
              viewBox="0 0 16 16"
              alt="Tutup Menu"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-list"
              viewBox="0 0 16 16"
              alt="Buka Menu"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          )}
        </div>
        <div
          className={`navbar-collapse offcanvas-collapse${
            collapse ? ' open' : ''
          }`}
          id="navbarsExampleDefault"
        >
          <ul onClick={handleClick} className="navbar-nav me-auto mb-2 mb-lg-0">
            {NAV_ITEM.map((item, i) => (
              <li className="nav-item" key={i}>
                <ActiveLink
                  href={item.href}
                  activeClassName="active"
                  scroll={item.href.includes('#') ? false : true}
                >
                  <a className="nav-link">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      fill="currentColor"
                      className={`${item.iconClass} mb-1`}
                      viewBox="0 0 16 16"
                      alt={item.title}
                    >
                      {item.iconPath.map((itemPath, i) => (
                        <path
                          key={i}
                          fillRule={item.iconFillRule}
                          d={itemPath}
                        />
                      ))}
                    </svg>{' '}
                    {item.title}
                  </a>
                </ActiveLink>
              </li>
            ))}
            <Auth isToken={token} />
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
