import { useMemo, useState } from "react";
import { fetchFlowers } from "../api/flowersApi";
import { FlowerCard } from "../components/FlowerCard";
import { useFetch } from "../hooks/useFetch";
import { useFilteredList } from "../hooks/useFilteredList";
import { PRICE_NAME_SORTERS } from "../utils/sorters";
import { COLOR_LABELS } from "../utils/labels";
import { OCCASION_LABELS } from "../utils/labels";
import { PriceRange } from "../components/PriceRange";
import { Pagination } from "../components/Pagination";
import { usePagination } from "../hooks/usePagination";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { Spinner } from "../components/Spinner";

const SEARCH_FIELDS = ['name']
const FILTERS = {
    color: (flower) => flower.color,
    occasion: (flower) => flower.occasions
}
const PAGE_SIZE_MOBILE = 8;
const PAGE_SIZE_DESKTOP = 9;

export function FlowersPage() {
    const { data: flowers, error, isLoading } = useFetch(fetchFlowers);

    const { visibleItems, query, setQuery, sortBy, setSortBy, selected, toggleFilter, priceRange, setPriceRange } = useFilteredList(
        flowers, 
        {
            searchFields: SEARCH_FIELDS,
            sorters: PRICE_NAME_SORTERS,
            filters: FILTERS
        }
    );
    const [filtersOpen, setFiltersOpen] = useState(false);

    const isMobile = useMediaQuery('(max-width: 767px)');
    const { page, setPage, totalPages, pageItems } = usePagination(
        visibleItems,
        isMobile ? PAGE_SIZE_MOBILE : PAGE_SIZE_DESKTOP
    );

    const handlePageChange = (nextPage) => {
        setPage(nextPage);
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        document
            .querySelector('.app-scroll-area')
            ?.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    };  

    const activeFiltersCount =
        Object.values(selected).reduce((sum, values) => sum + values.length, 0) +
        (priceRange.min !== '' || priceRange.max !== '' ? 1 : 0);

    const colors = useMemo(
        () => (flowers ? [...new Set(flowers.map((f) => f.color))] : []),
        [flowers]
    );

    const occasions = useMemo(
        () => (flowers ? [...new Set(flowers.flatMap((f) => f.occasions))] : []),
        [flowers]
    );

    const priceBounds = useMemo(() => {
        if (!flowers || flowers.length === 0) return { min: 0, max: 100 };
        const prices = flowers.map((f) => f.price);
        return { min: Math.min(...prices), max: Math.max(...prices) };
    }, [flowers]);
    
    if (isLoading) return <Spinner label="Збираємо квіти..." />;
    if (error) return <p role="alert">{error.message}</p>

    return (
        <section className="flowers-page">
            <h1>Каталог квітів</h1>
            <div className="flowers-page__toolbar">
                <input
                    type="search"
                    id="flower-search"
                    autoComplete="off"
                    className="flowers-page__search"
                    placeholder="Пошук за назвою"
                    aria-label="Пошук квітів за назвою"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
                <select
                    id="flower-sort"
                    name="sort"
                    className="flowers-page__sort"
                    aria-label="Сортування квітів"
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
                    aria-controls="flower-filters"
                >
                    {filtersOpen ? 'Сховати фільтри' : 'Фільтри'}
                    {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                </button>
            </div>

            <div className="flowers-page__layout">
                <aside
                    id="flowers-filters"
                    className={`flowers-page__filters ${filtersOpen ? 'flowers-page__filters--open' : ''}`}
                >
                    <fieldset className="flowers-page__filter">
                        <legend>Колір</legend>
                        {colors.map((color) => (
                            <label key={color} className="flowers-page__checkbox">
                                <input
                                    type="checkbox"
                                    checked={(selected.color ?? []).includes(color)}
                                    onChange={() => toggleFilter('color', color)}
                                />
                                {COLOR_LABELS[color] ?? color}
                            </label>
                        ))}
                    </fieldset>
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
                        <legend>Ціна, грн</legend>
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
                                {pageItems.map((flower, index) => (
                                    <li key={flower.id}>
                                        <FlowerCard flower={flower} priority={index < 3}/>
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