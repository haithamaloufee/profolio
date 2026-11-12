export const siteUrl = "https://www.haitham.website";

export const personal = {
  name: "Haitham Aloufee",
  location: "Jordan",
  title: "Full-stack developer & CIS student",
  bio: "I’m Haitham, a Computer Information Systems student in Jordan. I build web applications around practical ideas, from civic information to figuring out what to cook.",
  sources: [
    { status: "verified", reference: "Haitham_Aloufee_Professional_CV.pdf" },
    { status: "verified", reference: "https://github.com/haithamaloufee" },
  ],
};

export const socialLinks = {
  github: "https://github.com/haithamaloufee",
  linkedin: "https://www.linkedin.com/in/haithamaloufee/",
  email: "mailto:haithamaloufee@gmail.com",
  sources: [{ status: "verified", reference: "Public GitHub and LinkedIn profiles; email previously published in src/data/profile.js at e6f543a" }],
};

export const portrait = {
  name: "haitham",
  alt: "Haitham Aloufee seated in a dark suit",
  width: 731,
  height: 1024,
  variants: [360, 540, 731],
  priority: 1,
  source: { status: "verified", reference: "Previously published portrait, public/me.jpg at e6f543a" },
};

export const experience = [
  {
    title: "Software development training",
    organization: "Crown Prince Foundation",
    period: "2026",
    type: "Training",
    description: "Contributed to web development on a trainers network project during my software development training.",
    priority: 1,
    sources: [
      { status: "verified", reference: "Owner brief and public LinkedIn experience" },
      { status: "private", reference: "Local TMS Git history, September 2026" },
    ],
  },
  {
    title: "BSc in Computer Information Systems",
    organization: "Tafila Technical University",
    period: "2023 – present",
    type: "Education",
    description: "Studying how software and data fit together, and applying what I learn through web projects.",
    priority: 2,
    sources: [{ status: "verified", reference: "Haitham_Aloufee_Professional_CV.pdf and public LinkedIn education" }],
  },
];

export const community = [
  {
    id: "chess",
    title: "Teaching chess",
    type: "Chess & teaching",
    body: "I led a two-day chess strategy workshop with the Deanship of Student Affairs at Tafila Technical University. I also spoke at the Chess Basics Workshop during the IEEE RAS RASCadia Bootcamp.",
    link: { href: "https://ratings.fide.com/profile/8125112", label: "FIDE profile" },
    priority: 1,
    sources: [{ status: "verified", reference: "chess.png, شهادة تقدير هيثم العوفي.png and public LinkedIn workshop post" }],
  },
  {
    id: "civic",
    title: "Building with a student team",
    type: "Civic participation",
    body: "I took part in the Ana Usharek Universities program and helped build Nashmi with a student team for the Usharek hackathon.",
    link: { href: "https://www.iec.jo/index.php/node/37630", label: "About the hackathon" },
    priority: 2,
    sources: [
      { status: "verified", reference: "Public LinkedIn program post and Nashmi Git history" },
      { status: "verified", reference: "https://www.iec.jo/index.php/node/37630" },
    ],
  },
];
