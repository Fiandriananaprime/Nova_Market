import type { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router';

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T, index: number) => ReactNode;
  className?: string;
}

interface AdminTableCardProps<T> {
  title: string;
  data: T[];
  columns: Column<T>[];
  viewAllHref?: string;
  className?: string;
  rowKey: (item: T, index: number) => string | number;
  rowHref?: (item: T) => string;
}

 const TableCard = <T,>({
  title,
  data,
  columns,
  viewAllHref,
  className = '',
  rowKey,
  rowHref,
}: AdminTableCardProps<T>) => {
  const navigate = useNavigate();
  return (
    <div
      className={`bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
        <h2 className="font-semibold font-display text-[var(--foreground)]">
          {title}
        </h2>

        {viewAllHref && (
          <Link
            to={viewAllHref}
            className="text-xs text-[#0077B6] hover:underline"
          >
            View all
          </Link>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--secondary)]">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide ${
                    column.className ?? ''
                  }`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--border)]">
            {data.map((item, index) => (
              <tr
              onClick={() => {
                if (rowHref) {
                    navigate(rowHref(item));
                  }
                }}
                key={rowKey(item, index)}
                className={`hover:bg-[var(--secondary)] transition-colors ${rowHref ? 'cursor-pointer' : ''}`}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-4 py-3 ${column.className ?? ''}`}
                  >
                    {column.render
                      ? column.render(item, index)
                      : String(item[column.key as keyof T] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableCard;