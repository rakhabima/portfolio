import { Braces, Database } from "lucide-react";

interface ProjectVisualProps {
  type: string;
}

export default function ProjectVisual({ type }: ProjectVisualProps) {
  return (
    <div className={`project-visual ${type}`} aria-hidden="true">
      <div />
      <div />
      <div />
      <div />
      <Braces className="visual-icon" size={34} />
      <Database className="visual-icon secondary" size={28} />
    </div>
  );
}
