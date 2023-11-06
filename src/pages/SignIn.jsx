import {createTheme, ThemeProvider} from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined.js";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import {UserContext} from "../context/UserContext.jsx";
import {Link} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";

const defaultTheme = createTheme();

export const SignIn = () => {

    const {loginUser, msg} = useContext(UserContext);
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        loginUser(data.get('email'), data.get('password'))
    };
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs" sx={{boxShadow: '0 0 10px rgb(21,101,192)'}}>
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <Typography sx={{color: 'red', fontSize: '0.8rem', textAlign: 'center'}}>{msg?.signin}</Typography>
                    </Box>
                </Box>
                <Box display="grid" gridTemplateColumns="repeat(2, 1fr)">
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => {
                            console.info("Password reset");
                            navigate(('/pwreset'))
                        }}
                    >
                        Password Reset
                    </Link>
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => {
                            console.info("Account delete");
                        }}
                    >
                        Delete Account
                    </Link>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default SignIn;