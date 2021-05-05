import logo from "../assets/vinted_logo.png";

const Header = () => {
  return (
    <header>
      <div className="container header">
        <a href="/">
          <img src={logo} alt="vinted logo" />
        </a>
        <div className="search_container">
          <form action="">
            <input type="text" placeholder="Recherche des articles" />
          </form>
        </div>
        <div className="connect_container">
          <button className="signup">S'inscrire</button>
          <button className="login">Se connecter</button>
          <button className="cart">Vends tes articles</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
