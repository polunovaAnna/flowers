import { Photo } from "../components/Photo";

export function BouquetCard({ bouquet, priority = false }) {
    const { name, description, price, photo, composition, wrapper } = bouquet;

    return (
        <article className="bouquet-card">
            <Photo
                src={photo}
                alt={name}
                className="bouquet-card__photo"
                priority={priority}
            />

            <div className="bouquet-card__body">
                <h3 className="bouquet-card__name">{name}</h3>
                <p className="bouquet-card__description">{description}</p>

                <details className="bouquet-card__details">
                    <summary className="bouquet-card__summary">Склад букета</summary>
                        <ul className="bouquet-card__composition">
                        {composition.map(({ flower, quantity }) =>
                            <li key={flower.id}>
                                <span className="bouquet-card__flower">
                                    {flower.name} × {quantity}
                                </span>
                                <span className="bouquet-card__meaning">{flower.meaning}</span>
                            </li>
                        )}
                        </ul>
                </details>

                {wrapper && wrapper.price > 0 && (
                    <p className="bouquet-card__wrapper">Обгортка: {wrapper.name}</p>
                )}

                <p className="bouquet-card__price">{price} грн</p>
            </div>
        </article>
    )
}