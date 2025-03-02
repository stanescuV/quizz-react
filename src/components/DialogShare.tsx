import { Copy } from 'lucide-react';
import { Button } from './shadcn-components/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from './shadcn-components/dialog';
import { Input } from './shadcn-components/input';
import { Label } from './shadcn-components/label';
import QRCodeGenerator from './QRCode';
import { verifyAndInsert8DigitsCode } from '../firebase/firestore';

export function DialogShare({
  sessionId,
  open,
  setOpen
}: {
  sessionId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {


  function create8DigitsCode() :string {
    let code = '';

    for (let number = 0; number < 8; number++) {
			
			//takes a random digit
      let newNumber = String(Math.random())[3];

      code += newNumber;
    }

    console.log({ code });
    return code;
  }

	let newSessionCode8Digits = create8DigitsCode();

	verifyAndInsert8DigitsCode(newSessionCode8Digits, sessionId).then((r)=>{
		if(!r){
			newSessionCode8Digits = create8DigitsCode();
			verifyAndInsert8DigitsCode(newSessionCode8Digits, sessionId);
		}
	})



  const sessionLink = 'http://localhost:5173/session/' + newSessionCode8Digits;
  
	return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle style={{ color: '#5A3ED7' }}>Share link</DialogTitle>
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
            style={{ backgroundColor: '#5A3ED7' }}
            type="button"
            size="sm"
            className="px-3"
            onClick={() => navigator.clipboard.writeText(sessionLink)}
          >
            <span className="sr-only">Copy</span>
            <Copy />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild></DialogClose>
        </DialogFooter>
        <div className="flex justify-center items-center">
          {QRCodeGenerator(sessionLink)}
        </div>
      </DialogContent>
    </Dialog>
  );
}
