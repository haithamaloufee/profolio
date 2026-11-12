import { Credentials } from "./components/Credentials.jsx";
import { Home } from "./components/Home.jsx";
import { Footer, Header } from "./components/Layout.jsx";
import { Project } from "./components/Project.jsx";
import { TextLink } from "./components/UI.jsx";

export default function App({ route, review }) {
  return (
    <>
      <Header route={route} review={review} />
      <main id="main-content" tabIndex={-1}>
        {route.page === "home" && <Home />}
        {route.page === "credentials" && <Credentials review={review} />}
        {route.page === "project" && <Project project={route.project} />}
        {route.page === "not-found" && <div className="wrap subpage-head not-found"><h1>Page not found</h1><TextLink href="/" direction="left">Back to home</TextLink></div>}
      </main>
      <Footer />
    </>
  );
}
