import {create} from 'zustand'
import { supabase } from '../../../supabase/init'

interface IUserType{
    id:string
    email:string | undefined
    //access_token:string
}

interface User{
    user:IUserType
    getUser : () => Promise<void>
}

const useAuthStore = create<User>(set => ({
    user:{id:'' , email: '',},
    async getUser() {
        try{
            const {data , error} = await supabase.auth.getUser()
            if(error){
                return console.log(error.message)
            }
            set({user:{email:data.user.email , id:data.user.id}})
        }catch(e){

            console.log(e)
        }
       
    },
}))

export default useAuthStore