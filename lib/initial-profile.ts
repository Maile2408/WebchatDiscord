import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";

// trả về profile hiện có hoặc tạo profile mới
export const initialProfile = async () => {
    // lấy ra user hiện tại khi đăng nhập vào hệ thống
    const user = await currentUser();

    if (!user) {
        return redirectToSignIn();
    }
    // tìm kiếm và trả về profile ứng với user
    const profile = await db.profile.findUnique({
        where: {
            userId: user.id
        }
    });

    if (profile) {
        return profile;
    }

    // tạo new profile mới nếu không tìm đc profile phù hợp

    const newProfile = await db.profile.create({
        data: {
            userId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress
        }
    });

    return newProfile;
}