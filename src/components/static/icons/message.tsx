export default function MessageIcon(props: { className?: string }) {
  return (
    <svg
      width="30"
      height="30"
      className={props.className}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.75 10L14.5528 15.4014C14.8343 15.5422 15.1657 15.5422 15.4472 15.4014L26.25 10M3.75 8.75V21.25C3.75 22.6307 4.75736 23.75 6 23.75H24C25.2426 23.75 26.25 22.6307 26.25 21.25V8.75C26.25 7.36929 25.2426 6.25 24 6.25H6C4.75736 6.25 3.75 7.36929 3.75 8.75Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}
