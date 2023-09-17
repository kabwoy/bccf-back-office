import { Select, Option } from "@material-tailwind/react";
import { useState } from "react";
 
 function FilterSelect() {
  const [months , setMonths] = useState(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'])
  return (
    <div className="w-72">
      <Select label="filter by month" onChange={(e)=>alert(e)}>
        {months.map((month,index)=><Option value={month} key={index}>{month} {new Date().getFullYear()}</Option>)}
      </Select>
    </div>
  );
}

export default FilterSelect