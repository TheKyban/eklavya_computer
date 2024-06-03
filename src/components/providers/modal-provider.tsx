import { UserModal } from "@/components/modals/user/edit-user-modal";
import { DeleteUserModal } from "@/components/modals/user/delete-user-modal";
import { DeleteStudentModal } from "@/components/modals/student/delete-student-modal";
import { EditStudentModal } from "@/components/modals/student/Edit-student-modal";
import { EditGeneralMarks } from "@/components/modals/marks/edit-general-marks-modal";
import { EditComputerTypingMarksModal } from "@/components/modals/marks/edit-computer-typing-marks-modal";
import { DeleteComputerTypingMarksModal } from "@/components/modals/marks/delete-computer-typing-marks-modal";
import { DeleteGeneralMarksModal } from "@/components/modals/marks/delete-general-marks-modal";
import { StudentApplicationModal } from "@/components/modals/application/student-application-modal";
import { UserApplicationModal } from "@/components/modals/application/user-application-modal";
import { EditCourseModal } from "@/components/modals/course/edit-course-modal";
import { IssueCertificateModal } from "@/components/modals/issue/certificate";
import { IssueICardModal } from "@/components/modals/issue/icard";
import { IssueMarksheetModal } from "@/components/modals/issue/marksheet";

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
            <IssueCertificateModal />
            <IssueICardModal />
            <IssueMarksheetModal />
        </>
    );
};

export default ModalProvider;
