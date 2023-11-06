import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {UserProvider} from "./context/UserContext.jsx";
import {Home} from "./pages/Home.jsx";
import {Details} from "./pages/Details.jsx";
import {AddEditPost} from "./pages/AddEditPost.jsx";
import {NotFound} from "./pages/NotFound.jsx";
import {About} from "./pages/About.jsx";
import {SignIn} from "./pages/SignIn.jsx";
import {SignUp} from "./pages/SignUp.jsx";
import {PasswordReset} from "./pages/PasswordReset.jsx";
import {Navbar} from "./components/Navbar.jsx";
import {CategProvider} from "./context/CategProvider.jsx";
import {ConfirmProvider} from "material-ui-confirm";
import {Profile} from "./pages/Profile.jsx";

function App() {
    return (
        <BrowserRouter>
            <CategProvider>
                <UserProvider>
                    <ConfirmProvider>
                        <div className='app'>
                            <Navbar/>
                            <Routes>
                                <Route path='/' element={<Home/>}/>
                                <Route path='/about' element={<About/>}/>
                                <Route path='/detail/:id' element={<Details/>}/>
                                <Route path='/update/:id' element={<AddEditPost/>}/>
                                <Route path='/create' element={<AddEditPost/>}/>
                                <Route path='/signin' element={<SignIn/>}/>
                                <Route path='/signup' element={<SignUp/>}/>
                                <Route path='/pwreset' element={<PasswordReset/>}/>
                                <Route path='/profile' element={<Profile/>}/>
                                <Route path='*' element={<NotFound/>}/>
                            </Routes>
                        </div>
                    </ConfirmProvider>
                </UserProvider>
            </CategProvider>
        </BrowserRouter>
    )
}

export default App