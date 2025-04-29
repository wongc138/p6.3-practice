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

// 004.3 Add Button() component
// 004.4 Button();return; add {children} prop;
// 005.4 Button(onClick); add onClick as a prop; because onClick works on html but not in component, so need to pass it as a prop
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

// 003.1 export default function App, return >> npm start
export default function App() {
  // 006.16 App(); [friends]=useState(initialFriends); >> useState to set the initial state of friends to initialFriends (example data)
  const [friends, setFriends] = useState(initialFriends);
  // 005.1 To show/hide FormAddFriend, need to add state in the App component
  // 005.2 App(); [showAddFriend]=useState(false)
  const [showAddFriend, setshowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  // 005.6 App(); function handleShowAddFriend() >> setshowAddFriend-useState >> To show/hide FormAddFriend >> ((show) => !show)
  function handleShowAddFriend() {
    setshowAddFriend((show) => !show);
  }

  // 006.19 App();handleAddFriend(friend); Add function handleAddFriend(friend) to add a new friend to the list. Passing (friend) object to the function.
  function handleAddFriend(friend) {
    // 006.20 App();handleAddFriend(); Add setFriends((friends) => [...friends, friend]); to add the new friend to the list
    //006.21 [...friends, friend] >> spread operator to add the new friend to the list of friends and return a new array
    setFriends((friends) => [...friends, friend]);
    // 006.25 App();handleAddFriend(); setshowAddFriend(false); to close the form after adding a friend
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

  // 009.3 handleSplitBill
  // 009.7 setFriends
  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    // 009.8 setSelectedFriend >> once click on split bill, close the form
    setSelectedFriend(null);
  }

  // 003.4 App();return; Add <FriendList /> component;
  // 003.5 App(); add div className="app"; add div className="sidebar"
  // 004.7 App();return; add <FormAddFriend /> component;
  // 004.8 App();return; add <Button /> component;
  // 004.11 App();return; add <FormSplitBill /> component;
  return (
    <div className="app">
      <div className="sidebar">
        {/* 006.17 App();return;<FriendList/> friends={friends} Giving access to the useSate by passing down friends as a prop to FriendList() component */}
        {/* 007 add onSelection prop to FriendList */}
        {/* 007 add selectedFriend */}
        <FriendList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />
        {/* 005.3 App();return; short circuiting showAddFriend-useState && <FormAddFriend/> */}
        {/* 006.22 App();return; <FormAddFriend> Add onAddFriend={handleAddFriend} */}
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

        {/* 005.5 App();return; Updating the state to show FormAddFriend. <Button onClick={handleShowAddFriend}> To pass on the function {handleShowAddFriend} execute to be happen */}
        {/* 005.7 App();return; Conditional rendering for button to show {showAddFriend ? "Close" : "Add Friend"} */}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {/* 007 selectedFriend => pass on details to split bill form */}
      {/* 009.4 onSplitBill={handleSplitBill} */}
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

// 003.3 add function FriendList; return <ul> list  </ul>
// 003.6 FriendList(); add const friends = initialFriends; delete later
// 003.7 FriendList(); add friends.map((friend) => {friend.name} )
// 003.9 FriendList();return: add <Friend /> component;
// 006.18 FriendList(friends); Receive the friends prop from App() component
// 007 add onSelection prop => passing prop to Friend (prop drilling)
// 007 add selectedFriend prop => passing prop to FriendList
function FriendList({ friends, onSelection, selectedFriend }) {
  // 006.15 Get rid of initialFriends; add friends as a prop to parent component App(), as Lifting state up
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

// 003.8 add function Friend(); move (friend) => {friend.name} between <li> </li>
// 007 add onSelection prop => passing prop to Button
// 007 add selectedFriend prop
function Friend({ friend, onSelection, selectedFriend }) {
  // 007 add isSelected as boolean; ? means (optional chain) stop if selectedFriend is null
  const isSelected = selectedFriend?.id === friend.id;

  return (
    // 003.10 Friend();return; add img alt; <h3>{friend.name}</h3>
    // 003.11 Friend();return; add <p>{friend.balance}</p> with conditionals >> You owe, they owe, even >> ternary operator
    // 003.12 Friend();return; add <Button> Select </Button>
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

      {/* 004.5 Friend();return; Add <Button> Select  */}
      {/* 007 add onCLick => open up split a bill form*/}
      {/* 007 button either => "Close" : "Select" */}
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

// 004.1 Add FormAddFriend() component; return; <form>
// 006.23 FormAddFriend({ onAddFriend }); Add onAddFriend prop to FormAddFriend() component to pass the function from App() component to FormAddFriend() component
function FormAddFriend({ onAddFriend }) {
  // 006.1 To get the value from <input> into FormAddFriend component, use control elements with state, where use one piece of state for each input, any value type will sync with the state
  // 006.2 [name]= useState("") >> default value is empty string
  // 006.3 [image]= useState("default website for image") >> default value is empty string
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  // 006.7 FormAddFriend(); Create function handleSubmit(e) to be called when the form is submitted.

  function handleSubmit(e) {
    // 006.8 FormAddFriend();handleSubmit(e); Add e.preventDefault() to prevent entire page refresh.
    // 006.8 Remember onSubmit always need e.preventDefault()
    e.preventDefault();

    // 006.14 FormAddFriend();handleSubmit(e); To prevent empty form submission when clicking Add button >> Add if (!name || !image) return;
    if (!name || !image) return;

    // 006.12 FormAddFriend();handleSubmit(e); Create a variable id and set it to crypto.randomUUID() to generate a unique id for each friend
    const id = crypto.randomUUID();

    // 006.9 FormAddFriend();handleSubmit(e); Add object const newFriend = { id, name, image, balance: 0 };
    // 006.10 FormAddFriend();handleSubmit(e);newFriend; Add id: crypto.randomUUID()
    // 006.11 FormAddFriend();handleSubmit(e);newFriend; Add image: `${image}?=${id}`; to make sure the image is different every time
    const newFriend = {
      id: crypto.randomUUID(),
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    // 006.24 FormAddFriend(); handleSubmit(e); call onAddFriend function with newFriend >> onAddFriend(newFriend)
    onAddFriend(newFriend);

    // 006.13 FormAddFriend();handleSubmit(e); To reset the form after submit >> setName(""); setImage("https://i.pravatar.cc/48");
    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  // 004.2 FormAddFriend();return; <label> <input> value={name} ; onChange
  // 004.2 FormAddFriend();return; <label> <input> value={image} ; onChange
  return (
    // 006.6 FormAddFriend();return; <form> add onSubmit={handleSubmit}. onSubmit will trigger when the form is submitted by clicking the button or pressing enter. Calling the function {handleSubmit}
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label style={{ whiteSpace: "nowrap" }}>🤼 Friend name</label>
      {/* 006.4 FormAddFriend();return; Link the value to useState {name}. Add <input> value={name} ; onChange. */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label> 🖼 Image URL </label>
      {/* 006.5 FormAddFriend();return; Link the value to useState {image}. Add <input> value={image} ; onChange. */}
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      {/* 004.5 FormAddFriend();return; Add <Button> Add  */}
      <Button>Add</Button>
    </form>
  );
}

// 004.9 FormSplitBill(); return; <form> add className="form-split-bill"
// 004.12 FormSplitBill();return; <h2>Split a bill with XXX </h2>
// 007 add selectedFriend prop
// 009.5 onSplitBill prop
function FormSplitBill({ selectedFriend, onSplitBill }) {
  // 008 add state - bill, expense paid by user, who is paying
  const [bill, setBill] = useState("");
  const [paidByuser, setPaidByUser] = useState("");
  // 008 paidByFriend = split bill form Expenses calc
  const paidByFriend = bill ? bill - paidByuser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  // 009.2 add handleSubmit function
  // e.preventDefault() to prevent page refresh
  // if (!bill || !paidByuser) return nothing
  // 009.6 onSplitBill >> who pays the bill
  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !paidByuser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByuser);
  }

  // 004.12 FormSplitBill();return; add <label>Bill <input> value={bill} ;
  // 004.13 FormSplitBill();return; add <label>Youe expense <input> value={paidByuser} ;
  // 004.14 FormSplitBill();return; add <label>X's expense <input> value={paidByFriend} ;
  // 004.15 FormSplitBill();return; add <label>X's expense  Add <input disabled> ; disabled input so user cant change it
  // 004.16 FormSplitBill();return; add <label>Who is paying <select> value={whoIsPaying} <option value="user"> <option value="friend">

  // 009.1 add onSubmit={handleSubmit}
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      {/* 007 selectedFriend.name */}
      <h2>Split a bill with {selectedFriend.name} </h2>

      <label>💰 Bill Value </label>
      {/* 008 add value & onChange */}
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🐵 Your Expanses </label>
      {/* 008 add value & onChange */}
      {/* 008 bill ? paidByuser : Number(e.target.value) >> Expanses paid cant be more than bill value, if type more than the bill number it will not allow  */}
      <input
        type="text"
        value={paidByuser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByuser : Number(e.target.value)
          )
        }
      />

      {/* 007 selectedFriend.name */}
      <label>🤼 {selectedFriend.name}'s Expenses</label>
      {/* 008 add value={paidByFriend} */}
      <input type="text" disabled value={paidByFriend} />

      <label>🤑 Who is paying the bill</label>
      {/* 008 add value & onChange */}
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        {/* 007 selectedFriend.name */}
        <option value="friend">{selectedFriend.name} </option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
