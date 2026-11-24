export function QuantityStepper({ label, quantity, canAdd, onAdd, onRemove }) {
    return (
        <div className="quantity-stepper">
            <button
                type="button"
                aria-label={`Прибрати: ${label}`}
                disabled={quantity === 0}
                onClick={onRemove}
            >
                -
            </button>
            <span aria-live="polite">{quantity}</span>
            <button 
                type="button"
                aria-label={`Додати: ${label}`}
                disabled={!canAdd}
                onClick={onAdd}
            >
                +
            </button>
        </div>
    )
}