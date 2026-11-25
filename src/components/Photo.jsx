import { useState } from "react";
import { PHOTO_SIZE } from "../constants";

export function Photo({ src, alt, className, priority = false }) {
	const [failed, setFailed] = useState(false);

	if (failed) {
		return (
			<div
				className={`${className} ${className}--empty`}
				role="img"
				aria-label={alt}
			/>
		);
	}

	return (
		<img
			src={src}
			alt={alt}
			className={className}
			width={PHOTO_SIZE}
			height={PHOTO_SIZE}
			loading={priority ? "eager" : "lazy"}
			onError={() => setFailed(true)}
		/>
	);
}