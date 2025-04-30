import React from 'react';

interface Props {
	className?: string;
}
const DOT_MENU: React.FC<Props> = ({ className }) => {
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
				<g>
					<g>
						<g transform="translate(9 1)" strokeWidth="2">
							<circle cx="3" cy="4" r="1" />
						</g>
						<g transform="translate(9 9)" strokeWidth="2">
							<circle cx="3" cy="3" r="1" />
						</g>
						<g transform="translate(9 17)" strokeWidth="2">
							<circle cx="3" cy="2" r="1" />
						</g>
					</g>
				</g>
			</svg>
		</div>
	);
};

export default DOT_MENU;
