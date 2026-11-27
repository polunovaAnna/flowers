import { Link } from "react-router-dom";
import { Photo } from "../components/Photo";
import { SALON } from "../constants";

const PRINCIPLES = [
    { title: 'Без поспіху', text: 'Ніхто не квапить із вибором. Хочеш години три думати над піонами? Ми не підганятимемо, а лише допоможемо.' },
    { title: 'Прозора ціна', text: 'Ти бачиш, з чого складається букет: квіти, обгортка, складність композиції. Жодних «ціна залежить».' },
    { title: 'Значення квітів', text: 'До кожної квітки є коротка підказка, що вона означає, аби букет говорив саме те, що хочеться сказати.' },
];

export function HomePage() {
    return (
        <section className="home-page">
            <div className="home-page__intro">
                <div className="home-page__text">
                    <h1>Про салон</h1>
                    <p className="home-page__lead">
                        Rosette - це спокій у голові та душі, якого так часом не вистачає.
                        Ніхто не примушує обирати чи заохочує криками - увесь вибір за тобою, а наші консультанти якщо що підкажуть.
                    </p>
                    <h2 className="home-page__subtitle">Наша історія</h2>
                    <p>
                        Ми почали з маленької полиці з квітами та мрії. Хотіли, щоб обирати квіти було приємно 
                        і покупка букету приносила позитивні емоції, а не дирку в гаманці чи спорчені нерви.
                        З часом полиця виросла в салон, а ідея та цінності лишились.
                    </p>
                </div>
                <Photo
                    src={SALON.photo}
                    alt="Інтер'єр салону Rosette"
                    className="home-page__photo"
                />
            </div>
            <h2 className="home-page__subtitle">Як ми працюємо</h2>
            <ul className="home-page__principles">
                {PRINCIPLES.map(({ title, text }) => (
                    <li key={title} className="home-page__principle">
                        <h3>{title}</h3>
                        <p>{text}</p>
                    </li>
                ))}
            </ul>
            <p>
                Готові букети чекають у <Link to="/bouquets">каталозі</Link>, а якщо
				хочеться власного, збери його в{" "}
				<Link to="/builder">конструкторі</Link> і побачиш ціну одразу.
            </p>
        </section>
    );
}