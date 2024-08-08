import './home.scss'
import {Header} from '../../components/header/header'
import { Articles } from '../../components/article/article';
import {Nav} from '../../components/nav/nav'

export const Home = () => {

    return(
        <> 
            <Header/>
            <div className='cadre'>
                <h2>Notre forge virtuelle</h2>

                <h3>Au service de votre imagination</h3>

                <p>Chez Blackpearl Factory, nous sommes guidés par la conviction que chaque élan créatif mérite de prendre forme.</p>
            </div>
            <div className='navigation-articles'>
                <div className='navHome'>
                    <Nav/>
                </div>
                <div className='articleHome'>
                    <Articles/>
                </div>
            </div >
        </>
    );
}