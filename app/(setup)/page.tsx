import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { InitialModal } from "@/components/modals/initial-modal";

// từ profile của curr user đưa người đó đến server đầu tiên được tạo
const SetupPage = async () => {
    const profile = await initialProfile();

    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    if (server) {
        return redirect(`/servers/${server.id}`);
    }
    // nếu chưa tồn tại server thì hiện modal tạo server
    return (
        <InitialModal />
    );
}

export default SetupPage;