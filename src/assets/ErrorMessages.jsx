export function ErrorMessages({ message }) {
  return (
    <p className="error">
      <span>🚫</span> {message}
    </p>
  );
}
