import {
  Card,
  Button,
  Typography,
  Input,
  Textarea,
} from "@material-tailwind/react";
import {  z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { useEventValidator } from "../hooks/useEventValidator";
import {supabase} from '../../../supabase/init'
import { useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import AlertAnimation from "../../AlertPopup";

export default function AddEvent() {
  const [imageErrorText , setImageErrorText] = useState('')
  const { eventSchema } = useEventValidator();
  const [isLoading , setLoading] = useState(false)
  const [added , setAdded] = useState(false)
  type FormState = z.infer<typeof eventSchema>;
  const { register , formState:{errors} , handleSubmit } = useForm<FormState>({
    resolver: zodResolver(eventSchema),
  });
  async function handleLogin(values:FormState)  {
    let image_url = null
    if(values.image.length > 0){
      try{
        setLoading(true)
        const {data , error} = await supabase.storage.from("event_images").upload(
          `public/${values.event_name}.png-${Date.now()}`,
          values.image[0],
          {
            cacheControl: '3600',
            upsert: false
          }
        )
        setLoading(false)
        if(error){
          setImageErrorText(error.message)
          return
        }
        image_url = data?.path
      }catch(e){
        console.log(e)
      }
        
    }
    try{
      setLoading(true)
      const {error} = await supabase.from('events').insert(
        {
        image_url:image_url , 
        location:values.location , 
        event_time:values.event_time,
        event_date:values.event_date,
        description:values.description,
        event_name:values.event_name
      }
        )
        setLoading(false)
      if(error){
        return <p>shdfjhdjsfsdkf</p>
        console.log(error)
      }
      // location.reload()
      setAdded(true)
    }catch(e){
      console.log(e)
    }
    
    //console.log(values.image);
  }
  return (
    <div className="flex flex-col justify-center mt-20 ml-[30%]">
      {added && <AlertAnimation open={added}/>}
       {isLoading &&  <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >  
        <CircularProgress color="inherit" />
      </Backdrop> }

      <Card color="transparent" shadow={false}>
        <Typography
          variant="h4"
          className="flex items-center gap-2"
          color="blue-gray"
        >
          <CalendarIcon className="h-6 w-6" />
          Add Event
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Add an event
        </Typography>
        <form onSubmit={handleSubmit(handleLogin)} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <div>
            <Input
              {...register("event_name")}
              size="lg"
              error={errors.event_name && true}
              crossOrigin={""}
              label="event name"
            />
            {errors.event_name && <Typography
              variant="small"
              color="red"
              className="mt-2 flex items-center gap-1 font-normal"
            >{errors.event_name.message}</Typography> }
             
            </div>
           <div>
            <Input
              {...register("event_date")}
              size="lg"
              crossOrigin={""}
              label="event date"
              type="date"
              error={errors.event_date && true}

            />
            {errors.event_date && <Typography
              variant="small"
              color="red"
              className="mt-2 flex items-center gap-1 font-normal"
            >{errors.event_date.message}</Typography> }
            </div>
            <div>
            <Input
              {...register("location")}
              size="lg"
              crossOrigin={""}
              label="location"
              error={errors.location && true}
            />
            {errors.location && <Typography
              variant="small"
              color="red"
              className="mt-2 flex items-center gap-1 font-normal"
            >{errors.location.message}</Typography> }
            </div>
            <div>
            <Input
              {...register("event_time")}
              type="time"
              crossOrigin={""}
              size="lg"
              label="event time"
              error={errors.event_time && true}
            />
            {errors.event_time && <Typography
              variant="small"
              color="red"
              className="mt-2 flex items-center gap-1 font-normal"
            >{errors.event_time.message}</Typography> }
            </div>
            <div className="w-96">
              <Textarea 
              label="description" 
              {...register('description')}
              />
              {errors.description && <Typography
              variant="small"
              color="red"
              className="mt-2 flex items-center gap-1 font-normal"
            >{errors.description.message}</Typography> }
              
            </div>
            <div>
            <Input
                type="file"
                crossOrigin={""}
                size="md"
                label="image"
                {...register('image')}
                
              />
              {imageErrorText && <Typography
              variant="small"
              color="red"
              className="mt-2 flex items-center gap-1 font-normal"
            >{imageErrorText}</Typography> }
            </div>
          </div>
          {/* <Checkbox
          crossOrigin={unknown}
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          /> */}
          <Button type="submit" className="mt-6" fullWidth>
            Add Event
          </Button>
          {/* <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a href="#" className="font-medium text-gray-900">
              Sign In
            </a>
          </Typography> */}
        </form>
      </Card>
    </div>
  );
}
