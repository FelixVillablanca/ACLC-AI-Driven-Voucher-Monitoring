import '../styling/styles.css';

import LoginForm from "../Auth/Login";
import Footer from "../Layout/Footer";

export default function LoginAndRegister() {

    return(
        <>  
            <div className="w-full h-full bg-red-500">
                <LoginForm />
                <Footer />
            </div>
        </>
    );
}