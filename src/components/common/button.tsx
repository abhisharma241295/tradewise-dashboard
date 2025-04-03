interface ButtonProps {
	buttonText?: string;
	icon?: React.ReactNode;
	handleClick?: () => void;
	[key: string]: string | React.ReactNode | (() => void) | undefined;
}
export default function Button({
	buttonText,
	icon,
	handleClick,
	...rest
}: ButtonProps) {
	return (
		<button onClick={handleClick} {...rest}>
			{icon}
			{buttonText}
		</button>
	);
}
