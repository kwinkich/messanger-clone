import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConvesation = () => {
	const params = useParams();

	const convesationId = useMemo(() => {
		if (!params?.convesationId) {
			return '';
		}

		return params.convesationId as string;
	}, [params?.convesationId]);

	const isOpen = useMemo(() => !!convesationId, [convesationId]);
	
	return useMemo(() => ({
		isOpen,
		convesationId
	}), [isOpen, convesationId]);
}

export default useConvesation;
