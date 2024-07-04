import { Provider } from "react-redux";
import "./App.css";
import FooterSection from "./Components/FooterSection";
import NavBar from "./Components/NavBar";
import TrustedCompaniesList from "./Components/TrustedCompaniesList";
import BrowseByCategory from "./Pages/BrowseByCategory";
import ForClientPage from "./Pages/ForClientPage";
import HomePage from "./Pages/HomePage";
import JobOppurtunity from "./Pages/JobOppurtunity";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      {/* <NavBar /> */}
      <HomePage />
      <TrustedCompaniesList />
      <JobOppurtunity />
      <BrowseByCategory />
      <ForClientPage />
      {/* <FooterSection /> */}
    </Provider>
  );
}

export default App;
