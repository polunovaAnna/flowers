export function FilterGroup({ title, children }) {
    return (
        <fieldset className="filter-group">
            <legend className="filter-group__title">{title}</legend>
            {children}
        </fieldset>
    )
}