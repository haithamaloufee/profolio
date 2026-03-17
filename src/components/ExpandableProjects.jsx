import { useState } from "react";
import ProjectCard from "./ProjectCard";

export default function ExpandableProjects({
  items,
  initialCount = 3,
  emptyMessage = "No items available yet.",
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!items.length) {
    return <p className="empty-state">{emptyMessage}</p>;
  }

  const visibleItems = isExpanded ? items : items.slice(0, initialCount);
  const hiddenCount = Math.max(items.length - initialCount, 0);

  return (
    <div className="expandable-projects">
      <div className="project-grid">
        {visibleItems.map((item, index) => (
          <ProjectCard key={item.id} index={index} {...item} />
        ))}
      </div>

      {hiddenCount > 0 ? (
        <button
          type="button"
          className="button button-ghost expand-button"
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded((current) => !current)}
        >
          {isExpanded ? "Show Less" : `Show ${hiddenCount} More`}
        </button>
      ) : null}
    </div>
  );
}
