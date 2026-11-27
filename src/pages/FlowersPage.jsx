import { useMemo, useState } from "react";
import { fetchFlowers } from "../api/dataApi";
import { FlowerCard } from "../components/FlowerCard";
import { useFetch } from "../hooks/useFetch";
import { useFilteredList } from "../hooks/useFilteredList";
import { PRICE_NAME_SORTERS, SORT_OPTIONS } from "../utils/sorters";
import { OCCASION_LABELS } from "../utils/labels";
import { MOBILE_QUERY, PAGE_SIZE_DESKTOP, PAGE_SIZE_MOBILE} from "../constants";
import { PriceRange } from "../components/PriceRange";
import { Pagination } from "../components/Pagination";
import { usePagination } from "../hooks/usePagination";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { Spinner } from "../components/Spinner";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { ErrorMessage } from "../components/ErrorMessage";
import { SearchInput } from "../components/SearchInput";
import { ColorFilter } from "../components/ColorFilter";
import { FilterGroup } from "../components/FilterGroup";

const SEARCH_FIELDS = ['name']
const FILTERS = {
    color: (flower) => flower.color,
    occasion: (flower) => flower.occasions
}

export function FlowersPage() {
    const { data: flowers, error, isLoading } = useFetch(fetchFlowers);
    const scrollToTop = useScrollToTop();

    const { visibleItems, query, setQuery, sortBy, setSortBy, selected, toggleFilter, priceRange, setPriceRange } = useFilteredList(
        flowers, 
        {
            searchFields: SEARCH_FIELDS,
            sorters: PRICE_NAME_SORTERS,
            filters: FILTERS,
            onChange: scrollToTop
        }
    );
    const [filtersOpen, setFiltersOpen] = useState(false);

    const isMobile = useMediaQuery(MOBILE_QUERY);
    const { page, setPage, totalPages, pageItems } = usePagination(
        visibleItems,
        isMobile ? PAGE_SIZE_MOBILE : PAGE_SIZE_DESKTOP
    );

    const handlePageChange = (nextPage) => {
        setPage(nextPage);
        scrollToTop();
    };  

    const activeFiltersCount =
        Object.values(selected).reduce((sum, values) => sum + values.length, 0) +
        (priceRange.min !== '' || priceRange.max !== '' ? 1 : 0);

    const occasions = useMemo(() => {
        if (!flowers) return [];
        const available = new Set(flowers.flatMap((f) => f.occasions));
        return Object.keys(OCCASION_LABELS).filter((key) => available.has(key));
    }, [flowers]);

    const priceBounds = useMemo(() => {
        if (!flowers || flowers.length === 0) return { min: 0, max: 100 };
        const prices = flowers.map((f) => f.price);
        return { min: Math.min(...prices), max: Math.max(...prices) };
    }, [flowers]);
    
    if (isLoading) return <Spinner label="Збираємо квіти..." />;
    if (error) return <ErrorMessage message={error.message} />;

    return (
        <section className="catalog">
            <h1>Квіти</h1>
            <div className="catalog__toolbar">
                <div className="catalog__search">
                    <SearchInput
                        id="flower-search"
                        label="Пошук квітів за назвою"
                        value={query}
                        onChange={setQuery}
                    />
                </div>
                <select
                    id="flower-sort"
                    name="sort"
                    className="catalog__sort"
                    aria-label="Сортування квітів"
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
                    aria-controls="flowers-filters"
                >
                    {filtersOpen ? 'Сховати фільтри' : 'Фільтри'}
                    {activeFiltersCount > 0 && `( ${activeFiltersCount})`}
                </button>
            </div>

            <div className="catalog__layout">
                <aside
                    id="flowers-filters"
                    className={`catalog__filters ${filtersOpen ? 'catalog__filters--open' : ''}`}
                >
                    <FilterGroup title="Колір">
                        <ColorFilter
                            flowers={flowers}
                            selected={selected.color ?? []}
                            onToggle={(color)=>toggleFilter("color", color)}
                        />
                    </FilterGroup>
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