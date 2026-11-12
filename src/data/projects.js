/** @type {import("./types").Project[]} */
const records = [
  {
    slug: "nashmi",
    title: "Nashmi",
    subtitle: "A clearer way into civic information",
    kind: "Team project · Civic technology",
    intro: "An Arabic-first platform for exploring public updates, political parties and legislation in Jordan.",
    priority: 1,
    stack: ["Next.js", "TypeScript", "React", "MongoDB"],
    image: { name: "nashmi", alt: "Nashmi’s Arabic home page with a photograph of Amman and navigation for civic information", width: 1891, height: 932, variants: [480, 800, 1200, 1600] },
    repository: "https://github.com/haithamaloufee/Nashmi",
    demo: "https://nashmii.vercel.app/",
    sources: [
      { status: "verified", reference: "https://github.com/haithamaloufee/Nashmi" },
      { status: "verified", reference: "Previously published screenshot public/nashmi.png and public deployment" },
    ],
    sections: [
      { title: "The problem", body: "Following civic updates and looking up legislation can mean jumping between sources. Our hackathon team built an Arabic-first site to put several starting points in one place." },
      { title: "My contribution", body: "I contributed to the interface, including mobile behavior in the assistant, search and filtering in the feed, and video playback controls." },
      { title: "Designing for Arabic", body: "Right-to-left reading order shapes the navigation, layouts and controls. The feed needed to make browsing and narrowing results work on smaller screens alongside richer content such as video." },
      { title: "What came out of it", body: "The public site brings updates, party pages and legislation into one interface. Working on the feed taught me to test search, filters and media controls together, especially on a phone." },
    ],
  },
  {
    slug: "chef-haitham",
    title: "Chef Haitham",
    subtitle: "Dinner from what’s already in the kitchen",
    kind: "Personal project · AI prototype",
    intro: "A recipe prototype that takes a short ingredient list and turns it into a cooking suggestion.",
    priority: 2,
    stack: ["React", "JavaScript", "Gemini"],
    image: { name: "chef", alt: "Chef Haitham’s ingredient list and an example recipe shown in the app", width: 1541, height: 927, variants: [480, 800, 1200, 1541] },
    repository: "https://github.com/haithamaloufee/AI-Chef",
    demo: "https://chef-haitham.vercel.app/",
    sources: [
      { status: "verified", reference: "https://github.com/haithamaloufee/AI-Chef" },
      { status: "verified", reference: "Previously published screenshot public/chef-haitham.png and public deployment" },
    ],
    sections: [
      { title: "The problem", body: "Recipe search often starts with a dish in mind. I wanted to start with a smaller, everyday question: what can I make with the ingredients I already have?" },
      { title: "My contribution", body: "I built the React ingredient editor and recipe view. The interface checks for duplicate ingredients, asks for at least three valid items and shows progress and errors while a recipe is generated." },
      { title: "The approach", body: "The prototype normalizes the ingredient list before passing it to Gemini. I kept the inputs visible beside the result so it’s easy to change the list and try another combination." },
      { title: "What came out of it", body: "The project gave me a small workflow for learning how to design around the waiting time and failure modes of a model response. Live generation depends on the external API configuration." },
    ],
  },
  {
    slug: "government-services-portal",
    title: "Government Services Portal",
    subtitle: "An Arabic prototype for public services",
    kind: "Personal project · Service design prototype",
    intro: "An Arabic-language demo of finding a service, requesting a document and moving through a payment flow.",
    priority: 3,
    stack: ["HTML", "CSS", "JavaScript", "Express", "SQLite"],
    image: { name: "services", alt: "The prototype’s Arabic home page with document service options", width: 1533, height: 906, variants: [480, 800, 1200, 1533] },
    repository: "https://github.com/haithamaloufee/government-services-portal",
    demo: "https://government-services-portal.vercel.app/",
    sources: [
      { status: "verified", reference: "https://github.com/haithamaloufee/government-services-portal" },
      { status: "verified", reference: "Previously published screenshot public/gov-portal.png and public deployment" },
    ],
    sections: [
      { title: "The problem", body: "I wanted to see what an online document request could look like from the perspective of someone choosing a service and following it through to checkout." },
      { title: "My contribution", body: "I built the Arabic service catalogue and the prototype’s lookup, document and payment screens. The repository includes an Express and SQLite backend alongside the front-end demo." },
      { title: "The constraint", body: "This was a standalone demo with seeded records and a simulated payment flow. I kept the service choice and its next step visible so the path could be explored without a live government integration." },
      { title: "What came out of it", body: "The project let me map a multi-step service from the catalogue through request and payment screens. It also gave me practice keeping the interface consistent across pages and right-to-left layouts." },
    ],
  },
];

export const projects = records.filter(project => project.sources.every(source => source.status === "verified"))
  .sort((first, second) => first.priority - second.priority);
