import { createFileRoute } from "@tanstack/react-router";
import EmptyState from "@/components/EmptyState";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_application/conversations/")({
	component: RouteComponent,
});

function RouteComponent() {
	const isOpen = false;

	return (
		<div
			className={cn("lg:pl-80 h-full lg:block", isOpen ? "block" : "hidden")}
		>
			<EmptyState />
		</div>
	)
}
