import { useMemo } from "react";
import { useConstructorData } from "../hooks/useConstructorData";
import { useBouquetBuilder } from "../hooks/useBouquetBuilder";
import { calcPrice } from "../utils/calcPrice";

export function BuilderPage() {
    const { flowers, wrappers, complexityLevels, error, isLoading } = useConstructorData();
    const builder = useBouquetBuilder();

    const price = useMemo(() => {
        if (!flowers) return null;
        return calcPrice({
            items: builder.items,
            wrapperId: builder.wrapperId,
            complexityId: builder.complexityId,
            flowers,
            wrappers,
            complexityLevels,
        });
    }, [
        builder.items,
        builder.wrapperId,
        builder.complexityId,
        flowers,
        wrappers,
        complexityLevels
    ]);

    if (isLoading) return <p>завантаження...</p>
    if (error) return <p>Не вдалося завантажити дані конструктора.</p>;

    return (
        <section>
            <h1>Сторінка конструктора</h1>
            <div className="constructor">
            </div>
        </section>
    );
}