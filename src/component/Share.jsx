export default function Share({ name }) {
  const url = encodeURIComponent(window.location.href);

  const text = encodeURIComponent(
    `I made this for my mom ❤️ - ${name}`
  );

  return (
    <a
      className="share-btn"
      href={`https://wa.me/?text=${text}%20${url}`}
      target="_blank"
      rel="noreferrer"
    >
      Share 💌
    </a>
  );
}