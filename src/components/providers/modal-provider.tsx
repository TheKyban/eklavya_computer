import { UserModal } from "@/components/modals/user-modal";
import { DeleteUserModal } from "@/components/modals/delete-user-modal";
import { DeleteStudentModal } from "@/components/modals/delete-student-modal";
import { EditStudentModal } from "@/components/modals/Edit-student-modal";

const ModalProvider = () => {
    return (
        <>
            <UserModal />
            <DeleteUserModal />
            <DeleteStudentModal />
            <EditStudentModal />
        </>
    );
};

export default ModalProvider;
