import { CalendarIcon, MegaphoneIcon, UserGroupIcon } from "@heroicons/react/24/solid"
import { useEffect } from "react"
import useEventsStore from "./store/events"
import useAnnouncementsStore from "./store/announcements"
import useMembersStore from "./store/members"

function Home() {
  const {event_count , getEventCount} = useEventsStore()
  const {announcement_count , getAnnouncement} = useAnnouncementsStore()
  const {members_count , getMembers} = useMembersStore()

  useEffect(()=>{
    getEventCount()
    getAnnouncement()
    getMembers()
  } , [])
  return (
    <>
    <div className="container items-center px-4 py-8  mt-5">
  <div className="flex flex-wrap pb-3 mx-4 md:mx-24 lg:mx-0">

    <div className="w-full p-2 lg:w-1/4 md:w-1/2">
      <div
        className="flex flex-col px-6 py-10 overflow-hidden bg-white hover:bg-gradient-to-br hover:from-purple-400 hover:cursor-pointer hover:via-blue-400 hover:to-blue-500 rounded-xl shadow-lg duration-300 hover:shadow-2xl group">
        <div className="flex flex-row justify-between items-center">
          <div className="px-4 py-4 bg-gray-300  rounded-xl bg-opacity-30">
            <CalendarIcon className="h-6 w-6 group-hover:text-gray-50" />
          </div>
         
        </div>
        <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-gray-700 mt-12 group-hover:text-gray-50">{event_count}</h1>
        <div className="flex flex-row justify-between group-hover:text-gray-200">
          <p>Events</p>
          <span>
          
          </span>
        </div>
      </div>
    </div>
    <div className="w-full p-2 lg:w-1/4 md:w-1/2">
      <div
        className="flex flex-col px-6 py-10 overflow-hidden bg-white hover:bg-gradient-to-br hover:cursor-pointer hover:from-purple-400 hover:via-blue-400 hover:to-blue-500 rounded-xl shadow-lg duration-300 hover:shadow-2xl group">
        <div className="flex flex-row justify-between items-center">
          <div className="px-4 py-4 bg-gray-300  rounded-xl bg-opacity-30">
            <MegaphoneIcon className="h-6 w-6 group-hover:text-gray-50"/>
          </div>
         
        </div>
        <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-gray-700 mt-12 group-hover:text-gray-50">{announcement_count}</h1>
        <div className="flex flex-row justify-between group-hover:text-gray-200">
          <p>Announcements</p>
          <span>
         
          </span>
        </div>
      </div>
    </div>
    <div className="w-full p-2 lg:w-1/4 md:w-1/2">
      <div
        className="flex flex-col px-6 py-10 overflow-hidden bg-white hover:cursor-pointer hover:bg-gradient-to-br hover:from-purple-400 hover:via-blue-400 hover:to-blue-500 rounded-xl shadow-lg duration-300 hover:shadow-2xl group">
        <div className="flex flex-row justify-between items-center">
          <div className="px-4 py-4 bg-gray-300  rounded-xl bg-opacity-30">
           <UserGroupIcon className="h-6 w-6 group-hover:text-gray-50"/>
          </div>
         
        </div>
        <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-gray-700 mt-12 group-hover:text-gray-50">{members_count}</h1>
        <div className="flex flex-row justify-between group-hover:text-gray-200">
          <p>Members</p>
          <span>
        
          </span>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default Home