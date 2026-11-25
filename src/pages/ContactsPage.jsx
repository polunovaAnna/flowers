import { lazy, Suspense } from "react";
import { SalonMap } from "../components/SalonMap";
import { ContactInfo } from "../components/ContactInfo";

const SalonMap = lazy(() =>
	import("../components/SalonMap").then((m) => ({ default: m.SalonMap })),
);

export function ContactsPage() {
    return (
        <section className="contacts-page">
            <h1>Контакти</h1>
            <div className="contacts-page__layout">
                <ContactInfo />
                <Suspense fallback={<Spinner />}>
					<SalonMap />
				</Suspense>
            </div>
        </section>
    );
}