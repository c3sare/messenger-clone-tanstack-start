// import getCurrentUser from "@/actions/getCurrentUser";
// import Avatar from "@/components/Avatar";
// import SettingsModal from "@/components/sidebar/SettingsModal";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

export const UserForm = async () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<button className="cursor-pointer hover:opacity-75 transition">
					{/* <Avatar user={currentUser!} /> */}
				</button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Profile</DialogTitle>
					<DialogDescription>Edit your public information.</DialogDescription>
				</DialogHeader>
				{/* <SettingsModal currentUser={currentUser!} /> */}
			</DialogContent>
		</Dialog>
	);
};
