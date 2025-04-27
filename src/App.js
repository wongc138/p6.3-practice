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

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setshowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setshowAddFriend((showAddFriend) => !showAddFriend);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setshowAddFriend(false);
  }

  // 007 button select friend
  function handleSelection(friend) {
    // setSelectedFriend(friend);
    // 007 add toggle select or close (add ? optional chain because of null) == cur?.id === friend.id ? null : friend
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    // 007 add close form if add friend form is open
    setshowAddFriend(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        {/* 007 add onSelection prop to FriendList */}
        {/* 007 add selectedFriend */}
        <FriendList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {/* 007 selectedFriend => pass on details to split bill form */}
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
    </div>
  );
}

//  007 add onSelection prop => passing prop to Friend (prop drilling)
// 007 add selectedFriend prop => passing prop to FriendList
function FriendList({ friends, onSelection, selectedFriend }) {
  // const friends = initialFriends;

  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          selectedFriend={selectedFriend}
          onSelection={onSelection}
        />
      ))}
    </ul>
  );
}

// 007 add onSelection prop => passing prop to Button
// 007 add selectedFriend prop
function Friend({ friend, onSelection, selectedFriend }) {
  // 007 add isSelected as boolean; ? means (optional chain) stop if selectedFriend is null
  const isSelected = selectedFriend?.id === friend.id;

  return (
    // 007 add className selected
    <li className={isSelected ? "selected" : ""}>
      {/* {friend.name} */}
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}£
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}£
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      {/* 007 add onCLick => open up split a bill form*/}
      {/* 007 button either => "Close" : "Select" */}
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id: crypto.randomUUID(),
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label style={{ whiteSpace: "nowrap" }}>🤼 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label> 🖼 Image URL </label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

// 007 add selectedFriend prop
function FormSplitBill({ selectedFriend }) {
  return (
    <form className="form-split-bill">
      {/* 007 selectedFriend.name */}
      <h2>Split a bill with {selectedFriend.name} </h2>

      <label>💰 Bill Value </label>
      <input type="text" />

      <label>🐵 Your Expanses </label>
      <input type="text" />

      {/* 007 selectedFriend.name */}
      <label>🤼 {selectedFriend.name} Expenses</label>
      <input type="text" disabled />
      <label>🤑 Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        {/* 007 selectedFriend.name */}
        <option value="friend">{selectedFriend.name} </option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
