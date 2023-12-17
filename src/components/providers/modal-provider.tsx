import { UserModal } from "@/components/modals/user-modal";
import { DeleteUserModal } from "../modals/delete-user-modal";

const ModalProvider = () => {
    return (
        <>
            <UserModal />
            <DeleteUserModal />
        </>
    );
};

export default ModalProvider;
