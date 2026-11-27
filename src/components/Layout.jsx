import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useScrollToTop } from "../hooks/useScrollToTop";
import { Header } from './Header';
import { HeroSlider } from './HeroSlider';

export function Layout() {

    const { pathname } = useLocation();
    const scrollToTop = useScrollToTop();
    const showSlider = pathname === '/';

    useEffect(() => {
        scrollToTop();
    }, [pathname, scrollToTop]);

    return (
        <div className="app-shell">
            <div className="app-top">
                <Header />
                {showSlider && <HeroSlider />}
            </div>

            <div className="app-body">
                <div className="app-scroll-area">
                    <main className="app-main">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}