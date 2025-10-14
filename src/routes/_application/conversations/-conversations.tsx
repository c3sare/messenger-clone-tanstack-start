import getConversations from "@/actions/getConversations";
import getCurrentUser from "@/actions/getCurrentUser";
import ConversationList from "./-components/ConversationList";

export const Conversations = async () => {
	const [conversations, currentUser] = await Promise.all([
		getConversations(),
		getCurrentUser(),
	]);

	return (
		<ConversationList currentUser={currentUser!} initialItems={conversations} />
	);
};
