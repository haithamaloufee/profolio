export const siteUrl = "https://www.haitham.website";

export const personal = {
  name: "Haitham Aloufee",
  location: "Jordan",
  title: "Full-Stack Web Developer",
  bio: "Haitham Aloufee is a full-stack web developer in Jordan. He contributed to the Youth Trainers Network and founded Youth Computer Scientists (YCS).",
  sources: [
    { status: "verified", reference: "Haitham_Aloufee_Professional_CV.pdf" },
    { status: "verified", reference: "https://github.com/haithamaloufee" },
  ],
};

const phone = "+962782940161";

export const socialLinks = {
  github: "https://github.com/haithamaloufee",
  linkedin: "https://www.linkedin.com/in/haithamaloufee/",
  email: "mailto:haithamaloufee@gmail.com",
  phone: "tel:" + phone,
  phoneNumber: phone,
  whatsapp: "https://wa.me/" + phone.slice(1),
  sources: [{ status: "verified", reference: "Public GitHub and LinkedIn profiles; email previously published in src/data/profile.js at e6f543a" }],
};

export const portrait = {
  name: "haitham",
  alt: "Haitham Aloufee outdoors beside a tree, wearing a dark sweater",
  width: 1100,
  height: 1100,
  variants: [320, 480, 720, 960],
  priority: 1,
  source: { status: "verified", reference: "Outdoor portrait supplied and selected by Haitham in the refinement request" },
};

export const experience = [
  {
    title: "Software development training",
    organization: "Crown Prince Foundation",
    period: "2026",
    type: "Training",
    description: "I contributed to the Youth Trainers Network’s public directory, trainer profile editing, and display of past training experience.",
    projectSlug: "youth-trainers-network",
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


export const ycs = {
  title: "Youth Computer Scientists",
  role: "Founder",
  philosophy: "Programming isn’t just about code. It’s a way of thinking.",
  summary: "I founded YCS as a student-led, nonprofit initiative to help university students build practical computer science foundations through collaborative programming and real-world problem-solving.",
  planned: "The first edition was planned for Tafila Technical University under Al-Nokhba Club. The syllabus moves from computational thinking and programming fundamentals toward building a project as a team.",
  source: { status: "verified", reference: "Owner’s refinement brief, YCS Program Syllabus.docx and YCS activity proposal" },
};

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

export const volunteering = {
  title: "English Language Olympia (ELO 2026)",
  body: "I was selected to volunteer with the Classification and Evaluation Committee for the event scheduled for December 2026 in Amman.",
  href: "https://elo.international/uni/",
  sources: [
    { status: "verified", reference: "Haitham’s confirmation of his volunteer selection and committee name" },
    { status: "verified", reference: "Official ELO university event website for the schedule and location" },
  ],
};
