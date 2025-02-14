import { useEffect, useState } from "react";
import { deletePost, getPost } from "../api/PostApi";
import "../App.css";
import { Form } from "./Form";

export const Posts = () => {
    const [data, setData] = useState([]);
    const [updateDataApi, setUpdateDataApi] = useState({});

  // console.log(getPost());

  const getPostData = async() => {
    try {
      const res = await getPost();
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPostData();
  }, []);


  //? function to delete post :-
  const handleDeletePost = async(id) => {
    try {
      const res = await deletePost(id);

      if(res.status === 200){
        const newUpdatedPosts = data.filter((curPost) => {
          return curPost.id !== id;
        });
        setData(newUpdatedPosts);
      }else{
        console.log("Failed to delete the post:", res.status);
      }
    } catch (error) {
      console.log(error);
    }

  };

  //? handleUpdatePost function :-
  const handleUpdatePost = (curElem) => setUpdateDataApi(curElem);
  
  return(
    <>
      <section className="section-form">
        <Form data={data} setData={setData} updateDataApi={updateDataApi} setUpdateDataApi={setUpdateDataApi}></Form>
      </section>

      <section className="section-post">
          <ol>
              {data.map((curElem) => {
                  const { id, body, title } = curElem;
                  return(
                      <li key={id}>
                          <p style={{marginBottom: "10px", marginTop: "10px"}}>Title: {title}</p>
                          <p style={{marginBottom: "20px"}}>Body: {body}</p>
                          <button onClick={() => handleUpdatePost(curElem)}>Edit</button>
                          <button className="btn-delete" onClick={() => handleDeletePost(id)}>Delete</button>
                      </li>
                  )
              })}
          </ol>
      </section>
    </>
  )
};