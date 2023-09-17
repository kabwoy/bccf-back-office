import { create } from "zustand";
import { supabase } from "../../../supabase/init";


interface Events{
    event_count:number
    getEventCount: () => Promise<void>
}

const useEventsStore = create<Events>(set => ({
    event_count:0,
    async getEventCount(){
        try{
            const {error , data } = await supabase.from('events').select()
            if(error) return console.error(error)
            // if(!count) return set({event_count:0})
            set({event_count:data.length})
        }catch(e){
            console.log(e)
        }
    }
}))

export default useEventsStore;
