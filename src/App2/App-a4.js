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

export default function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        <FormLowerAddFriend />
        <Buttona>Add Friend</Buttona>
      </div>
      <FormRightSplitBill />
    </div>
  );
}

function FriendsList() {
  const friends = initialFriends;

  return (
    <ul>
      {friends.map((friend1) => (
        <Friend frienda={friend1} key={friend1.id} />
      ))}
    </ul>
  );
}

function Friend({ frienda }) {
  return (
    <li>
      {/* {frienda.name} */}
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

function Buttona({ children }) {
  return <button className="button">{children}</button>;
}

function FormLowerAddFriend() {
  return (
    <form className="form-add-friend">
      <label style={{ whiteSpace: "nowrap" }}>🙉 Friend name</label>
      <input type="text" />

      <label>🤡 Image URL</label>
      <input type="text" />

      <Buttona>Add</Buttona>
    </form>
  );
}

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
