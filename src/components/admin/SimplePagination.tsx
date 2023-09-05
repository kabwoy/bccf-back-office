import { useReducer, useState } from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { pageNumberReducer } from "../../reducers/pageNumberReducer";
 
interface Props{
    itemCount:number;
    active:number;
    sendPageNumber:(page:number)=> void
}
export default function SimplePagination({itemCount , sendPageNumber}:Props) {
  const [value , dispatch] = useReducer(pageNumberReducer , 1);
  // const [active, setActive] = useState(1);
  const [items , setItem] = useState(itemCount);
  const next = () => {
    if (value === items) return;
    dispatch({type:'ADD'})

  };
 
  const prev = () => {
    if (value === 1) return;
    dispatch({type:'SUBTRACT'})
  };
 
  return (
    <div className="flex items-center gap-8">
      <IconButton
        size="sm"
        variant="outlined"
        onClick={prev}
        disabled={value === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      <Typography color="gray" className="font-normal">
        Page <strong className="text-gray-900">{value}</strong> of{" "}
        <strong className="text-gray-900">{itemCount}</strong>
      </Typography>
      <IconButton
        size="sm"
        variant="outlined"
        onClick={next}
        disabled={value === itemCount}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
  );
}