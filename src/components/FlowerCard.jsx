import { Photo } from "../components/Photo";

export function FlowerCard({ flower, priority = false, children }) {
    const { name, price, meaning, photo } = flower;

    return (
        <article className="flower-card">
            <Photo
                src={photo}
                alt={name}
                className="flower-card__photo"
                priority={priority}
            />
            <div className="flower-card__body">
                <h3 className="flower-card__name">{name}</h3>
                <p className="flower-card__meaning">{meaning}</p>
                <p className="flower-card__price">{price} грн</p>
            </div>
            {children}
        </article>
    )
}