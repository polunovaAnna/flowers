import { useState } from "react";

export function FlowerCard({ flower, priority = false, children }) {
    const { name, price, meaning, photo } = flower;
    const [photoFailed, setPhotoFailed] = useState(false);

    return (
        <article className="flower-card">
            {photoFailed ? (
				<div className="flower-card__photo flower-card__photo--empty" role="img" aria-label={name} />
			) : (
				<img
					src={photo}
					alt={name}
					className="flower-card__photo"
					loading={priority ? "eager" : "lazy"}
					onError={() => setPhotoFailed(true)}
				/>
			)}
            <div className="flower-card__body">
                <h3 className="flower-card__name">{name}</h3>
                <p className="flower-card__meaning">{meaning}</p>
                <p className="flower-card__price">{price} грн</p>
            </div>
            {children}
        </article>
    )
}