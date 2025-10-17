import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Aside } from "./-aside";
import { Conversations } from "./-conversations";
import { GroupFormDialog } from "./-group-form-dialog";

export const Route = createFileRoute("/_application/conversations")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<Aside>
				<div className="px-5">
					<div className="flex justify-between mb-4 pt-4">
						<div className="text-2xl font-bold text-neutral-800">Messages</div>
						<GroupFormDialog />
					</div>
					<Conversations />
				</div>
			</Aside>
			<div className="h-full">
				<Outlet />
			</div>
		</>
	);
}
