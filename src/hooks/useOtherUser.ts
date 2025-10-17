import { useMemo } from "react";
import type getConversations from "@/actions/getConversations";
import type getCurrentUser from "@/actions/getCurrentUser";
import type { FullConversationType } from "@/types";

type Props =
	| Awaited<ReturnType<typeof getConversations>>[number]
	| FullConversationType;

const useOtherUser = (
	conversation: Props,
	currentUser: NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>,
) => {
	const otherUser = useMemo(() => {
		const currentUserEmail = currentUser.email;

		const otherUser = conversation.user?.filter(
			(user) => user.email !== currentUserEmail,
		);

		return otherUser;
	}, [currentUser.email, conversation.user]);

	return otherUser?.[0] ?? null;
};

export default useOtherUser;
