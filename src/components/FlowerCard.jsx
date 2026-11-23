export function FlowerCard({ flower, priority = false }) {
    const { name, price, meaning, photo } = flower;

    return (
        <article className="flower-card">
            <img
                src={photo}
                alt={name}
                className="flower-card__photo"
                loading={priority ? 'eager' : 'lazy'}
            />
            <div className="flower-card__body">
                <h3 className="flower-card__name">{name}</h3>
                <p className="flower-card__meaning">{meaning}</p>
                <p className="flowers-card__price">{price} грн</p>
            </div>
        </article>
    )
}