import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "../supabase/init";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        BCCF INC
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
export default function SignIn() {
  const [isLoading , setIsLoading ] = useState(false)
  const [errorMessage , setErrorMeassage] = useState("")
  const navigate = useNavigate()
  const authSchema = z.object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty({ message: "password is required" }).min(6),
  });
  type FormState = z.infer<typeof authSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormState>({ resolver: zodResolver(authSchema) });

  async function handleLogin(values: { email: string; password: string }) {
    try {
      setIsLoading(true)
      const {error} = await supabase.auth.signInWithPassword({
        password: values.password,
        email: values.email,
      });
      setIsLoading(false)
      if (error) {
        return setErrorMeassage(error.message)
      }
      return navigate("/home")
    } catch (e) {
      
      console.log(e)
    }
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      {isLoading &&  <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >  
        <CircularProgress color="inherit" />
      </Backdrop> }
     
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 14,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(handleLogin)}
            noValidate
            sx={{ mt: 1 }}
          >
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <TextField
              error={errors.email && true}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              {...register("email")}
              helperText={errors.email && `${errors.email.message}`}
              autoFocus
            />
            <TextField
              error={errors.password && true}
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              helperText={errors.password && `${errors.password.message}`}
              autoComplete="current-password"
              {...register("password", { required: true })}
            />

            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isValid}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      
    </ThemeProvider>
  );
}
