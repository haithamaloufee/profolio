export type Source = { status: "verified" | "needs-review" | "private"; reference: string };
export type Image = { name: string; alt: string; width: number; height: number; variants: number[] };
export type Project = {
  slug: string; title: string; subtitle: string; intro: string; kind: string; priority: number;
  stack: string[]; image: Image; repository: string; demo?: string; sources: Source[];
  sections: { title: string; body: string }[];
};
export type Category = "Cloud" | "AI" | "Software Development" | "Other";
export type Credential = {
  id: string; title: string; issuer: string; category: Category; issued?: string;
  expires?: string; kind: string; priority: number; source: Source; description?: string;
  evidence?: string;
};
