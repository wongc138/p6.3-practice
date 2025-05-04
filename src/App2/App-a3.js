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
      </div>
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

      <button className="button">Select</button>
    </li>
  );
}
