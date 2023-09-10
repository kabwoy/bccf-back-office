import { MegaphoneIcon } from "@heroicons/react/24/solid"
import { Button, Card,Input, Option, Select, Textarea, Typography } from "@material-tailwind/react"
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { supabase } from "../../../supabase/init"
import { useEffect, useState } from "react"

interface IChurch{
    id:number
    location:string
}
function AddAnnouncements() {
    const [churches , setChurches] = useState<IChurch[]>([])
    const [branch_id , setBranchId] = useState(0)
    const [branchError , setBranchError] = useState<string>('')
    const announcementSchema = z.object({
        title:z.string().nonempty({message:"Title cannot be empty"}),
        content:z.string().nonempty(),
        //branch_id:z.number().nonnegative()
    })
    type FormState = z.infer<typeof announcementSchema>

    const {register , handleSubmit , formState:{errors} ,reset} = useForm<FormState>({resolver:zodResolver(announcementSchema)})
    async function getBranches(){
        try{
            const {error , data} = await supabase.from('branches').select()
            if(error) return console.log(error);
            setChurches([...data])
        }catch(e){
            console.log(e)
        }
    }
    useEffect(()=>{
        getBranches()
    } , [])

    async function handleAdd(values:FormState){
        if(branch_id <= 0){
          return setBranchError('Please select a valid church')
        } 
        const requestBody = {...values , branch_id:branch_id}
        console.log(requestBody);

        try{
          const {data , error} = await supabase.from('announcements').insert(requestBody)

          if(error) return console.log(error)
          alert('Added')
          reset()
        }catch(e){
          console.log(e)
        }
    }
  return (
    <div className="flex justify-center mt-40">
    <Card color="transparent" shadow={false}>
    <Typography variant="h4" className="flex items-center" color="blue-gray">
        <MegaphoneIcon className="h-6 w-6"/>
      Add Anouncement
    </Typography>
    <Typography color="gray" className="mt-1 font-normal">
      Enter announcemnt details.
    </Typography>
    <form onSubmit={handleSubmit(handleAdd)}  className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
      <div className="mb-4 flex flex-col gap-6">
        <div>
        <Input 
        crossOrigin={""} 
        {...register('title')} 
        size="lg" label="Title" 
        error={errors.title && true}
        />
         {errors.title && <Typography
              variant="small"
              color="red"
              className="mt-2 flex items-center gap-1 font-normal"
            >{errors.title.message}</Typography> }
        </div>
        <div className="w-96">
        <Textarea  {...register('content')}  error={errors.content && true} label="Message" />
        {errors.content && <Typography
              variant="small"
              color="red"
              className="mt-2 flex items-center gap-1 font-normal"
            >{errors.content.message}</Typography> }
    </div>
    <div className="w-96">
       
      <Select onChange={(value)=>{
        setBranchId(+value!)
        setBranchError('')
        
        }} variant="outlined"  label="Select Church">
        {churches.map((church)=>  <Option key={church.id} value={church.id.toString()}>{church.location}</Option> )}

      </Select>
      
      {branchError && <Typography
              variant="small"
              color="red"
              className="mt-2 flex items-center gap-1 font-normal"
            >{branchError}</Typography> }
    </div>
      </div>
      <Button type="submit" className="mt-6" fullWidth>
        Add Anouncement
      </Button>
    </form>
  </Card>
  </div>
  )
}

export default AddAnnouncements