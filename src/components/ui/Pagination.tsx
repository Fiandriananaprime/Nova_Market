interface PaginationProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

export function Pagination({
  current,
  total,
  onChange,
}: PaginationProps) {
  const getPages = () => {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | 'ellipsis')[] = [];
    pages.push(1);

    if (current > 4) {
      pages.push('ellipsis');
    }
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let page = start; page <= end; page++) {
      pages.push(page);
    }

    if (current < total - 3) {
      pages.push('ellipsis');
    }
    pages.push(total);

    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => onChange(current - 1)}
        disabled={current <= 1}
        className="px-3 py-1.5 text-sm rounded-lg border border-border disabled:opacity-40 hover:bg-secondary transition-colors"
      >
        Prev
      </button>

      {pages.map((page, index) =>
        page === 'ellipsis' ? (
          <span
            key={`ellipsis-${index}`}
            className="w-8 h-8 flex items-center justify-center text-sm text-muted-foreground"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onChange(page)}
            className={`w-8 h-8 text-sm rounded-lg border transition-colors ${
              page === current
                ? 'bg-primary text-white border-primary'
                : 'border-border hover:bg-secondary'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onChange(current + 1)}
        disabled={current >= total}
        className="px-3 py-1.5 text-sm rounded-lg border border-border disabled:opacity-40 hover:bg-secondary transition-colors"
      >
        Next
      </button>
    </div>
  );
}