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
  // 007.1 App(); [selectedFriend]=useState(null); >> useState to set the initial state of selectedFriend to null (no friend selected)
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

  // 007.3 App();handleSelection(friend); Add function handleSelection(friend) to select a friend to split the bill with >>
  // 007.3 click select button to select a friend object
  function handleSelection(friend) {
    // setSelectedFriend(friend);
    // 007.19 App();handleSelection(); Add toggle select or close (add ? optional chain because of null) == cur?.id === friend.id ? null : friend
    // 007.19 If current selected fiend id is the same as the friend id, set selectedFriend to null, else set selectedFriend to the friend object. When close it will set selectedFriend to null
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    // 007 add close form if add friend form is open
    setshowAddFriend(false);
  }

  // 009.3 App(); Add function handleSplitBill(value)
  // 009.7 App();handleSplitBill(); Add setFriends
  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    // 009.8 App();handleSplitBill(); Add setSelectedFriend >> once click on split bill, close the form
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
        {/* 007.4 App();return;<FriendList/> Add onSelection={handleSelection} */}
        {/* 007.4 add onSelection prop to FriendList */}
        {/* 007.12 App();return;<FriendList/> Add selectedFriend={selectedFriend} */}
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
      {/* 007.2 handleSelection();return; selectedFriend && (
        <FormSplitBill/> >> short-circuit to not display anything*/}
      {/* 007.9 handleSelection();return;<FormSplitBill/> Add selectedFriend={selectedFriend} */}
      {/* 009.4 App();return;<FormSplitBill/> Add onSplitBill={handleSplitBill} */}
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
// 007.5 add onSelection prop => passing prop to Friend (prop drilling)
// 007.13 FriendList({selectedFriend}); Add selectedFriend prop => passing prop to FriendList
function FriendList({ friends, onSelection, selectedFriend }) {
  // 006.15 Get rid of initialFriends; add friends as a prop to parent component App(), as Lifting state up
  // const friends = initialFriends;

  return (
    // 007.6 FriendList();return; Add onSelection prop to FriendList >> to pass it down to Friend component
    // 007.14 FriendList();return; Add electedFriend={selectedFriend} to FriendList >> to pass it down to Friend component
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
// 007.7 Friend({onSelection}) Add onSelection prop => passing prop to Button >> This is where we use this function
// 007.15 Friend({selectedFriend}); add selectedFriend prop
function Friend({ friend, onSelection, selectedFriend }) {
  // 007.16 Friend();const isSelected; Add isSelected as boolean; ? means (optional chain) stop if selectedFriend is null
  const isSelected = selectedFriend?.id === friend.id;

  return (
    // 003.10 Friend();return; add img alt; <h3>{friend.name}</h3>
    // 003.11 Friend();return; add <p>{friend.balance}</p> with conditionals >> You owe, they owe, even >> ternary operator
    // 003.12 Friend();return; add <Button> Select </Button>
    // 007.17 Friend();return;<li/> Add isSelected ? "selected" : "" to add className to the li element
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
      {/* 007.8 Friend();return;<Button/> Add onClick={() => onSelection(friend) => open up split a bill form >> passing down handleSelection function via props*/}
      {/* 007.18 Friend();return;<Button/> button either => "Close" : "Select" */}
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
// 007.10 FormSplitBill(selectedFriend); Add selectedFriend prop
// 009.5 FormSplitBill(); Add FormSplitBill({onSplitBill}) prop
function FormSplitBill({ selectedFriend, onSplitBill }) {
  // 008.1 FormSplitBill(); Add [bill]=useState(""); for bill, paidByuser, whoIsPaying
  // 008.2 FormSplitBill(); Add [paidByuser]=useState("");
  // 008.3 FormSplitBill(); Add [whoIsPaying]=useState("user"); for who is paying the bill
  const [bill, setBill] = useState("");
  const [paidByuser, setPaidByUser] = useState("");
  // 008.5 FormSplitBill(); Add bill ? bill - paidByuser : ""; >> split bill form Expenses calculation >> if there is a bill, calculate the expenses, else return empty string
  const paidByFriend = bill ? bill - paidByuser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  // 009.2 FormSplitBill(); Add handleSubmit function
  // 009.2 Add e.preventDefault() to prevent page refresh
  // 009.2 if (!bill || !paidByuser) return nothing
  // 009.6 FormSplitBill(); Add onSplitBill >> who pays the bill
  // 009.6 FormSplitBill(); Add onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByuser) >> if user pays the bill, add the value to the friend balance, else subtract the value from the user balance/ negative number is own by you as user; positive number means friends owes you money.
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

  // 007.11 FormSplitBill();return;<form/>; Add selectedFriend.name to the name label >> copy paste to all name labels
  // 009.1 FormSplitBill();return;<form/>; Add onSubmit={handleSubmit}
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      {/* 007.11 selectedFriend.name */}
      <h2>Split a bill with {selectedFriend.name} </h2>

      <label>💰 Bill Value </label>
      {/* 008.4 FormSplitBill();return;<input/> add value={} & onChange={} */}
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🐵 Your Expanses </label>
      {/* 008.4 FormSplitBill();return;<input/> add value={} & onChange={} */}
      {/* 008.7 FormSplitBill();return;<input/>;onChange >> bill ? paidByuser : Number(e.target.value) >> Expanses paid cant be more than bill value, if input more than the bill values, it will not allow it  */}
      <input
        type="text"
        value={paidByuser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByuser : Number(e.target.value)
          )
        }
      />

      {/* 007.11 selectedFriend.name */}
      <label>🤼 {selectedFriend.name}'s Expenses</label>
      {/* 008.6 FormSplitBill();return;<input/> add value={paidByFriend} */}
      <input type="text" disabled value={paidByFriend} />

      <label>🤑 Who is paying the bill</label>
      {/* 008.4 FormSplitBill();return;<input/> add value={} & onChange={} */}
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        {/* 007.11 selectedFriend.name */}
        <option value="friend">{selectedFriend.name} </option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
