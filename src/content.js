import { copy } from "./copy.js";
import { credentials } from "./data/credentials.js";
import { community, experience, portrait, ycs } from "./data/profile.js";
import { practiceProjects, projects } from "./data/projects.js";
import {
  credentialArabic, credentialDescriptions, credentialKinds, issuerArabic, practiceArabic, profileArabic, projectArabic,
} from "./data/arabic.js";

const communityPhotos = {
  chess: {
    src: "/media/chess-event.webp", width: 900, height: 600,
    alt: "Haitham seated beside a chessboard in a tournament hall", caption: "At the chessboard in the tournament hall",
  },
  civic: {
    src: "/media/student-event.webp", width: 900, height: 600,
    alt: "Haitham standing with his student team at a university-level competition", caption: "With my student team during our hackathon participation",
  },
};

export function localizedPath(path, language) {
  return language === "ar" ? "/ar" + (path === "/" ? "" : path) : path;
}

export function getContent(language) {
  const ar = language === "ar";
  return {
    language, copy: copy[language],
    portrait: ar ? { ...portrait, alt: profileArabic.portrait } : portrait,
    experience: ar ? profileArabic.experience : experience,
    ycs: ar ? profileArabic.ycs : ycs,
    community: community.map(item => {
      const photo = communityPhotos[item.id];
      if (!ar) return { ...item, photo };
      const { alt, caption, linkLabel, ...text } = profileArabic.community[item.id];
      return { ...item, ...text, link: { ...item.link, label: linkLabel }, photo: { ...photo, alt, caption } };
    }),
    projects: ar ? projects.map(project => {
      const { alt, ...text } = projectArabic[project.slug];
      return { ...project, ...text, image: { ...project.image, alt } };
    }) : projects,
    practice: ar ? practiceProjects.map((project, index) => ({
      ...project, title: practiceArabic[index][0], subtitle: practiceArabic[index][1],
    })) : practiceProjects,
    credentials: ar ? credentials.map(item => ({
      ...item, title: credentialArabic[item.id], officialTitle: item.title, originalIssuer: item.issuer,
      issuer: issuerArabic[item.issuer] ?? item.issuer, kind: credentialKinds[item.kind],
      description: item.description && credentialDescriptions[item.id],
    })) : credentials,
  };
}
