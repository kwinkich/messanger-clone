import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";
import { deflate } from "zlib";

const getCurrentUser = async () => {
    try{
        const session = await getSession();

        if (!session?.user?.email){
            return null;
        }

        const currnetUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        });

        if (!currnetUser){
            return null;
        }

        return currnetUser;

    } catch (error:any) {
        return null;
    }
}

export default getCurrentUser;
