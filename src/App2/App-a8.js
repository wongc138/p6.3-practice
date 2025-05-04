import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

// COMPONENT REUSABLE - BUTTON
function Buttona({ children, onClick1 }) {
  return (
    <button className="button" onClick={onClick1}>
      {children}
    </button>
  );
}

// COMPONENT - MAIN APP
export default function App() {
  const [friendsArr, setfriendsArr] = useState(initialFriends);
  const [showFormAddFriend, setshowFormAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowFormAddFriend() {
    setshowFormAddFriend((showform) => !showform);
  }

  function handleAddFriend(friendcc) {
    setfriendsArr((friends22) => [...friends22, friendcc]);
    setshowFormAddFriend(false); // Close the form after adding a friend
  }

  function handleSelectFriend(friendd) {
    // setSelectedFriend(friendd);
    setSelectedFriend((curr) => (curr?.id === friendd.id ? null : friendd));
    setshowFormAddFriend(false); // Close the form when a friend is selected
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friendsb={friendsArr}
          selectedFriend1b={selectedFriend}
          onSelection1a={handleSelectFriend}
        />

        {showFormAddFriend && (
          <FormLowerAddFriend onAddFriend={handleAddFriend} />
        )}

        <Buttona onClick1={handleShowFormAddFriend}>
          {showFormAddFriend ? "Close" : "Add Friend"}
        </Buttona>
      </div>
      {selectedFriend && (
        <FormRightSplitBill selectedFriend1={selectedFriend} />
      )}
    </div>
  );
}

// COMPONENT - UPPER LEFT
function FriendsList({ friendsb, onSelection1a, selectedFriend1b }) {
  // const friends = initialFriends;

  return (
    <ul>
      {friendsb.map((friend1) => (
        <Friend
          frienda={friend1}
          key={friend1.id}
          onSelection1b={onSelection1a}
          selectedFriend1c={selectedFriend1b}
        />
      ))}
    </ul>
  );
}

// COMPONENT  - UPPER LEFT - friend array text
function Friend({ frienda, onSelection1b, selectedFriend1c }) {
  const isSelected = selectedFriend1c?.id === frienda.id; // Check if the current friend is selected

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={frienda.image} alt={frienda.name} />
      <h3>{frienda.name}</h3>
      {frienda.balance < 0 && (
        <p className="red">
          You owe {frienda.name} ${Math.abs(frienda.balance)}
        </p>
      )}
      {frienda.balance > 0 && (
        <p className="green">
          {frienda.name} owes you ${Math.abs(frienda.balance)}
        </p>
      )}
      {frienda.balance === 0 && <p>You and {frienda.name} are even</p>}

      <Buttona onClick1={() => onSelection1b(frienda)}>
        {isSelected ? "Close" : "Select"}
      </Buttona>
    </li>
  );
}

// COMPONENT - LOWER LEFT
function FormLowerAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmitFormLower(e) {
    e.preventDefault(); // Prevent the default form submission behavior
    if (!name || !image) return; // Check if name and image are provided

    const id = crypto.randomUUID(); // Generate a unique ID for the new friend
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend); // Log the new friend object

    setName(""); // Reset the name input field
    setImage("https://i.pravatar.cc/48"); // Reset the image input field
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmitFormLower}>
      <label style={{ whiteSpace: "nowrap" }}>🙉 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🤡 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Buttona>Add</Buttona>
    </form>
  );
}

// COMPONENT - RIGHT
function FormRightSplitBill({ selectedFriend1 }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setpaidByUser] = useState("");
  const [whoIsPaying, setwhoIsPaying] = useState("user");
  const paidByFriend = bill ? bill - paidByUser : ""; // Calculate the amount paid by the friend

  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend1.name} </h2>
      <label>💰 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>😎 Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setpaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value) // Ensure the value doesn't exceed the bill amount
          )
        }
      />

      <label>👺 {selectedFriend1.name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />

      <label>🤑 Who is paying the bill? </label>
      <select
        value={whoIsPaying}
        onChange={(e) => setwhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend1.name}</option>
      </select>

      <Buttona>Add</Buttona>
    </form>
  );
}
