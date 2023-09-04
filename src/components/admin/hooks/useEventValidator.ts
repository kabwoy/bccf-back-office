import { z } from "zod"

export const useEventValidator = () =>{
    const eventSchema = z.object({
        event_name:z.string().min(4 , {message:"Event name must be atleast 4 chars"}),
        event_date:z.string().transform(str=>new Date(str)),
        location:z.string().nonempty("Location is required"),
        event_time:z.string().nonempty(),
        image:z.any().nullable(),
        description:z.string().nonempty({message:"Field is required"})
      }) 

      return {eventSchema}
} 