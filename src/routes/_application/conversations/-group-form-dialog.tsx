import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { UserPlusIcon } from "lucide-react";
import getServerUsers from "@/actions/getUsers";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import GroupChatModal from "./-components/GroupChatModal";

export const GroupFormDialog = async () => {
	const getUsers = useServerFn(getServerUsers);

	const { data: users } = useQuery({
		queryKey: ["users"],
		queryFn: () => getUsers(),
	});

	if (!users) return <Skeleton className="bg-neutral-200 size-9" />;

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="ghost" size="icon">
					<UserPlusIcon className="size-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<GroupChatModal users={users} />
			</DialogContent>
		</Dialog>
	);
};
