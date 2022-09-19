
import "../styles/css/style.css";
import logo from "../logo/icon-left-font-monochrome-white.svg";

function Footer() {
  return (
    <footer class="footer">
      <img className="footer__logo" src={logo} alt="groupomania logo" />
      <p>© 2022</p>
    </footer>
  );
}

export default Footer;
