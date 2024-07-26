
import logo from "../../public_image/logo_bpf.png";
import './header.scss';

export const Header = () => {

    return(
        <header className='header'>
            <div className='menu'>
                <div className="logo">
                    <img src={logo} alt="" className='img'/>
                </div>
                
                <h1 class='titleHeader'>BLACKPEARL <br></br>
                    FACTORY</h1>
            </div>
        </header>
    );
}