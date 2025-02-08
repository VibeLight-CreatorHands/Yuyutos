export default function Bubble({ id, className, content }: { id: string; className: string; content: string; }) {
    return <div id={id} className={className}>{content}</div>;
  }
