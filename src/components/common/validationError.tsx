import Image from "next/image";

export default function ValidationError({ message }: { message: string }) {
	return (
		<div className="flex items-center mt-1">
			<Image
				src="/icons/information-fill-red.svg"
				width={16}
				height={16}
				alt="Information Icon"
			/>
			<p className="text-[#FB3748] text-xs mt-1 text-left ml-1">{message}</p>
		</div>
	);
}
