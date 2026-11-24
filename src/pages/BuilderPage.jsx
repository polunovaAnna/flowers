import { useMemo } from "react";
import { useConstructorData } from "../hooks/useConstructorData";
import { useBouquetBuilder } from "../hooks/useBouquetBuilder";
import { calcPrice } from "../utils/calcPrice";
import { getComplexityId } from "../utils/getComplexityId";
import { FlowerCard } from "../components/FlowerCard";
import { QuantityStepper } from "../components/QuantityStepper";
import { MAX_FLOWERS } from "../constants";
import { stepWrapper } from "../utils/stepWrapper";
import { BouquetPreview } from "../components/BouquetPreview";
import { PriceSummary } from "../components/PriceSummary";

export function BuilderPage() {
    const { flowers, wrappers, complexityLevels, error, isLoading } = useConstructorData();
    const builder = useBouquetBuilder();

    const complexityId = getComplexityId(builder.totalCount);

    const wrapper = wrappers?.find((w) => w.id === builder.wrapperId) ?? null;
    const wrapperName = wrapper?.name ?? "Без обгортки";

    const quantities = useMemo(() => Object.fromEntries(builder.items.map((i) => [i.flowerId, i.quantity])),[builder.items]);

    const price = useMemo(() => {
        if (!flowers) return null;
        return calcPrice({
            items: builder.items,
            wrapperId: builder.wrapperId,
            complexityId,
            flowers,
            wrappers,
            complexityLevels,
        });
    }, [
        builder.items,
        builder.wrapperId,
        complexityId,
        flowers,
        wrappers,
        complexityLevels
    ]);

    const flowerImages = useMemo(() => {
	if (!flowers) return [];
	return builder.items.flatMap(({ flowerId, quantity }) => {
		const flower = flowers.find((f) => f.id === flowerId);
		return flower ? Array(quantity).fill(flower) : [];
	});
    }, [builder.items, flowers]);

    if (isLoading) return <p>завантаження...</p>
    if (error) return <p>Не вдалося завантажити дані конструктора.</p>;

    return (
        <section className="builder-page">
            <h1>Сторінка конструктора</h1>
            <div className="builder">
                <div className="builder__flowers" aria-label="Квіти">
                    {flowers.map((flower) => (
                        <FlowerCard key={flower.id} flower={flower}>
                            <QuantityStepper
                                label={flower.name}
                                quantity={quantities[flower.id] ?? 0}
                                canAdd={builder.totalCount < MAX_FLOWERS}
                                onAdd={() => builder.addFlower(flower.id)}
                                onRemove={() => builder.removeFlower(flower.id)}
                            />
                        </FlowerCard>
                    ))}
                </div>
                <div className="builder__preview">
                    <div className="builder__stage">
                        <BouquetPreview wrapper={wrapper} flowerImages={flowerImages} />
                    </div>
                    <div className="builder__wrapper-picker">
                        <button
                            type="button"
                            aria-label="Попередня обгортка"
                            onClick={() => builder.setWrapper(stepWrapper(wrappers, builder.wrapperId, -1))}
                        >‹</button>
                        <p className="builder__wrapper-name">{wrapperName}</p>
                        <button
                            type="button"
                            aria-label="Наступна обгортка"
                            onClick={() => builder.setWrapper(stepWrapper(wrappers, builder.wrapperId, 1))}
                        >›</button>
                    </div>
                    <PriceSummary
                        price={price}
                        totalCount={builder.totalCount}
                        maxCount={MAX_FLOWERS}
                        onClear={builder.clear}
                    />
                </div>
            </div>
        </section>
    );
}