export default function Loader() {
  return (
    <div id="LOADER" className="absolute grid bg-white s-full place-items-center">
      <div className="loader loader--style3" title="2">
        {/* @ts-ignore */}
        <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="40" height="40" style={{enableBackground: 'new 0 0 50 50'}} viewBox="0 0 50 50">
          <path d="M43.935 25.145c0-10.318-8.364-18.683-18.683-18.683-10.318 0-18.683 8.365-18.683 18.683h4.068c0-8.071 6.543-14.615 14.615-14.615s14.615 6.543 14.615 14.615h4.068z">
            <animateTransform attributeName="transform" attributeType="xml" dur="0.6s" from="0 25 25" repeatCount="indefinite" to="360 25 25" type="rotate"></animateTransform>
          </path>
        </svg>
      </div>
    </div>
  )
}
