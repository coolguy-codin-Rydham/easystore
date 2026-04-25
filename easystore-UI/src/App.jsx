import { useNavigation, Outlet } from 'react-router-dom';
import Footer from "./components/Footer/Footer.jsx";
import Header from "./components/Header.jsx";

function App() {
  const navigation = useNavigation();
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {navigation.state === "loading" ? (
          <div className="flex items-center justify-center py-32">
            <span className="text-4xl font-semibold text-primary dark:text-light">
              Loading...
            </span>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
