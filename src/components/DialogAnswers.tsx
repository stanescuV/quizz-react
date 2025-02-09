import { Button } from "./shadcn-components/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./shadcn-components/dialog";

export function DialogAnswers({
    questionsAndCorrectAnswersCount,
    open,
    setOpen,
}: {
    questionsAndCorrectAnswersCount: {
        correctAnswersNumber: number;
        allQuestions: number;
    };
    open: boolean;
    setOpen: (open: boolean) => void;
}) {
    console.log({questionsAndCorrectAnswersCount})
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-indigo-600">
                        Correct Answers:{" "}
                        {questionsAndCorrectAnswersCount.correctAnswersNumber}{" "}
                        / {questionsAndCorrectAnswersCount.allQuestions}
                    </DialogTitle>
                    <DialogDescription>
                        You had{" "}
                        {questionsAndCorrectAnswersCount.correctAnswersNumber}{" "}
                        correct answers.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
