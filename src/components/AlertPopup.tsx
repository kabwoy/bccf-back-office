import { Alert } from "@material-tailwind/react";
import { useState } from "react";
 interface Props{
    open:boolean
}

export default function AlertAnimation({open}:Props) {
    const [openToast , setOpenToast] = useState(open)
  return (
    <>
      <Alert
      className="absolute w-[20%] bg-green-500 right-0 bottom-2"
        open={openToast}
        onClose={() => setOpenToast(false)}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
      >
        Event added successfully
      </Alert>
    </>
  );
}