import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';

const NAV_ITEMS = [
    { to: '/', label: 'Головна' },
    { to: '/flowers', label: 'Квіти' },
    {
        to: '/bouquets', label: 'Букети', children: [
            { to: '/bouquets', label: 'Готові букети' },
            { to: '/builder', label: 'Конструктор букетів' }
        ],
    },
    { to: '/contacts', label: 'Контакти' },
];

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [suppressedItem, setSuppressedItem] = useState(null);
    const closeMenu = (label) => {
        setIsOpen(false);
        setSuppressedItem(label);
        document.activeElement?.blur();
    };

    return (
        <header className="header">
            <Link to="/" className="header__logo">
                <img src="/logo/logo_60.svg" alt="" className="header__logo-img" />
                <span className="header__logo-text">Rosette</span>
            </Link>

            <button
                type="button"
                className="header__burger"
                onClick={() => setIsOpen((open) => !open)}
                aria-expanded={isOpen}
                aria-controls="main-nav"
                aria-label={isOpen ? 'Закрити меню' : 'Відкрити меню'}
            >
                <span className="header__burger-line" />
                <span className="header__burger-line" />
                <span className="header__burger-line" />
            </button>

            <nav id="main-nav" className={`header__nav ${isOpen ? 'header__nav--open' : ''}`} aria-label="Основне меню">
                <ul className="header__list">
                    {NAV_ITEMS.map(({ to, label, children }) => (
                        <li
                            key={label}
                            className={`header__item ${suppressedItem === label ? 'header__item--suppressed' : ''}`}
                            onMouseLeave={() => setSuppressedItem(null)}
                            
                        >
                            <NavLink to={to} end className="header__link" onClick={() => closeMenu(label)}>
                                {label}
                            </NavLink>

                            {children && (
                                <ul className='header__submenu'>
                                    {children.map((child) => (
                                        <li key={child.to}>
                                            <NavLink to={child.to} end className="header__sublink" onClick={() => closeMenu(label)}>
                                                {child.label}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}