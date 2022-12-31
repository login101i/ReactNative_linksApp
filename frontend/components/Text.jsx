import React from "react";
import styled from "styled-components";

const TextContainer = styled.div`
	font-size: 16px;
	font-size: ${(props) => props.size}px;
	font-family: Roboto, sans-serif;
	color: ${(props) => (props.color ? props.color : "black")};
	font-weight: ${(props) => (props.bold ? "900" : "600")};
	padding: 2px;
	white-space: pre-wrap;
	border-width: 100%;
	font-weight: ${(props) => (props.bold ? "800" : "500")};
	white-space: ${(props) => (props.wrap ? "wrap" : "nowrap")};
	margin-top: ${(props) => props.marginTop};
	border-bottom: ${(props) => props.borderBottom && "1px solid lightGrey"};
	padding: ${(props) => props.borderBottom && "8px"};
	text-align: ${(props) => (props.textAlign ? "center" : "left")};
	background: ${(props) => (props.background ? props.background : "")};
	border-radius: ${(props) => (props.background ? "4px" : "")};
	width: ${(props) => (props.fullWidth ? "100%" : "auto")};

	&:hover {
		color: ${(props) => props.hovered && "var(--linkColor)"};
		cursor: ${(props) => props.hovered && "pointer"};
	}
	:first-letter {
		text-transform: capitalize;
	}
`;

const SubTitle = styled.div`
	font-size: 14px;
	padding: 0px 6px;
	display: flex;
	flex-wrap: wrap;
	white-space: wrap;
	color: ${(props) => (props.color ? props.color : "darkGrey")};
	justify-content: ${(props) => (props.textAlign ? props.textAlign : "left")};
`;

const Textt = ({
	title,
	size,
	marginTop,
	bold,
	children,
	subTitle = "",
	color,
	borderBottom,
	hovered,
	onClick,
	wrap,
	textAlign,
	style,
	background,
	fullWidth
}) => {
	return (
		<TextContainer
			size={title ? 22 : size}
			marginTop={marginTop}
			bold={bold}
			color={color}
			borderBottom={borderBottom}
			hovered={hovered}
			onClick={onClick}
			wrap={wrap}
			textAlign={textAlign}
			style={style}
			background={background}
		>
			{title}
			{children}
			{subTitle && (
				<SubTitle color={color} textAlign={textAlign}>
					{subTitle}
				</SubTitle>
			)}
		</TextContainer>
	);
};

export default Textt;
