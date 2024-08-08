import { useState, useEffect } from "react";
import './nav.scss';

export const Nav = () => {

    const [articles, setArticles] = useState([]);
    const [activeSection, setActiveSection] = useState(0);


    useEffect(() => {

        fetch(`${process.env.REACT_APP_API_URL}/articles`)
        .then(res => res.json())
        .then((data) => {
            console.log(data);

            if(Array.isArray(data.articles)) {
                setArticles(data.articles);
            }else{
                console.error('donnee recu pas bon', data);
                setArticles([]);
            }
            
        })
        .catch(err => console.log('erreur recup article', err))
    },[])

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
        <>
            <nav>
                <ul>
                    {Array.isArray(articles) ? (
                        articles.map((article, i) => (
                            <li key={article._id} className={activeSection === i ? 'active' : ''}>
                                <a href={`#article-${article._id}`}>{article.title}</a>
                            </li>
                        ))
                    ) : (
                        <li>Aucun article trouvé</li>
                    )}
                </ul>
                <div className='scroll-indicator' style={{top: `${activeSection * 40}px`}}></div>
            </nav>
        </>
    );
}
