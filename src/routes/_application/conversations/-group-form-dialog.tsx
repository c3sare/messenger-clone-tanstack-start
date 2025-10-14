import { UserPlusIcon } from "lucide-react";
import getUsers from "@/actions/getUsers";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import GroupChatModal from "./-components/GroupChatModal";

export const GroupFormDialog = async () => {
	const users = await getUsers();

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
