import { Copy } from "lucide-react";
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
import { Input } from "./shadcn-components/input";
import { Label } from "./shadcn-components/label";
import QRCodeGenerator from "./QRCode";
import { readSessionUUIDWith8DigitCode, createNew8DigitsCodeSession } from "../firebase/firestore";

export function DialogShare({
    sessionCode,
    open,
    setOpen,
}: {
    sessionCode: string;
    open: boolean;
    setOpen: (open: boolean) => void;
}) {

    async function createSessionCode (sessionUUID: string){
        
        let code = "";

        for(let number = 0 ; number < 8; number ++){

            let newNumber = Math.floor(Math.random() * 8);
            code += String(newNumber); 
            
        }

        console.log({code});
        const session = await readSessionUUIDWith8DigitCode(code);

        if(!session){
            console.log("codul nu exista in baza de date");

            const sessionCodes8DigitsObjectDB = {[code]:{sessionUUID}}
            createNew8DigitsCodeSession(sessionCodes8DigitsObjectDB);
            return;
        }

        console.log("The session code string :", session.sessionUUID)
        
    }
    createSessionCode('99999999');

    const sessionLink = "http://localhost:5173/session/" + sessionCode;
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle style={{color:"#5A3ED7"}}>Share link</DialogTitle>
                    <DialogDescription>
                        Anyone who has this link will be able to view this.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input id="link" value={sessionLink} readOnly />
                    </div>
                    <Button
                        style={{backgroundColor:"#5A3ED7"}}
                        type="button"
                        size="sm"
                        className="px-3"
                        onClick={() =>
                            navigator.clipboard.writeText(sessionLink)
                        }
                    >
                        <span className="sr-only">Copy</span>
                        <Copy />
                    </Button>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            <div className="flex justify-center items-center">{QRCodeGenerator(sessionLink)}</div>
            </DialogContent>
        </Dialog>
    );
}
