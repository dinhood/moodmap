export default function Tooltip({ text }) {
  return (
    <span className="tooltip" data-tooltip={text}>
      ⓘ
    </span>
  );
}
