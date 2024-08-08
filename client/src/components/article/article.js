import {useEffect, useState} from 'react';


export const Articles = () => {

    const [articles ,setArticles] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/articles`, {
            method: 'GET'
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data.articles);

            setArticles(data.articles);
        })
        .catch((err) => console.log(err))
    },[])

    return (
        <>
            {articles.map((article) => (
                <div id={`article-${article._id}`} key={article._id} className='article'>
                    <h2>{article.title}</h2>
                    <p>{article.description}</p>
                </div>
            ))}
        </>
    )

}