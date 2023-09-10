import { Alert, Button, Card, IconButton, Typography } from "@material-tailwind/react"
import SearchInput from "../SearchInput"
import { EditCalendar } from "@mui/icons-material"
import { TrashIcon } from "@heroicons/react/24/solid"
import { useEffect, useState } from "react"
import { supabase } from "../../../supabase/init"


interface IAnnouncements{
  id:number
  title:string
  content:string
  branch_id:number
}

function Announcements() {
  const [announcements , setAnnouncements] = useState<IAnnouncements[]>([])

  async function fetchAnnouncements(){
    try{
      const {data , error} = await supabase.from('announcements').select()
      if(error){
        return console.log(error)
      }
      setAnnouncements([...data])
    }catch(e){
      console.log(e)
    }
  }
  useEffect(()=>{
    fetchAnnouncements()
  }, [])
  return (
    <>
      <Card className="h-full mt-2  w-full p-4 overflow-scroll">
      <div className="flex justify-between items-center">
      <Alert className="w-[50%]  mb-2" color="gray">
         List of Announcements
        </Alert>
        <SearchInput takeInputValue={()=>{}}  />
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
                  Announcement Title
                </Typography>
                </th>
                <th  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Announcement Content
                </Typography>
                
                </th>
                <th  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Church
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
            {announcements.map((announcement)=><tr key={announcement.id} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                {announcement.title}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                {announcement.content}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                {announcement.branch_id}
                </Typography>
              </td>
              <td className="p-4 flex gap-4">
                <Button className="flex items-center" color="blue">
                  <EditCalendar className="h-5 w-5"/>
                  Edit Event
                  </Button>
                <Button onClick={()=>{}} className="flex items-center" size="sm" color="red">
                  <TrashIcon className="h-4 w-4 font-bold"/>
                  Delete
                  </Button>
              </td>
            </tr>)}
         
        </tbody>
        
      </table>
     
      <div className="flex justify-center mt-4">
      <div className="flex items-center gap-8">
      
      
    </div>
          </div>
    </Card>
    </>
  )
}

export default Announcements