import { identity } from "./profile";

const getInstagramMeta = (usernameOrUrl) => {
  if (usernameOrUrl.startsWith("http://") || usernameOrUrl.startsWith("https://")) {
    try {
      const { pathname } = new URL(usernameOrUrl);
      const handle = pathname.split("/").filter(Boolean)[0];

      return {
        href: usernameOrUrl,
        handle: handle ? `@${handle.replace(/^@/, "")}` : "Instagram profile",
      };
    } catch {
      return {
        href: usernameOrUrl,
        handle: "Instagram profile",
      };
    }
  }

  const cleanUsername = usernameOrUrl.replace(/^@/, "").replace(/\/+$/, "");
  return {
    href: `https://www.instagram.com/${cleanUsername}/`,
    handle: `@${cleanUsername}`,
  };
};

const instagramMeta = getInstagramMeta(identity.instagramUsername);

// Keep social links here so the hero, contact section, and footer all stay in sync.
export const socialLinks = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: identity.linkedinUrl,
    description: "Professional profile and direct networking.",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: identity.facebookUrl,
    description: "Social profile for quick outreach and conversation.",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: instagramMeta.href,
    description: `Instagram: ${instagramMeta.handle}`,
    handle: instagramMeta.handle,
  },
  {
    id: "email",
    label: "Email",
    href: `mailto:${identity.email}`,
    description: identity.email,
  },
];
