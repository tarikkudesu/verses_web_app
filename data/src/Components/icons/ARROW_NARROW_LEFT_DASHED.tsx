import React from "react";

interface Props {
  className?: string;
}
const ARROW_NARROW_LEFT_DASHED: React.FC<Props> = ({ className }) => {
  return (
    <div className="inline-block">
		<svg
		  xmlns="http://www.w3.org/2000/svg"
		  width="24"
		  height="24"
		  viewBox="0 0 24 24"
		  fill="none"
		  stroke="currentColor"
		  strokeWidth="2"
		  strokeLinecap="round"
		  strokeLinejoin="round"
		  className={className}
		>
		  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
		  <path d="M5 12h6m3 0h1.5m3 0h.5" />
		  <path d="M5 12l4 4" />
		  <path d="M5 12l4 -4" />
		</svg>
    </div>
  );
};

export default ARROW_NARROW_LEFT_DASHED;
