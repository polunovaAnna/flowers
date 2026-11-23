import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { HeroSlider } from './HeroSlider';

export function Layout() {
    return (
        <div className="app-shell">
            <div className="app-top">
                <Header />
                <HeroSlider />
                {/* Крок 4: Breadcrumbs */}
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