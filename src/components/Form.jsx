import { useEffect, useState } from "react";
import { postData, updateData } from "../api/PostApi";

export const Form = ({data, setData, updateDataApi, setUpdateDataApi}) => {
    const [addData, setAddData] = useState({title: "", body: ""});

    let isEmpty = Object.keys(updateDataApi).length === 0;

    // get the updated data and add into input field :-
    useEffect(() => {
        updateDataApi && setAddData({title: updateDataApi.title || "", body: updateDataApi.body || ""});
    }, [updateDataApi]);

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setAddData((prevData) => {
            return{...prevData, [name]: value};
        });
    };

    const addPostData = async() => {
        try {
            const res = await postData(addData);
            console.log("res", res);

            if(res.status === 201){
                setData([...data, res.data]);
                setAddData({title: "", body: ""});
            }
        } catch (error) {
            console.log(error);
        }
    };

    const updatePostData = async() => {
        try {
            const res = await updateData(updateDataApi.id, addData);
            console.log(res);

            if(res.status === 200){
                setData((prevData) => {
                    return prevData.map((curElem) => {
                        return curElem.id === res.data.id ? res.data : curElem;
                    });
                });

                setAddData({title: "", body: ""});
                setUpdateDataApi({});
            }            
        } catch (error) {
            console.log(error);
        }
    };


    // form submission :-
    const handleFormSubmit = (event) => {
        event.preventDefault();
        const action = event.nativeEvent.submitter.value;       //? By this we can find what value of the button is -> "Add" or "Edit"

        if(action === "Add"){
            addPostData();
        }else if(action === "Edit"){
            updatePostData();
        }
    };

    return(
        <form onSubmit={handleFormSubmit}>
            <div>
                <label htmlFor="title"></label>
                <input type="text" name="title" id="title" autoComplete="off" placeholder="Add Title" value={addData.title} onChange={handleInputChange} />
            </div>

            <div>
                <label htmlFor="body"></label>
                <input type="text" name="body" id="body" autoComplete="off" placeholder="Add Post" value={addData.body} onChange={handleInputChange} />
            </div>

            <button type="submit" value={isEmpty ? "Add" : "Edit"}> {isEmpty ? "Add" : "Edit"} </button>
        </form>
    );
};