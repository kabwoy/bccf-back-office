import { Alert, Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { supabase } from "../../../supabase/init";

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
  useEffect(()=>{
    supabase.from('events').select()
    .then((response)=>{
      setEvents([...response.data as Events[]])
    })
  } , [])
  return (
    <Card className="h-full mt-2  w-full p-4 overflow-scroll">
      <div className="flex justify-center">
      <Alert className="w-[50%]  mb-2" color="green">
        Events List
        </Alert>
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
              <td className="p-4">
                <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                  Edit
                </Typography>
              </td>
            </tr>)}
            
        
        </tbody>
      </table>
    </Card>
  );
}