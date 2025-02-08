export default function Button({ content, onClick }: { content: string; onClick?: () => void; }) {
  return (
    <button onClick={onClick}>
      {content}
    </button>
  );
}
