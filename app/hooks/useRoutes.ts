import { useMemo } from "react";
import { useParams, usePathname } from "next/navigation";
import { HiChat } from 'react-icons/hi';
import { 
	HiArrowLeftOnRectangle,
	HiUser
} from 'react-icons/hi2';
import { signOut } from "next-auth/react";
import useConvesation from "./useConversation";
import path from "path";

const useRoutes = () => {
	const pathname = usePathname();
	const { convesationId } = useConvesation();

	const routes = useMemo(() => [
			{
				label: 'Chat',
				href: '/conversations',
				icon: HiChat,
				active: pathname === '/conversations' || !!convesationId
			},
			{
				label: 'Usets',
				href: '/users',
				icon: HiUser,
				active: pathname === '/users'
			},
			{
				label: 'Logout',
				href: '#',
				onClick: () => signOut(),
				icon: HiArrowLeftOnRectangle
			}
	], [pathname, convesationId]);
	return routes;
}

export default useRoutes;
