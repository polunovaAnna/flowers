export function SearchInput({id, label, placeholder = "Пошук за назвою", value, onChange}) {
    return (
        <input
            type="search"
            id={id}
            autoComplete="off"
            className="search-input"
            placeholder={placeholder}
            aria-label={label}
            value={value}
            onChange={(event)=>onChange(event.target.value)}
        />
    )
}