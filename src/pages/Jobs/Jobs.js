import React from 'react';
import {useEffect, useState} from 'react'
import {fetchAllPosts} from "../../api/postApi";

const Jobs = () => {



    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        loadAllJobs();
    }, [])


    const loadAllJobs = () => {
        setIsLoading(true);
        fetchAllPosts().then(response => {
            setPosts(response.data)
            console.log(posts)
        }).finally(() => {
            setIsLoading(false)
        })
    }

    // const handleDeleteClick = (id) => {
    //     setIsLoading(true);
    //
    //     deletePost(id)
    //         .then(() => {
    //             loadAllJobs();
    //         })
    // }

    return (

        <h1>Total jobs: {posts.length}</h1>
    )

}
export default  Jobs