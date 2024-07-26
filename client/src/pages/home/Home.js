import './home.scss'
import {Header} from '../../components/header/header'

export const Home = () => {

    return(
        <> 
            <Header/>
            <div className='cadre'>
                <h2>Notre forge virtuelle</h2>

                <h3>Au service de votre imagination</h3>

                <p>Chez Blackpearl Factory, nous sommes guidés par la conviction que chaque élan créatif mérite de prendre forme.</p>
            </div>
        </>
    );
}