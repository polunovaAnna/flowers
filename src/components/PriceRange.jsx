import { PRICE_STEP } from "../constants";

export function PriceRange({ bounds, value, onChange }) {
    const low = value.min === '' ? bounds.min : Number(value.min);
    const high = value.max === '' ? bounds.max : Number(value.max);
    const span = bounds.max - bounds.min || 1;

    const fillLeft = ((low - bounds.min) / span) * 100;
    const fillRight = 100 - ((high - bounds.min) / span) * 100;
    
    const handleLow = (event) => {
        const next = Math.min(Number(event.target.value), high);
        onChange({ min: next <= bounds.min ? '' : String(next), max: value.max });
    };

    const handleHigh = (event) => {
        const next = Math.max(Number(event.target.value), low);
        onChange({ min: value.min, max: next >= bounds.max ? '' : String(next) });
    };

    return (
        <div className="price-range">
            <p className="price-range__label">
                від {low} до {high} грн
            </p>

            <div className="price-range__slider">
                <div className="price-range__rail">
                    <div className="price-range__track" />
                    <div className="price-range__fill" style={{ left: `${fillLeft}%`, right: `${fillRight}%` }} />
                </div>
                <input
                    type="range"
                    className="price-range__input"
                    min={bounds.min}
                    max={bounds.max}
                    step={PRICE_STEP}
                    value={low}
                    onChange={handleLow}
                    aria-label="Ціна від"
                />
                <input
                    type="range"
                    className="price-range__input"
                    min={bounds.min}
                    max={bounds.max}
                    step={5}
                    value={high}
                    onChange={handleHigh}
                    aria-label="Ціна до"
                />
            </div>
        </div>
    )
}