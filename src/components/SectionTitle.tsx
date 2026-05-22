interface SectionTitleProps {
  eyebrow: string;
  title?: string;
}

export default function SectionTitle({ eyebrow, title }: SectionTitleProps) {
  return (
    <div>
      <p className="section-kicker">{eyebrow}</p>
      {title && <h2>{title}</h2>}
    </div>
  );
}
