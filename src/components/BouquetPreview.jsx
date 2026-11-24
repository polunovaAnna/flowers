import { fanAngle } from "../utils/fanAngle"

export function BouquetPreview({ wrapper, flowerImages }) {
    const hasWrapper = Boolean(wrapper?.back);

    return (
        <div className={`bouquet-preview${hasWrapper ? "" : " bouquet-preview--bare"}`}>
            {wrapper?.back && (
                <img
                    className="bouquet-preview__layer bouquet-preview__layer--back"
                    src={wrapper.back}
                    alt=""
                />
            )}
            <div className="bouquet-preview__flowers" >
                {flowerImages.map((flower, index) => (
					<img
						key={`${flower.id}-${index}`}
						className="bouquet-preview__flower"
						src={flower.illustration}
                        alt=""
                        style={{ transform: `rotate(${fanAngle(index, flowerImages.length)}deg)` }}
					/>
				))}
            </div>
            {wrapper?.front && (
                <img
                    className="bouquet-preview__layer bouquet-preview__layer--front"
                    src={wrapper.front}
                    alt=""
                />
            )}
        </div>
    )
}