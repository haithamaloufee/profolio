export const categories = ["Cloud", "AI", "Software Development", "Security", "Other"];
const portfolioProfile = "https://www.linkedin.com/in/haithamaloufee/";
const scrimba = "Scrimba";
const oracle = "Oracle";
const ieee = "IEEE Robotics and Automation Society";
const cisco = "Cisco Networking Academy";

/**
 * @param {string} id
 * @param {string} title
 * @param {string} issuer
 * @param {import("./types").Category} category
 * @param {string | undefined} issued
 * @param {string} filename
 * @param {Partial<import("./types").Credential>} [options]
 * @returns {import("./types").Credential}
 */
function record(id, title, issuer, category, issued, filename, options) {
  return {
    id, title, issuer, category, issued,
    kind: "Course completion",
    priority: 100,
    source: { status: "verified", reference: filename },
    ...options,
  };
}

const records = [
  record("oci-architect", "Oracle Cloud Infrastructure Certified Architect Associate", oracle, "Cloud", "2026-10-01", "Oracle Cloud Infrastructure Certified Architect Associate.pdf", {
    kind: "Certification", expires: "2028-10-01", priority: 1,
    description: "Designing and configuring cloud infrastructure on OCI.",
  }),
  record("oci-foundations", "Oracle Cloud Infrastructure Certified Foundations Associate", oracle, "Cloud", "2026-10-01", "Oracle Cloud Infrastructure Certified Foundations Associate.pdf", {
    kind: "Certification", expires: "2028-10-01",
  }),
  record("react", "Learn React", scrimba, "Software Development", "2026-03-17", "Screenshot 2026-03-17 140839.png", {
    priority: 2, description: "Practical work with components, state and interactive interfaces.", evidence: portfolioProfile,
  }),
  record("javascript", "Learn JavaScript", scrimba, "Software Development", "2026-05-18", "JS scrimba.pdf", { evidence: portfolioProfile }),
  record("git-github", "Learn Git and GitHub", scrimba, "Software Development", "2026-08-01", "Learn Git and Github.pdf", { evidence: portfolioProfile }),
  record("prompters", "1 Million Prompters", "Dubai Future Foundation", "AI", undefined, "haitham-aloufee-certificate dubai ai promts .pdf", {
    priority: 3, description: "Writing and refining prompts for generative AI tools.", evidence: portfolioProfile,
  }),
  record("sql-python", "Databases and SQL for Data Science with Python", "IBM · Coursera", "Software Development", "2026-10-17", "Coursera Databases and SQL for Data Science with Python.pdf", { verification: "https://coursera.org/verify/PUVZUPM869ZK" }),
  record("digital-forensics", "Cyber Security: Digital Forensics", "Macquarie University · Coursera", "Security", "2026-10-17", "Coursera Cyber Security Digital Forensics.pdf", { verification: "https://coursera.org/verify/VQLT18DM3A5W" }),
  record("secure-iot", "Developing Secure IoT Applications", "EDUCBA · Coursera", "Security", "2026-10-04", "Coursera Developing Secure IoT Applications.pdf", { verification: "https://coursera.org/verify/F9WWCJV82XQL" }),
  record("text-retrieval", "Text Retrieval and Search Engines", "University of Illinois Urbana-Champaign · Coursera", "Software Development", "2026-10-17", "Coursera Text Retrieval and Search Engines.pdf", { verification: "https://coursera.org/verify/40K3DF17KGLR" }),
  record("endpoint-security", "Endpoint Security", cisco, "Security", "2026-10-17", "Endpoint_Security_certificate .pdf"),
  record("network-defense", "Network Defense", cisco, "Security", "2026-10-01", "Network Defense certificate PDF"),
  record("networking", "Networking Basics", cisco, "Security", "2026-08-28", "Networking_Basics_certificate_haithamaloufee.pdf"),
  record("cpf-iot", "Internet of Things (IoT) Training", "Crown Prince Foundation", "Other", "2026-04", "IT ﺗﺪرﻳﺐ إﻧﺘﺮﻧﺖ اﻷﺷﻴﺎء.pdf", { kind: "Training", evidence: portfolioProfile }),
  record("chess-speaker", "Chess Basics Workshop", ieee, "Other", "2025-10", "chess.png", {
    kind: "Speaker recognition", priority: 4,
    description: "Speaker at the RASCadia Bootcamp’s chess workshop.", evidence: portfolioProfile,
  }),
  record("chess-strategy", "Chess strategy workshop", "Tafila Technical University · Deanship of Student Affairs", "Other", undefined, "شهادة تقدير هيثم العوفي.png", { kind: "Facilitator recognition", evidence: portfolioProfile }),
  record("ieee-iot", "IoT Workshop", ieee, "Other", "2025-10", "iot.png", { kind: "Workshop", evidence: portfolioProfile }),
  record("ieee-pcb", "PCB Design Workshop", ieee, "Other", "2025-10", "pcb.png", { kind: "Workshop", evidence: portfolioProfile }),
  record("ieee-3d", "3D Modeling & Printing", ieee, "Other", "2025-09", "3d.jpg", { kind: "Workshop", evidence: portfolioProfile }),
  record("ieee-cyber", "Cyber Security Workshop", ieee, "Security", "2025-09", "cyber.jpg", { kind: "Workshop", evidence: portfolioProfile }),
  record("ieee-ai", "Introduction to AI Workshop", ieee, "AI", "2025-10", "AI.png", { kind: "Workshop" }),
  record("ieee-python", "Python Workshop", ieee, "Software Development", "2025-09", "python.png and python.pdf", { kind: "Workshop", evidence: portfolioProfile }),
  record("ieee-member", "IEEE Student Membership", "IEEE", "Other", undefined, "MEMIEEE.pdf", { kind: "Student membership", expires: "2026-12" }),
  record("ieee-arduino", "Arduino Basics Workshop", ieee, "Other", "2025-10", "اردوينو.png", { kind: "Workshop" }),
];

export const credentials = records.filter(item => item.source.status === "verified")
  .sort((first, second) => first.priority - second.priority ||
    (second.issued ?? "").localeCompare(first.issued ?? "") ||
    first.title.localeCompare(second.title));

/** @param {string} value */
export function formatDate(value, exact = false, language = "en") {
  return new Intl.DateTimeFormat(language === "ar" ? "ar-JO-u-nu-arab" : "en", {
    year: "numeric", month: "short", day: exact && value.length === 10 ? "numeric" : undefined, timeZone: "UTC",
  }).format(new Date(value.length === 7 ? value + "-01" : value));
}
