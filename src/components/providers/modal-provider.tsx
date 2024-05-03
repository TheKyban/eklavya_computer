import { UserModal } from "@/components/modals/edit-user-modal";
import { DeleteUserModal } from "@/components/modals/delete-user-modal";
import { DeleteStudentModal } from "@/components/modals/delete-student-modal";
import { EditStudentModal } from "@/components/modals/Edit-student-modal";
import { EditGeneralMarks } from "@/components/modals/edit-general-marks-modal";
import { EditComputerTypingMarksModal } from "@/components/modals/edit-computer-typing-marks-modal";
import { DeleteComputerTypingMarksModal } from "@/components/modals/delete-computer-typing-marks-modal";
import { DeleteGeneralMarksModal } from "@/components/modals/delete-general-marks-modal";
import { StudentApplicationModal } from "@/components/modals/student-application-modal";
import { UserApplicationModal } from "@/components/modals/user-application-modal";
import { EditCourseModal } from "@/components/modals/edit-course-modal";

const ModalProvider = () => {
    return (
        <>
            <UserModal />
            <DeleteUserModal />
            <DeleteStudentModal />
            <EditStudentModal />
            <EditGeneralMarks />
            <EditComputerTypingMarksModal />
            <DeleteComputerTypingMarksModal />
            <DeleteGeneralMarksModal />
            <StudentApplicationModal />
            <UserApplicationModal />
            <EditCourseModal />
        </>
    );
};

export default ModalProvider;
