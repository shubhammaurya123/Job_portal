import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__addr">
        <h1 className="footer__logo">Superio</h1>
        <div>
          <h4>Call Us</h4>
          <a href="tel:+911234567897"> 123 456 7897</a>
        </div>
        <div>
          <p>329 Queensberry Street, North Melbourne VIC</p>
        </div>
        <a className="mailto" href="mailto:support@superio.com">
          support@superio.com
        </a>
      </div>

      <ul className="footer__nav">
        <li className="nav__item">
          <h2 className="nav__title">For Candidates</h2>

          <ul className="nav__ul">
            <li>
              <a href="#">Browse Jobs</a>
            </li>

            <li>
              <a href="#">Browse Categories</a>
            </li>

            <li>
              <a href="#">Candidate Dashboard</a>
            </li>
            <li>
              <a href="#">Job Alerts</a>
            </li>
            <li>
              <a href="#">My Bookmarks</a>
            </li>
          </ul>
        </li>

        <li className="nav__item">
          <h2 className="nav__title">For Employers</h2>

          <ul className="nav__ul">
            <li>
              <a href="#">Online</a>
            </li>

            <li>
              <a href="#">Print</a>
            </li>

            <li>
              <a href="#">Alternative Ads</a>
            </li>
          </ul>
        </li>

        <li className="nav__item">
          <h2 className="nav__title">About Us</h2>

          <ul className="nav__ul">
            <li>
              <a href="#">Online</a>
            </li>

            <li>
              <a href="#">Print</a>
            </li>

            <li>
              <a href="#">Alternative Ads</a>
            </li>
          </ul>
        </li>

        <li className="nav__item">
          <h2 className="nav__title">Helpful Resources</h2>

          <ul className="nav__ul">
            <li>
              <a href="#">Online</a>
            </li>

            <li>
              <a href="#">Print</a>
            </li>

            <li>
              <a href="#">Alternative Ads</a>
            </li>
          </ul>
        </li>
      </ul>

      <div className="legal">
        <p>&copy; 2023 Superio by ib-themes. All Right Reserved.</p>

        <div className="legal__links">
          <a href="">
            <FaFacebookF />
          </a>
          <a href="">
            <FaInstagram />
          </a>
          <a href="">
            <FaTwitter />
          </a>
          <a href="">
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
