import { SALON } from "../contacts";

export function ContactInfo() {
    const phoneLink = `tel:${SALON.phone.replace(/\s/g, '')}`;

    return (
        <div className="contact-info">
            <div className="contact-info__block">
                <h2 className="contact-info__title">Адреса</h2>
                <p className="contact-info__text">{SALON.address}</p>
            </div>
            <div className="contact-info__block">
                <h2 className="contact-info__title">Телефон</h2>
                <p className="contact-info__text">
                    <a href={phoneLink} className="contact-info__link">
                        {SALON.phone}
                    </a>
                </p>
            </div>
            <div className="contact-info__block">
                <h2 className="contact-info__title">Години роботи</h2>
                <ul className="contact-info__hours">
                    {SALON.hours.map(({ days, time }) => (
                        <li key={days}>
                            <span>{days}</span>
                            <span>{time}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}