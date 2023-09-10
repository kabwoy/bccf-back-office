import { useEffect, useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
  CalendarIcon,
  UserPlusIcon,
  HomeIcon,
  UserGroupIcon,
  MegaphoneIcon
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link, Outlet } from "react-router-dom";
import { supabase } from "../../supabase/init";
import logo from '../../assets/logo.jpeg'
import useAuthStore from "./store";
import MyNavbar from "../Navbar";
import NavbarWithSearch from "../Navbar";

export default function Sidebar() {
  const [open, setOpen] = useState(0);
  const {user , getUser} = useAuthStore()
  const handleOpen = (value:any) => {
    setOpen(open === value ? 0 : value);
  };
  const [memberaCount , setMembersCount] = useState<number>(0)
  async function fetchMembers(){
    try{
      const {data} = await supabase.from("members").select();
      if(!data){
        return setMembersCount(0);
      }
      setMembersCount(data?.length);
    }catch(e){
      console.log(e)
    }
  }
  useEffect(()=>{
    fetchMembers(),
    getUser()
  })
  return (
    <>
    <div className="flex  gap-4">
    
    <Card className="h-[100vh] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography className="flex items-center gap-2 " variant="h5" color="blue-gray">
          <img src={logo} width={40} height={30}  className="rounded-xl cover" alt="logo" />
          BCCF
        </Typography>
      </div>
      <List>
        <Accordion
          open={open === 1}
          
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
              <ListItemPrefix>
                <HomeIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Dashboard
              </Typography>
            </AccordionHeader>
          </ListItem>
        
        </Accordion>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
              <ListItemPrefix>
                <CalendarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray"  className="mr-auto font-normal">
               Events
            
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
            <Link to={'/events/new'}>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                 Add Event
               
              </ListItem>
              </Link>
              <Link to={"/events"}>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                 List Event
    
              </ListItem>
              </Link>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 3}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 3 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 3}>
            <AccordionHeader onClick={() => handleOpen(3)} className="border-b-0 p-3">
              <ListItemPrefix>
                <UserPlusIcon className="h-5 w-5"  />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
               Members
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Add Member
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                List Members
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>

        <Accordion
          open={open === 4}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 4 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 4}>
            <AccordionHeader onClick={() => handleOpen(4)} className="border-b-0 p-3">
              <ListItemPrefix>
                <MegaphoneIcon className="h-5 w-5"  />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
               Announcements
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <Link to={'/announcements/new'}>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Add Anouncements
              </ListItem>
              </Link>
              <Link to={'/announcements'}>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                List Anouncements
              </ListItem>
              </Link>
              
            </List>
          </AccordionBody>
        </Accordion>
        <ListItem>
          <ListItemPrefix>
            <UserGroupIcon className="h-5 w-5" />
          </ListItemPrefix>
          Total Members
          <ListItemSuffix>
            <Chip value={memberaCount} size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem>
        <Link to={'/user/profile'}>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        </Link>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
       
        <ListItem className="flex items-center">
          <ListItemPrefix>
          <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOApFCSVByzhZorHUAP-J851JAYyOPtI1jdg&usqp=CAU"/>
          </ListItemPrefix>
           Welcome {user.email} 👋
        </ListItem>
      </List>
    </Card>
    <div className="mt-4 w-full ">
      <Outlet/>
    </div>
    </div>
    </>
  );
}