export default class StudentStats {
    marks: number[];
    total: number;
    constructor(marks: number[], total: number) {
        this.marks = marks;
        this.total = total;
    }

    getPercentage(): number {
        const sum = this.marks.reduce((prev: number, curr: number) => {
            return prev + curr;
        });
        const percentage = (sum / this.total) * 100;
        return percentage;
    }

    getGrade(): string {
        const percentage = this.getPercentage();
        if (percentage >= 85) {
            return "A+";
        } else if (percentage >= 75 && percentage <= 84) {
            return "A";
        } else if (percentage >= 60 && percentage <= 74) {
            return "B";
        } else if (percentage >= 40 && percentage <= 59) {
            return "C";
        } else {
            return "F";
        }
    }
    getPerformance(): string {
        const percentage = this.getPercentage();
        if (percentage >= 85) {
            return "Excellent";
        } else if (percentage >= 75 && percentage <= 84) {
            return "Very Good";
        } else if (percentage >= 60 && percentage <= 74) {
            return "Good";
        } else if (percentage >= 40 && percentage <= 59) {
            return "Satisfactory";
        } else {
            return "Failure";
        }
    }
}
