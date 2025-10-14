"use client";

import { Link, useRouterState } from "@tanstack/react-router";
import MobileItem from "./MobileItem";

type Props = {
	href: string;
	children?: React.ReactNode;
};

export const MobileLinkItem = ({ href, children, ...props }: Props) => {
	const {
		location: { pathname },
	} = useRouterState();
	const active = pathname.startsWith(href);

	return (
		<MobileItem
			asChild
			className={active ? "bg-gray-100 text-black" : ""}
			{...props}
		>
			<Link to={href}>{children}</Link>
		</MobileItem>
	);
};
