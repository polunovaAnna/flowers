const DEFAULT_MESSAGE = "Щось пішло не так";

export function ErrorMessage({ message }) {
	return (
		<p className="error-message" role="alert">
			{message || DEFAULT_MESSAGE}
		</p>
	);
}