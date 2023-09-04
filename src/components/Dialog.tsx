import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
interface Props{
  error_message:string
  handleOpen:()=>void
  is_open:boolean
}
export default function PopUpDialog({error_message , handleOpen , is_open}:Props) {
 
  return (
    <>
      <Dialog open={is_open} handler={handleOpen}>
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody divider>
         {error_message}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Close</span>
          </Button>
         
        </DialogFooter>
      </Dialog>
    </>
  );
}