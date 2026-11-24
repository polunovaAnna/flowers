import { useMemo, useState } from 'react';
import { BouquetCard } from '../components/BouquetCard';
import { Pagination } from '../components/Pagination';
import { PriceRange } from '../components/PriceRange';
import { Spinner } from '../components/Spinner';
import { useBouquets } from '../hooks/useBouquets';
import { useFilteredList } from '../hooks/useFilteredList';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { usePagination } from '../hooks/usePagination';
import { OCCASION_LABELS } from '../utils/labels';
import { PRICE_NAME_SORTERS } from '../utils/sorters';
import { useScrollToTop } from "../hooks/useScrollToTop";
import { MOBILE_QUERY} from "../constants";

const SEARCH_FIELDS = ['name'];
const FILTERS = {
    occasion: (bouquet) => bouquet.occasions
}
const PAGE_SIZE_MOBILE = 8;
const PAGE_SIZE_DESKTOP = 9;

export function BouquetsPage() {
    const { bouquets, error, isLoading } = useBouquets();
    const [filtersOpen, setFiltersOpen] = useState(false);

    const {
        visibleItems, query, setQuery, sortBy, setSortBy,
        selected, toggleFilter, priceRange, setPriceRange,
    } = useFilteredList(bouquets, {
        searchFields: SEARCH_FIELDS,
        sorters: PRICE_NAME_SORTERS,
        filters: FILTERS,
    });

    const isMobile = useMediaQuery(MOBILE_QUERY);
    const { page, setPage, totalPages, pageItems } = usePagination(
        visibleItems,
        isMobile ? PAGE_SIZE_MOBILE : PAGE_SIZE_DESKTOP
    );

    const occasions = useMemo(() => {
        if (!bouquets) return [];
        const available = new Set(bouquets.flatMap((b) => b.occasions));
        return Object.keys(OCCASION_LABELS).filter((key) => available.has(key));
    }, [bouquets]);

    const priceBounds = useMemo(() => {
        if (!bouquets || bouquets.length === 0) return { min: 0, max: 100 };
        const prices = bouquets.map((b) => b.price);
        return { min: Math.min(...prices), max: Math.max(...prices) };
    }, [bouquets]);

    const activeFiltersCount =
        Object.values(selected).reduce((sum, values) => sum + values.length, 0) +
        (priceRange.min !== '' || priceRange.max !== '' ? 1 : 0);

    const scrollToTop = useScrollToTop;
    const handlePageChange = (nextPage) => {
        setPage(nextPage);
        scrollToTop();
    };  

    if (isLoading) return <Spinner label="Збираємо букети..." />;
    if (error) return <p role="alert">{error.message || "Щось пішло не так"}</p>;

    return (
        <section className="bouquets-page">
            <h1>Готові букети</h1>
            <div className="flowers-page__toolbar">
                <input
                    type="search"
                    id="bouquet-search"
                    autoComplete="off"
                    className="flowers-page__search"
                    placeholder="Пошук за назвою"
                    aria-label="Пошук букетів за назвою"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
                <select
                    id="bouquet-sort"
                    name="sort"
                    className="flowers-page__sort"
                    aria-label="Сортування букетів"
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                >
                    <option value="default">За замовчуванням</option>
                    <option value="name-asc">А-Я</option>
                    <option value="name-desc">Я-А</option>
                    <option value="price-asc">Спочатку дешевші</option>
                    <option value="price-desc">Спочатку дорожчі</option>
                </select>
                <button
                    type="button"
                    className="flowers-page__filters-toggle"
                    onClick={() => setFiltersOpen((open) => !open)}
                    aria-expanded={filtersOpen}
                    aria-controls="bouquet-filters"
                >
                    {filtersOpen ? 'Сховати фільтри' : 'Фільтри'}
                    {activeFiltersCount > 0 && ` (${activeFiltersCount})`}
                </button>
            </div>
            <div className="flowers-page__layout">
                <aside
                    id="bouquet-filters"
                    className={`flowers-page__filters ${filtersOpen ? 'flowers-page__filters--open' : ''}`}
                >
                    <fieldset className="flowers-page__filter">
                        <legend>Нагода</legend>
                        {occasions.map((occasion) => (
                            <label key={occasion} className="flowers-page__checkbox">
                                <input
                                    type="checkbox"
                                    checked={(selected.occasion ?? []).includes(occasion)}
                                    onChange={() => toggleFilter('occasion', occasion)}
                                />
                                {OCCASION_LABELS[occasion] ?? occasion}
                            </label>
                        ))}
                    </fieldset>
                    <fieldset className="flowers-page__filter">
                        <legend>Ціна</legend>
                        <PriceRange
                            bounds={priceBounds}
                            value={priceRange}
                            onChange={setPriceRange}
                        />
                    </fieldset>
                </aside>

                <div className="flowers-page__results">
                    {visibleItems.length === 0 ? (
                        <p>Нічого не знайдено</p>
                    ) : (
                        <>
                            <ul className="flowers-page__grid">
                                {pageItems.map((bouquet) => (
                                    <li key={bouquet.id}>
                                        <BouquetCard bouquet={bouquet} />
                                    </li>
                                ))}
                            </ul>
                            <Pagination page={page} totalPages={totalPages} onChange={handlePageChange} />
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}