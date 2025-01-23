import { Footer, Header } from "./components";
import styles from "./App.module.scss";
import { AppRouter } from "./components/Router/AppRouter";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <AppRouter />
      </div>
      <Footer />
      <ToastContainer newestOnTop />
    </>
  );
}

export default App;
