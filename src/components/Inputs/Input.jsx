import React, { useEffect, useState, useRef } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./Inputs.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Input = () => {
  const dragItem = useRef();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [userHandlers, setUserHandlers] = useState([]);
  const [showCard, setShowCard] = useState(false);
  const [userCredentails, setUserCredentails] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
  });
  const [modalData, setModalData] = useState({});

  const dragStart = (e, position, id) => {
    setShowCard(false);
    dragItem.current = position;
    // console.log(e.target.innerHTML);
  };

  const drop = (e, cardIndex, id) => {
    let positionDroped = e.nativeEvent.screenX;
    console.log(positionDroped);
    // for laptops
    if (window.innerWidth < 1370) {
      if (positionDroped > 0 && positionDroped < 340) {
        let updateAge = (userHandlers[cardIndex].age = randomIntFromInterval(
          1,
          18
        ));
        let updateArr = [...userHandlers, updateAge];
        setUserHandlers(updateArr);
      }
      if (positionDroped > 340 && positionDroped < 690) {
        let updateAge = (userHandlers[cardIndex].age = randomIntFromInterval(
          19,
          25
        ));
        let updateArr = [...userHandlers, updateAge];
        setUserHandlers(updateArr);
      }
      if (positionDroped > 690 && positionDroped < 1030) {
        let updateAge = (userHandlers[cardIndex].age = randomIntFromInterval(
          26,
          45
        ));
        let updateArr = [...userHandlers, updateAge];
        setUserHandlers(updateArr);
      }

      if (positionDroped > 1030) {
        let updateAge = (userHandlers[cardIndex].age = randomIntFromInterval(
          45,
          99
        ));
        let updateArr = [...userHandlers, updateAge];
        setUserHandlers(updateArr);
      }
    }

    // for deskstop
    if (window.innerWidth > 1370) {
      if (positionDroped > 0 && positionDroped < 500) {
        let updateAge = (userHandlers[cardIndex].age = randomIntFromInterval(
          1,
          18
        ));
        let updateArr = [...userHandlers, updateAge];
        setUserHandlers(updateArr);
      }
      if (positionDroped > 500 && positionDroped < 1000) {
        let updateAge = (userHandlers[cardIndex].age = randomIntFromInterval(
          19,
          25
        ));
        let updateArr = [...userHandlers, updateAge];
        setUserHandlers(updateArr);
      }
      if (positionDroped > 1000 && positionDroped < 1500) {
        let updateAge = (userHandlers[cardIndex].age = randomIntFromInterval(
          26,
          45
        ));
        let updateArr = [...userHandlers, updateAge];
        setUserHandlers(updateArr);
      }

      if (positionDroped > 1500 && positionDroped < 2000) {
        let updateAge = (userHandlers[cardIndex].age = randomIntFromInterval(
          45,
          99
        ));
        let updateArr = [...userHandlers, updateAge];
        setUserHandlers(updateArr);
      }
    }
  };

  // generate a random numbers between two numbers from here ..
  function randomIntFromInterval(min, max) {
    // min is the start number and max is the end numbers
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const AddUserCredentails = () => {
    const { name, age, phone, email } = userCredentails;
    if (name == "" || age == "" || phone == "" || email == "") {
      alert("enter valid details !");
      return;
    }
    if (userCredentails.age < 1 || userCredentails.age > 100) {
      alert("Invalid Age !");
      return;
    }

    let addIdToUserCredentials = {
      ...userCredentails,
      id: Date.now(),
    };

    let updatedArr = [...userHandlers, addIdToUserCredentials];
    setUserHandlers(updatedArr);
    // setUserCredentails({
    //   name: "",
    //   email: "",
    //   phone: "",
    //   age: "",
    // });

    console.log(userCredentails);
    console.log(userHandlers);
  };
  const AddUser = () => {
    setShowCard(true);
  };

  const EditCard = () => {
    const updatedId = modalData.id;

    // Find the index of the object with the given ID
    const objectIndex = userHandlers.findIndex((user) => user.id === updatedId);

    // Check if the object with the specified ID was found

    if (objectIndex !== -1) {
      setUserCredentails(userHandlers[objectIndex]);
      // Create a new array with the updated object
      const updatedArray = [...userHandlers];
      updatedArray[objectIndex] = {
        ...updatedArray[objectIndex],
        name: userCredentails.name,
        age: userCredentails.age,
        email: userCredentails.email,
        phone: userCredentails.phone,
      };

      // Update the state with the modified array
      setUserHandlers(updatedArray);
      setOpen(false);
    } else {
      console.error(`Object with ID ${updatedId} not found`);
      // Handle the case where the object with the specified ID is not found
    }
  };

  const deleteCard = (id) => {
    // Find the index of the object with the given ID
    const objectIndexToDelete = userHandlers.findIndex(
      (user) => user.id === id
    );

    let deleteItem = userHandlers.splice(objectIndexToDelete, 1);
    let updatedArr = [...userHandlers, deleteItem];
    setUserHandlers(updatedArr);
  };

  const openEditBox = (id) => {
    setOpen(true);
    setShowCard(false);
    const objectIndex = userHandlers.findIndex((user) => user.id === id);
    setUserCredentails(userHandlers[objectIndex]);
    setModalData({
      id: id,
    });
  };

  useEffect(() => {
    //console.log(userHandlers);
  }, [userHandlers]);

  return (
    <>
      <section id="input">
        <section className="dragable-cards">
          <div className="add-input">
            <button onClick={() => AddUser()}>Add +</button>
          </div>
          <header>
            <div className="col">
              <header>
                <h1>age : 1-18</h1>
              </header>
              <div className="holder">
                {userHandlers.map((data, index) => {
                  return data.age >= 1 && data.age <= 18 ? (
                    <>
                      <div
                        className="card"
                        onDragStart={(e) => dragStart(e, index, data.id)}
                        onDragEnd={(e) => drop(e, index, data.id)}
                        draggable
                      >
                        <div className="row">
                          <EditIcon
                            titleAccess="edit"
                            className="icon"
                            onClick={() => {
                              openEditBox(data.id);
                              // setModalData({
                              //   id: data.id,
                              // });
                              // setOpen(true);
                              // const objectIndex = userHandlers.findIndex(
                              //   (user) => user.id === data.id
                              // );
                              // setUserCredentails(userHandlers[objectIndex]);
                            }}
                          />
                          <DeleteIcon
                            titleAccess="delete"
                            className="icon"
                            onClick={() => deleteCard(data.id)}
                          />
                        </div>
                        <div className="row">Name : {data.name}</div>
                        <div className="row">
                          email : {data.email}@gmail.com
                        </div>
                        <div className="row">phone : {data.phone}</div>
                        <div className="row">
                          age :{" "}
                          <span className="highlight-age">{data.age}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  );
                })}
              </div>
            </div>
            <div className="col">
              <header>
                <h1>age : 19 - 25</h1>
              </header>
              <div className="holder">
                {userHandlers.map((data, index) => {
                  return data.age >= 19 && data.age <= 25 ? (
                    <>
                      <div
                        className="card"
                        onDragStart={(e) => dragStart(e, index, data.id)}
                        onDragEnd={(e) => drop(e, index, data.id)}
                        draggable
                      >
                        {" "}
                        <div className="row">
                          <EditIcon
                            titleAccess="edit"
                            className="icon"
                            onClick={() => {
                              openEditBox(data.id);
                            }}
                          />
                          <DeleteIcon
                            titleAccess="delete"
                            className="icon"
                            onClick={() => deleteCard(data.id)}
                          />
                        </div>
                        <div className="row">Name : {data.name}</div>
                        <div className="row">
                          email : {data.email}@gmail.com
                        </div>
                        <div className="row">phone : {data.phone}</div>
                        <div className="row">
                          age :{" "}
                          <span className="highlight-age">{data.age}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  );
                })}
              </div>
            </div>
            <div className="col">
              <header>
                <h1>age : 26 - 45</h1>
              </header>
              <div className="holder">
                {userHandlers.map((data, index) => {
                  return data.age >= 26 && data.age <= 45 ? (
                    <>
                      <div
                        className="card"
                        onDragStart={(e) => dragStart(e, index, data.id)}
                        onDragEnd={(e) => drop(e, index, data.id)}
                        draggable
                      >
                        <div className="row">
                          <EditIcon
                            titleAccess="edit"
                            className="icon"
                            onClick={() => {
                              openEditBox(data.id);
                            }}
                          />
                          <DeleteIcon
                            titleAccess="delete"
                            className="icon"
                            onClick={() => deleteCard(data.id)}
                          />
                        </div>
                        <div className="row"></div>
                        <div className="row">Name : {data.name}</div>
                        <div className="row">
                          email : {data.email}@gmail.com
                        </div>
                        <div className="row">phone : {data.phone}</div>
                        <div className="row">
                          age :{" "}
                          <span className="highlight-age">{data.age}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  );
                })}
              </div>
            </div>
            <div className="col">
              <header>
                <h1>age : 45+</h1>
              </header>
              <div className="holder">
                {userHandlers.map((data, index) => {
                  return data.age > 45 && data.age < 99 ? (
                    <>
                      <div
                        className="card"
                        onDragStart={(e) => dragStart(e, index, data.id)}
                        onDragEnd={(e) => drop(e, index, data.id)}
                        draggable
                      >
                        {" "}
                        <div className="row">
                          <EditIcon
                            titleAccess="edit"
                            className="icon"
                            onClick={() => {
                              openEditBox(data.id);
                            }}
                          />
                          <DeleteIcon
                            titleAccess="delete"
                            className="icon"
                            onClick={() => deleteCard(data.id)}
                          />
                        </div>
                        <div className="row">Name : {data.name}</div>
                        <div className="row">
                          email : {data.email}@gmail.com
                        </div>
                        <div className="row">phone : {data.phone}</div>
                        <div className="row">
                          age :{" "}
                          <span className="highlight-age">{data.age}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  );
                })}
              </div>
            </div>
          </header>
        </section>
        {showCard && (
          <>
            <section className="inputs-container">
              <div className="col">
                <div className="row">
                  <h1>Name</h1>
                  <input
                    type="text"
                    placeholder="name"
                    onChange={(e) =>
                      setUserCredentails({
                        ...userCredentails,
                        name: e.target.value,
                      })
                    }
                    value={userCredentails.name}
                  />
                </div>
                <div className="row">
                  <h1>Email</h1>
                  <div className="email-container">
                    <input
                      type="text"
                      placeholder="Email"
                      onChange={(e) =>
                        setUserCredentails({
                          ...userCredentails,
                          email: e.target.value,
                        })
                      }
                      value={userCredentails.email}
                    />
                    <h1>@domain.com</h1>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="row">
                  <h1>phone</h1>
                  <input
                    type="text"
                    placeholder="phone"
                    onChange={(e) =>
                      setUserCredentails({
                        ...userCredentails,
                        phone: e.target.value,
                      })
                    }
                    maxLength={10}
                    value={userCredentails.phone}
                  />
                </div>
                <div className="row">
                  <h1>age</h1>
                  <input
                    type="text"
                    placeholder="age"
                    onChange={(e) =>
                      setUserCredentails({
                        ...userCredentails,
                        age: e.target.value,
                      })
                    }
                    maxLength={2}
                    value={userCredentails.age}
                  />
                </div>
              </div>
              <div className="col">
                <button onClick={() => setShowCard(false)}>cancel</button>
                <button onClick={() => AddUserCredentails()}>Add +</button>
              </div>
            </section>
          </>
        )}
      </section>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <section className="edit-card">
            <div className="col">
              id : {modalData.id}
              <div className="row">
                <h1>Name</h1>
                <input
                  type="text"
                  value={userCredentails.name}
                  onChange={(e) =>
                    setUserCredentails({
                      ...userCredentails,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="row">
                <h1>Email</h1>
                <input
                  placeholder="email"
                  type="text"
                  value={userCredentails.email}
                  onChange={(e) =>
                    setUserCredentails({
                      ...userCredentails,
                      email: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="col">
              <div className="row">
                <h1>phone</h1>
                <input
                  type="text"
                  placeholder="phone"
                  value={userCredentails.phone}
                  onChange={(e) =>
                    setUserCredentails({
                      ...userCredentails,
                      phone: e.target.value,
                    })
                  }
                />
              </div>
              <div className="row">
                <h1>age</h1>
                <input
                  placeholder="age"
                  type="text"
                  value={userCredentails.age}
                  onChange={(e) =>
                    setUserCredentails({
                      ...userCredentails,
                      age: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="col">
              <button onClick={() => EditCard()}>Edit</button>
            </div>
          </section>
        </Box>
      </Modal>
    </>
  );
};

export default Input;
