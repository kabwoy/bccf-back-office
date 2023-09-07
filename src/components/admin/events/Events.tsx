import { Alert, Card, Typography , Button, IconButton } from "@material-tailwind/react/";
import { useEffect, useReducer, useState } from "react";
import { supabase } from "../../../supabase/init";
import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Backdrop, CircularProgress } from "@mui/material";
import { EditCalendar } from "@mui/icons-material";
import { pageNumberReducer } from "../../../reducers/pageNumberReducer";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import SearchInput from "../SearchInput";

interface Events{
  id:number
  event_name:string
  event_date:Date
  description:string
  location:string
  event_time:string
}

export default function Events() {
  const [events , setEvents] = useState<Events[]>([])
  const [eventCount , setEventCount] = useState(0);
  const [isLoading , setIsLoading] = useState(false);
  const [isEmptyEvents, setIsEmptyEvents] = useState(false);
  const [value , dispatch] = useReducer(pageNumberReducer , 1);

  useEffect(function getEventLength(){
    supabase.from('events').select().then((response)=>{
      setEventCount(response.data!.length);
    })
  },[])
  const next = () => {
    if (value === Math.ceil(eventCount/3)) return;
    
    dispatch({type:'ADD'})
    fetchEvents(value)

  };
 
  const prev = () => {
    if (value === 1) return;
    dispatch({type:'SUBTRACT'})
    fetchEvents(value)
  };
  useEffect(()=>{
   
    // const {from, to} = getPagination()
    fetchEvents(value)
  } , [])
  function fetchEvents(page:number){
    setIsLoading(true)
    supabase.from('events').select().range(page*3-3,page*3)
    .then((response)=>{
      console.log(response.data)
      setEvents([...response.data as Events[]])
      setIsLoading(false)
    })
  }

  async function takeInput(value:string){
    try{
      setIsLoading(true)
      const {data , error} = await supabase.from("events").select().like('event_name' , `%${value}%`).limit(4)
      setIsLoading(false)
      if(error){
        return console.log(error)
      }
      if(data.length <= 0){
        setIsEmptyEvents(true)
        return
      }
      setEvents([...data]);
      setIsEmptyEvents(false)
    }catch(e){
      console.log(e)
    }
   
  }
  return (
    
    <> 
    {isLoading &&  <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >  
      <CircularProgress color="inherit" />
    </Backdrop> }
    <Card className="h-full mt-2  w-full p-4 overflow-scroll">
      <div className="flex justify-between items-center">
      <Alert className="w-[50%]  mb-2" color="green">
        Events List
        </Alert>
        <SearchInput takeInputValue={takeInput}  />
      </div>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
              <th  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Event name
                </Typography>
                </th>
                <th  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Event date
                </Typography>
                </th>
                <th  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Event Time
                </Typography>
                </th>

                 <th  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Event Location
                </Typography>
                </th>

                <th  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Actions
                </Typography>
                </th>
        
        
      
          </tr>
        </thead>
        <tbody>
          {/* {isEmptyEvents && <tr><td><Alert color="amber">A warning alert for showing message.</Alert></td></tr>} */}
            {events.map((event)=><tr key={event.id} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                {event.event_name}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                {event.event_date.toString()}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                {event.event_time}
                </Typography>
              </td>
              <td className="p-4">
                <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                {event.location}
                </Typography>
              </td>
              <td className="p-4 flex gap-4">
                <Button className="flex items-center" color="blue">
                  <EditCalendar className="h-5 w-5"/>
                  Edit Event
                  </Button>
                <Button className="flex items-center" size="sm" color="red">
                  <TrashIcon className="h-4 w-4 font-bold"/>
                  Delete
                  </Button>
              </td>
            </tr>)}
         
        </tbody>
        
      </table>
     
      <div className="flex justify-center mt-4">
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
        <strong className="text-gray-900">{Math.ceil(eventCount/3)}</strong>
      </Typography>
      <IconButton
        size="sm"
        variant="outlined"
        onClick={next}
        disabled={value === eventCount}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
              {/* <SimplePagination itemCount={eventCount} active={active} /> */}
          </div>
    </Card>
    
    </>
  );
}