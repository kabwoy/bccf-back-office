import { create } from  "zustand";
import { supabase } from "../../../supabase/init";

interface AnnouncementsShape{
    id:number
    title:string
    branches:any
    content:string
    created_at:Date
}

interface Announcements{
    announcement_count:number
    announcements:AnnouncementsShape[]
    getAnnouncement: () => Promise<void>
}



const useAnnouncementsStore = create<Announcements>(set=>({
    announcement_count:0,
    announcements:[],
    async getAnnouncement(){
        try{
            const {data , error} = await supabase.from('announcements').select()
            if(error) return console.error(error)
            set({announcements:data , announcement_count:data.length})
        }catch(e){
            console.error(e)
        }
    }
}))


export default useAnnouncementsStore