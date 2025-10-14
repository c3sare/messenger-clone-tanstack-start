import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Aside } from "./-aside";

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
						{/* <Suspense fallback={<Skeleton className="bg-neutral-200 size-9" />}>
							<GroupFormDialog />
						</Suspense> */}
					</div>
					{/* <Suspense
						fallback={[...Array(6)].map((_item, i) => (
							<Skeleton
								key={i}
								className="bg-neutral-200 my-2 w-full h-[74px] rounded-lg"
							/>
						))}
					>
						<Conversations />
					</Suspense> */}
				</div>
			</Aside>
			<div className="h-full">
				<Outlet />
			</div>
		</>
	);
}
