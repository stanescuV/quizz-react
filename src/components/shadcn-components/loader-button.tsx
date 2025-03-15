import { Loader2 } from 'lucide-react';

import { Button } from './button';

export function ButtonLoading() {
  return (
    <Button
      disabled
      className="p-6 rounded-[10px] bg-[#6e4ffe] text-white font-extrabold font-['Poppins'] shadow-lg hover:shadow-xl active:shadow-md hover:bg-[#5a3ed7] active:bg-[#4a34b1] flex items-center gap-2"
    >
      <Loader2 className="animate-spin w-5 h-5" />
      
    </Button>
  );
}
