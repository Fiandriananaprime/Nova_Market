import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Button, Badge, Select, Pagination } from '../../components/ui';
import ProductCard from '../../components/ProductCard';
import { products, categories } from '../../data/mock';
import { useTranslation } from 'react-i18next';

export default function Products() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState('relevance');
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);

  const filtered = products.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.brand.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedCategory && p.categoryId !== selectedCategory) return false;
    if (minPrice && p.price < parseInt(minPrice)) return false;
    if (maxPrice && p.price > parseInt(maxPrice)) return false;
    if (minRating > 0 && p.rating < minRating) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'rating') return b.rating - a.rating;
    return 0;
  });

  const activeFilters = [
    selectedCategory && categories.find(c => c.id === selectedCategory)?.name,
    minRating > 0 && `${minRating}+ stars`,
    (minPrice || maxPrice) && `${minPrice || '0'} - ${maxPrice || '∞'} Ar`,
  ].filter(Boolean);

  const Filters = () => (
    <div className="space-y-5">
      <div>
        <h3 className="font-semibold text-sm text-foreground mb-2.5">{t("Category")}</h3>
        <div className="space-y-1">
          <button onClick={() => setSelectedCategory('')} className={`w-full text-left px-2 py-1.5 text-sm rounded-lg transition-colors ${!selectedCategory ? 'bg-[#0077B6]/10 text-[#0077B6] font-medium' : 'text-foreground hover:bg-secondary'}`}>
            {t("All categories")}
          </button>
          {categories.map(c => (
            <button key={c.id} onClick={() => setSelectedCategory(c.id)} className={`w-full text-left px-2 py-1.5 text-sm rounded-lg transition-colors ${selectedCategory === c.id ? 'bg-[#0077B6]/10 text-[#0077B6] font-medium' : 'text-foreground hover:bg-secondary'}`}>
              {c.name} <span className="text-muted-foreground">({c.count.toLocaleString()})</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm text-foreground mb-2.5">{t("Price range")}</h3>
        <div className="flex gap-2 items-center">
          <input type="number" placeholder="Min" value={minPrice} onChange={e => setMinPrice(e.target.value)} className="w-full px-2 py-1.5 text-sm bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-[#0077B6]" />
          <span className="text-muted-foreground text-sm flex-shrink-0">—</span>
          <input type="number" placeholder="Max" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="w-full px-2 py-1.5 text-sm bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-[#0077B6]" />
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm text-foreground mb-2.5">{t("Minimum rating")}</h3>
        {[0, 3, 4, 4.5].map(r => (
          <button key={r} onClick={() => setMinRating(r)} className={`w-full text-left px-2 py-1.5 text-sm rounded-lg transition-colors ${minRating === r ? 'bg-[#0077B6]/10 text-[#0077B6] font-medium' : 'text-foreground hover:bg-secondary'}`}>
            {r === 0 ? t("All ratings") : `${r}+ ⭐`}
          </button>
        ))}
      </div>

      <Button variant="outline" size="sm" className="w-full" onClick={() => { setSelectedCategory(''); setMinPrice(''); setMaxPrice(''); setMinRating(0); }}>
        {t("Clear filters")}
      </Button>
    </div>
  );

  return (
    <div>
      {/* Search bar */}
      <div className="flex gap-2 mb-5">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t("Search products, brands...")}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#0077B6]/30 focus:border-[#0077B6] transition-all"
          />
        </div>
        <Select
          options={[
            { value: 'relevance', label: t("Relevance") },
            { value: 'price-asc', label: t("Price: Low to High") },
            { value: 'price-desc', label: t("Price: High to Low") },
            { value: 'rating', label: t("Best rated") },
          ]}
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="w-40 hidden sm:block"
        />
        <Button variant="outline" size="md" onClick={() => setShowFilters(!showFilters)} className="md:hidden">
          <SlidersHorizontal className="w-4 h-4" />
        </Button>
      </div>

      {/* Active filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {activeFilters.map((f, i) => (
            <Badge key={i} variant="info" className="flex items-center gap-1.5">
              {f}
              <button onClick={() => { setSelectedCategory(''); setMinRating(0); setMinPrice(''); setMaxPrice(''); }} className="hover:opacity-70"><X className="w-3 h-3" /></button>
            </Badge>
          ))}
        </div>
      )}

      <div className="flex gap-6">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-52 flex-shrink-0">
          <div className="bg-card border border-border rounded-xl p-4 sticky top-24">
            <Filters />
          </div>
        </aside>

        {/* Mobile filter overlay */}
        {showFilters && (
          <div className="md:hidden fixed inset-0 z-50 flex flex-col">
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowFilters(false)} />
            <div className="mt-auto bg-card rounded-t-2xl p-5 relative max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold font-display">{t("Filters")}</h2>
                <button onClick={() => setShowFilters(false)}><X className="w-5 h-5" /></button>
              </div>
              <Filters />
            </div>
          </div>
        )}

        {/* Results */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{sorted.length}</span> {t("results")}
            </p>
            <Select
              options={[
                { value: 'relevance', label: t("Relevance") },
                { value: 'price-asc', label: t("Price ↑") },
                { value: 'price-desc', label: t("Price ↓") },
                { value: 'rating', label: t("Best rated") },
              ]}
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="w-36 sm:hidden"
            />
          </div>

          {sorted.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="font-semibold text-foreground mb-1">{t("No products found")}</h3>
              <p className="text-sm text-muted-foreground">{t("Try adjusting your search or filters")}</p>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {sorted.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
              <div className="flex justify-center">
                <Pagination current={page} total={Math.ceil(sorted.length / 12) + 3} onChange={setPage} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
