import { useEffect, useState } from "react";

export default function Blog() {
    const [posts, setPosts] = useState([]); //store fetched posts
    const [loading, setLoading] = useState(true); //track whether data is being fetched
    const [error, setError] = useState(null); //track any errors

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => {
                if (!res.ok) { //if response does not fall within 200 range
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                setPosts(data); //update posts state with fetched data
                setLoading(false); //update loading state
            })
            .catch(error => {
                setError(error); //if there's an error, update error state
                setLoading(false);
            });
    }, []);

    if (loading) { //if data still being fetched
        return <div>Loading...</div>;
    }

    if (error) { //if an error occurs
        return (
            <div>
                <h1>Data fetch failed</h1>
                <p>{error.message}</p>
            </div>
        ); //display message of the error object that was thrown (network response was not ok)
    }

    return (
        <div>
            {posts.map(post => ( //for every post in posts array, create a div, with post id, title and paragraph
                <div key={post.id}>
                    <h3>{post.id}. {post.title}</h3>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    );
}
