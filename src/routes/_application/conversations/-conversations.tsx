import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import getServerConversations from "@/actions/getConversations";
import getServerCurrentUser from "@/actions/getCurrentUser";
import { Skeleton } from "@/components/ui/skeleton";
import ConversationList from "./-components/ConversationList";

export const Conversations = async () => {
	const getCurrentUser = useServerFn(getServerCurrentUser);
	const getConversations = useServerFn(getServerConversations);
	const { data: conversations } = useQuery({
		queryKey: ["conversations"],
		queryFn: () => getConversations(),
	});
	const { data: currentUser } = useQuery({
		queryKey: ["currentUser"],
		queryFn: () => getCurrentUser(),
	});

	if (!currentUser || !conversations)
		return [...Array(6)].map((_item, i) => (
			<Skeleton
				key={i}
				className="bg-neutral-200 my-2 w-full h-[74px] rounded-lg"
			/>
		));

	return (
		<ConversationList currentUser={currentUser} initialItems={conversations} />
	);
};
