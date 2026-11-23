import { SalonMap } from "../components/SalonMap";
import { ContactInfo } from "../components/ContactInfo";

export function ContactsPage() {
    return (
        <section className="contacts-page">
            <h1>Контакти</h1>
            <div className="contacts-page__layout">
                <ContactInfo />
                <SalonMap />
            </div>
        </section>
    );
}