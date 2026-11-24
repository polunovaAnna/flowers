import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { HeroSlider } from './HeroSlider';
import { useLocation } from 'react-router-dom';

export function Layout() {

    const { pathname } = useLocation();
    const showSlider = pathname !== '/builder';

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
                {/* Крок 4: Footer */}
                </div>
            </div>
        </div>
    );
}