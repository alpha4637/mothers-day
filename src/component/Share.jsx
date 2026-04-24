export default function Share({ name, lang, song }) {
  const baseUrl = window.location.origin;

  const shareUrl = `${baseUrl}?name=${encodeURIComponent(name)}&lang=${lang}&song=${song || "mumma"}`;

  const text = encodeURIComponent(`I made this for my mom ❤️`);

  return (
    <a
      className="share-btn"
      href={`https://wa.me/?text=${text}%20${encodeURIComponent(shareUrl)}`}
      target="_blank"
      rel="noreferrer"
    >
      Share on WhatsApp 💌
    </a>
  );
}