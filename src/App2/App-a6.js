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

  function handleShowFormAddFriend() {
    setshowFormAddFriend((showform) => !showform);
  }

  function handleAddFriend(friendcc) {
    setfriendsArr((friends22) => [...friends22, friendcc]);
    setshowFormAddFriend(false); // Close the form after adding a friend
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friendsb={friendsArr} />
        {showFormAddFriend && (
          <FormLowerAddFriend onAddFriend={handleAddFriend} />
        )}
        <Buttona onClick1={handleShowFormAddFriend}>
          {showFormAddFriend ? "Close" : "Add Friend"}
        </Buttona>
      </div>
      <FormRightSplitBill />
    </div>
  );
}

// COMPONENT - UPPER LEFT
function FriendsList({ friendsb }) {
  // const friends = initialFriends;

  return (
    <ul>
      {friendsb.map((friend1) => (
        <Friend frienda={friend1} key={friend1.id} />
      ))}
    </ul>
  );
}

// COMPONENT  - UPPER LEFT - friend array text
function Friend({ frienda }) {
  return (
    <li>
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

      <Buttona>Select</Buttona>
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
function FormRightSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with...</h2>
      <label>💰 Bill value</label>
      <input type="text" />

      <label>😎 Your expense</label>
      <input type="text" />

      <label>👺 X's expense</label>
      <input type="text" disabled />

      <label>🤑 Who is paying the bill? </label>
      <select>
        <option value="user">You</option>
        <option value="friend">XXX</option>
      </select>

      <Buttona>Add</Buttona>
    </form>
  );
}
