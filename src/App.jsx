import { Credentials } from "./components/Credentials.jsx";
import { Home } from "./components/Home.jsx";
import { Footer, Header } from "./components/Layout.jsx";
import { Project } from "./components/Project.jsx";
import { TextLink } from "./components/UI.jsx";
import { localizedPath } from "./content.js";

export default function App({ route, content, review }) {
  const { copy: c, language } = content;
  return (
    <>
      <Header route={route} content={content} review={review} />
      <main id="main-content" tabIndex={-1}>
        {route.page === "home" && <Home content={content} />}
        {route.page === "credentials" && <Credentials content={content} review={review} />}
        {route.page === "project" && <Project content={content} project={route.project} />}
        {route.page === "not-found" && <div className="wrap subpage-head not-found"><h1>{c.missing}</h1><TextLink href={localizedPath("/", language)} direction="left">{c.backHome}</TextLink></div>}
      </main>
      <Footer content={content} />
    </>
  );
}
