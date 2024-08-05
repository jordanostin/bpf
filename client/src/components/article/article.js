import {useEffect, useState} from 'react';


export const Articles = () => {

    const [artticles ,setArticles] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    fetch(`${process.env.REACT_APP_API_URL}/articles`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
    })
    .catch((err) => console.log(err))

    return (
        <>
        </>
    )

}