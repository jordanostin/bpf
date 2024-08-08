import { useState, useEffect } from "react";
import './nav.scss';

export const Nav = () => {

    const [activeSection, setActiveSection] = useState(0);

    const handleScroll = () => {

        const sections = document.querySelectorAll('section');
        let currentIndex = 0;

        sections.forEach((section, i) => {
            const rect = section.getBoundingClientRect();

            if(rect.top >= 0 && rect.top <window.innerHeight / 2){
                currentIndex = i;
            }
        });

        setActiveSection(currentIndex);

    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    },[])

    return(
        <nav>
            <ul>
                <li className={activeSection === 0 ? 'active' : ''}><a href='#'>Modélisations 3D</a></li>
                <li className={activeSection === 1 ? 'active' : ''}><a href='#'>Réalités virtuelles</a></li>
                <li className={activeSection === 2 ? 'active' : ''}><a href='#'>Applications vidéoludiques</a></li>
            </ul>
            <div className='scroll-indicator' style={{top: `${activeSection * 40}px`}}></div>
        </nav>
    );
}