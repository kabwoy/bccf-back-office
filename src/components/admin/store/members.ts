import { create } from  "zustand";
import { supabase } from "../../../supabase/init";

interface MemberShape {
    id:number
    first_name:string
    last_name:string
    phone_number:string
    branch_id:number
    gender:string
    getMembers: () => Promise<void>
}

interface MemberStoreShape{
    members_count:number
    members:MemberShape[]
    getMembers:()=>Promise<void>
}

const useMembersStore = create<MemberStoreShape>(set=>({
    members_count:0,
    members:[],
    async getMembers(){
        try{
            const {data , error} = await supabase.from('members').select()
            if(error) return console.error(error)
            set({members:data , members_count:data.length})
        }catch(e){
            console.error(e)
        }
    }
}))


export default useMembersStore