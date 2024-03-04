import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../API/PostService';
import Loader from '../components/UI/loader/Loader';
import { useFetching } from '../hooks/useFetching';

const PostIdPages = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    
    const [fetcPostById, isLoading, error] = useFetching( async (id) => {
        const response = await PostService.getByID(id)
        setPost(response.data);
    })
    const [fetchComments, isComLoading, comError] = useFetching( async (id) => {
        const response = await PostService.getCommentsByPostId(id)
        setComments(response.data);
    })
    
    useEffect(() => {
        fetcPostById(params.id)
        fetchComments(params.id)
    }, [])

    return (
        <div>
            <h1>Привет, это пост с ID = {params.id}</h1>
            {isLoading
                ?   <Loader/>
                :   <div>{post.id}. {post.title}</div>
            }
            <h1>Комментарии</h1>
            {isComLoading
                ?   <Loader/>
                :   <div>
                        {comments.map(comm => 
                            <div key={comm.id} style={{marginTop: 15}}>
                                <h5>{comm.email}</h5>
                                <div>{comm.body}</div>
                            </div>)}
                    </div>
            }
        </div>
    );
};

export default PostIdPages;