import { useParams } from "@tanstack/react-router";
import { useMemo } from "react";

const useConversation = () => {
	const params = useParams({
		from: "/_application/conversations/$conversationId",
	});

	const conversationId = useMemo(() => {
		if (!params?.conversationId) {
			return null;
		}

		return Number(params.conversationId);
	}, [params?.conversationId]);

	const isOpen = useMemo(() => !!conversationId, [conversationId]);

	return useMemo(
		() => ({
			isOpen,
			conversationId,
		}),
		[isOpen, conversationId],
	);
};

export default useConversation;
