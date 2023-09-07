import { Input } from "@material-tailwind/react";
import { SearchOutlined } from "@mui/icons-material";
 
interface Props{
    takeInputValue:(searchItem:string) => void
}
export default function SearchInput({takeInputValue}:Props) {
  return (
    <div className="w-72">
      <Input crossOrigin={""} onChange={(e)=>takeInputValue(e.target.value)}  label="Search" icon={<SearchOutlined/>} />
    </div>
  );
}