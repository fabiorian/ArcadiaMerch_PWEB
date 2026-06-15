import { useState } from "react";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import CartPanel from "./components/CartPanel";
import { StoreProvider } from "./context/StoreContext";
import Catalog from "./pages/Catalog";
import Home from "./pages/Home";
import About from "./pages/About";
import Success from "./pages/Success"; 

function App() {
  const [currentPage, setCurrentPage] = useState("home"); 
  const [searchQuery, setSearchQuery] = useState("");
  const [currentCategory, setCurrentCategory] = useState("all");
  const [currentSort, setCurrentSort] = useState("featured");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleNav = (pageName) => {
    setCurrentPage(pageName);
  };

  return (
    <StoreProvider>
      <Topbar 
        page={currentPage} 
        onNav={handleNav} 
        search={searchQuery} 
        onSearch={(text) => {
          setSearchQuery(text);
          if (text.trim() !== "" && currentPage !== "catalog") {
            setCurrentPage("catalog");
          }
        }}
        onToggleCart={() => setIsCartOpen(!isCartOpen)} 
      />
      
      <div style={{ display: 'flex', height: 'calc(100vh - 52px)', overflow: 'hidden' }}>
        <div style={{ width: '250px', flexShrink: 0, height: '100%' }}>
          <Sidebar 
            page={currentPage} 
            onNav={handleNav}
            category={currentCategory}
            onCategory={setCurrentCategory}
            sort={currentSort}
            onSort={setCurrentSort}
          />
        </div>

        <main className="main-content" style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {currentPage === "home" && <Home onNav={handleNav} />}
          {currentPage === "catalog" && <Catalog category={currentCategory} sort={currentSort} search={searchQuery} />}
          {currentPage === "about" && <About />}
          {currentPage === "wishlist" && <h1 style={{ color: 'var(--tx)' }}>Seus Favoritos</h1>}
          {currentPage === "success" && <Success onNav={handleNav} />}
        </main>

        <CartPanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onNav={handleNav} />
        
      </div>
    </StoreProvider>
  );
}

export default App;