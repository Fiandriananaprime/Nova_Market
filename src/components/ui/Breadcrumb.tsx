export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span>/</span>}
          {item.href ? <a href={item.href} className="hover:text-foreground transition-colors">{item.label}</a> : <span className="text-foreground font-medium">{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}
