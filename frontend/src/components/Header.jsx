function Header() {
    return (
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl">Hina Tours And Travel</h1>
        <nav>
          <a href="/" className="mr-4">Home</a>
          <a href="/tours" className="mr-4">Tours</a>
          <a href="/hotels" className="mr-4">Hotels</a>
          <a href="/properties">Properties</a>
        </nav>
      </header>
    );
  }
  
  export default Header;