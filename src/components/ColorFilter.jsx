import { useMemo } from "react";
import { COLOR_LABELS, COLOR_SWATCHES } from "../utils/labels";

export function ColorFilter({ flowers, selected, onToggle }) {
    const colors = useMemo(() => {
        if (!flowers) return [];
        const available = new Set(flowers.map((f) => f.color));
        return Object.keys(COLOR_LABELS).filter((key) => available.has(key));
    }, [flowers]);

    return (
        <div className="color-filter">
            {colors.map((color) => {
                const name = COLOR_LABELS[color] ?? color;
                return (
                    <label key={color} className="color-filter__item" title={name}>
                        <input
                            type="checkbox"
                            className="color-filter__input"
                            aria-label={name}
                            checked={selected.includes(color)}
                            onChange={() => onToggle(color)}
                        />
                        <span
                            className="color-filter__swatch"
                            style={{ "--swatch": COLOR_SWATCHES[color] }}
                            aria-hidden="true"
                        />
                    </label>
                )
            })}
        </div>
    )
}