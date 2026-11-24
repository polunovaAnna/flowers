export function PriceSummary({ price, totalCount, maxCount, onClear }) {
    const isFull = totalCount >= maxCount;
    const {complexity, total } = price;

    return (
        <div className="price-summary">
            <p className="price-summary__total">
                Разом {total} грн
            </p>
            <p className="price-summary__meta">
                Квітів: {totalCount} / {maxCount} · Складність:{" "}
				{complexity?.name ?? "—"}
            </p>
            {isFull && (
				<p className="price-summary__limit" role="status">
					Максимум {maxCount} квітів у букеті
				</p>
            )}
            <button
				type="button"
				className="price-summary__clear"
				onClick={onClear}
				disabled={totalCount === 0}
			>
				Очистити
			</button>
        </div>
    )
}