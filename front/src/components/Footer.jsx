
import "../styles/css/style.css";
import logo from "../logo/icon-left-font-monochrome-black.svg";

function Footer() {
  return (
    <footer className="footer">
      <img className="footer__logo" src={logo} alt="groupomania logo" />
      <p>© 2022</p>
    </footer>
  );
}

export default Footer;
