"use client";

import { Link, useRouterState } from "@tanstack/react-router";
import DesktopItem from "./DesktopItem";

type Props = {
	href: string;
	children?: React.ReactNode;
};

export const DesktopLinkItem = ({ href, children, ...props }: Props) => {
	const {
		location: { pathname },
	} = useRouterState();

	const active = pathname.startsWith(href);

	return (
		<DesktopItem
			asChild
			className={active ? "bg-gray-100 text-black" : ""}
			{...props}
		>
			<Link to={href}>{children}</Link>
		</DesktopItem>
	);
};
