import React, { useState, useEffect } from "react";
import "./style.css";

// GETTING LOCALSTORAGE DATA BACK
const getLocalData = () => {
  const lists = localStorage.getItem("myalbumlist");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Album = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

    // GETTING DATA FROM API 
    const [data, setData] = useState([]);
    const apiGet = () =>{
        fetch('https://jsonplaceholder.typicode.com/albums/')
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            setData(json);
        });
    };
  
    useEffect(() => {
    apiGet();
    }, [])

  // ADD ALBUM FUNCTION
  const addItem = () => {
    if (!inputdata) {
      alert("Please fill the blank form");
    } else if (inputdata && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputdata };
          }
          return curElem;
        })
      );

      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  //UPDTATE ALBUM FUNCTION
  const editItem = (index) => {
    const item_album_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_album_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  //UPDTATE ALBUM FUNCTION FOR ALREADY DISPLAYED ALBUM
  const editItemCreated = (index) => {
    const item_album_edited = items.find((item) => {
      return item.id === index;
    });
    setInputData(item_album_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  // DELETE ALBUM FUNCTION
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };

   //DELETE ALBUM FUNCTION FOR ALREADY DISPLAYED ALBUM
   const deleteItemCreated = (index) => {
    const updatedItems = items.filter((item) => {
      return item.id !== index;
    });
    setItems(updatedItems);
  };

  // ADDING LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("myalbumlist", JSON.stringify(items));
  }, [items]);



  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <div className="album-heading">
            <h1> ALBUM LIST </h1>
          </div>
          <div className="addItems">
            <input
              type="text"
              placeholder=" Add Item"
              className="form-control"
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>


          {/* show our items  */}
          <div className="showItems">
            {items.map((curElem) => {
              return (
                <>
              {/* ALBUM LIST  */}
                  <div className="eachItem" key={curElem.id}>
                    <h3>{curElem.name}</h3>
                    <div className="album-btn">
                      <i
                        className="far fa-edit add-btn"
                        onClick={() => editItem(curElem.id)}></i>
                      <i
                        className="far fa-trash-alt add-btn"
                        onClick={() => deleteItem(curElem.id)}></i>
                    </div>
                  </div>
                </>
              );
            })}
          </div>

          {/* ALBUM LIST FROM API */}
            <div>
            {data.map((item) => {
              return (
                <>
                  <div className="eachItem"  key={item.id}>
                    <h3>{item.title}</h3>
                    <div className="album-btn">
                      <i
                        className="far fa-edit add-btn"
                        onClick={() => editItemCreated(item.id)}
                        ></i>
                      <i
                        className="far fa-trash-alt add-btn"
                        onClick={() => deleteItemCreated(item.id)}
                        ></i>
                    </div>
                  </div>
                </>
              )
            }
            
            )}
        </div>

        </div>
      </div>
    </>
  );
};

export default Album;