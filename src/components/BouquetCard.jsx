export function BouquetCard({ bouquet }) {
    const { name, description, price, photo, composition, wrapper } = bouquet;

    return (
        <article className="bouquet-card">
            <img src={photo} alt={name} className="bouquet-card__photo" loading="lazy" />

            <div className="bouquet-card__body">
                <h3 className="bouquet-card__name">{name}</h3>
                <p className="bouquet-card__description">{description}</p>

                <ul className="bouquet-card__composition">
                    {composition.map(({ flower, quantity }) =>
                        <li key={flower.id}>
                            <span className="bouquet-card__flower">
                                {flower.name} x {quantity}
                            </span>
                            <span className="bouquet-card__meaning">{flower.meaning}</span>
                        </li>
                    )}
                </ul>

                {wrapper && wrapper.price > 0 && (
                    <p className="bouquet-card__wrapper">Обгортка: {wrapper.name}</p>
                )}

                <p className="bouquet-card__price">{price} грн</p>
            </div>
        </article>
    )
}