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
import { PRICE_NAME_SORTERS, SORT_OPTIONS } from '../utils/sorters';
import { useScrollToTop } from "../hooks/useScrollToTop";
import { MOBILE_QUERY, PAGE_SIZE_DESKTOP, PAGE_SIZE_MOBILE } from "../constants";
import { ErrorMessage } from '../components/ErrorMessage';
import { SearchInput } from '../components/SearchInput';
import { FilterGroup } from '../components/FilterGroup';

const SEARCH_FIELDS = ['name'];
const FILTERS = {
    occasion: (bouquet) => bouquet.occasions
}

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

    const scrollToTop = useScrollToTop();
    const handlePageChange = (nextPage) => {
        setPage(nextPage);
        scrollToTop();
    };  

    if (isLoading) return <Spinner label="Збираємо букети..." />;
    if (error) return <ErrorMessage message={error.message} />;

    return (
        <section className="catalog">
            <h1>Готові букети</h1>
            <div className="catalog__toolbar">
                <div className="catalog__search">
                    <SearchInput
                        id="bouquet-search"
                        label="Пошук букетів за назвою"
                        value={query}
                        onChange={setQuery}
                    />
                </div>
                <select
                    id="bouquet-sort"
                    name="sort"
                    className="catalog__sort"
                    aria-label="Сортування букетів"
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                >
                    {SORT_OPTIONS.map(({ value, label }) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>
                <button
                    type="button"
                    className="catalog__filters-toggle"
                    onClick={() => setFiltersOpen((open) => !open)}
                    aria-expanded={filtersOpen}
                    aria-controls="bouquet-filters"
                >
                    {filtersOpen ? 'Сховати фільтри' : 'Фільтри'}
                    {activeFiltersCount > 0 && ` (${activeFiltersCount})`}
                </button>
            </div>
            <div className="catalog__layout">
                <aside
                    id="bouquet-filters"
                    className={`catalog__filters ${filtersOpen ? 'catalog__filters--open' : ''}`}
                >
                    <FilterGroup title="Нагода">
                        {occasions.map((occasion) => (
                            <label key={occasion} className="catalog__checkbox">
                                <input
                                    type="checkbox"
                                    checked={(selected.occasion ?? []).includes(occasion)}
                                    onChange={() => toggleFilter('occasion', occasion)}
                                />
                                {OCCASION_LABELS[occasion] ?? occasion}
                            </label>
                        ))}
                    </FilterGroup>
                    <FilterGroup title="Ціна">
                        <PriceRange
                            bounds={priceBounds}
                            value={priceRange}
                            onChange={setPriceRange}
                        />
                    </FilterGroup>
                </aside>

                <div className="catalog__results">
                    {visibleItems.length === 0 ? (
                        <p>Нічого не знайдено</p>
                    ) : (
                        <>
                            <ul className="catalog__grid">
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