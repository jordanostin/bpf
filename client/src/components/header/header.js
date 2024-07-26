import { useState } from "react";
import logo from "../../public_image/logo_bpf.png";
import './header.scss';

export const Header = () => {

    const [isActive, setIsActive] = useState(false);

    const toggleMenu = () =>{
        const newState = !isActive;
        setIsActive(newState)
        console.log(`bouton ${newState ? 'actif' : 'inactif'}`);
    }

    return(
        <header className='header'>

            <div className='menu'>

                <div className="logo">
                    <img src={logo} alt="" className='img'/>
                </div>
                
                <h1 className='titleHeader'>BLACKPEARL <br></br>
                    FACTORY</h1>

            </div>

            <div className='search'>
                <button className={`menu-btn ${isActive ? 'active': ''}`} onClick={toggleMenu}>

                    <div className={`line-wrapper ${isActive ? 'active': ''}`}>

                        <div className='line-1 line'></div>
                        <div className='line-2 line'></div>

                    </div>

                </button>
            </div>

            <div className={`fullscreen-menu ${isActive ? 'active' : ''}`}>
                <nav>
                    <ul>
                        <li><a href="">Home</a></li>
                        <li><a href="">Activités</a></li>
                        <li><a href="">Workflow</a></li>
                        <li><a href="">A propos</a></li>
                        <li><a href="">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}