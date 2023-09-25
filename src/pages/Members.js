import { useEffect, useState } from "react";
import { PiSealWarningFill } from "react-icons/pi";
import { AiFillCheckCircle, AiOutlineEdit } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { db } from "../config/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import Button from "../components/Button";

const MembersPage = () => {
  const [textFilter, setTextFilter] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("");
  const [userProfiles, setUserProfiles] = useState([]);
  const usersCollectionRef = collection(db, "user-profiles");

  useEffect(() => {
    const getUserProfiles = async () => {
      const data = await getDocs(usersCollectionRef);
      setUserProfiles(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUserProfiles();
  }, [usersCollectionRef]);

  const filteredUserProfiles = userProfiles.filter((userProfile) => {
    const { name, id } = userProfile;
    const textFilterMatch =
      name.toLowerCase().includes(textFilter.toLowerCase()) ||
      id === textFilter;

    if (paymentStatusFilter === "paid") {
      // Filter users with a valid memberUntil date in the future
      return (
        textFilterMatch &&
        userProfile.memberUntil &&
        new Date() < new Date(userProfile.memberUntil)
      );
    } else if (paymentStatusFilter === "unpaid") {
      // Filter users with no memberUntil date or in the past
      return (
        textFilterMatch &&
        (!userProfile.memberUntil ||
          new Date() >= new Date(userProfile.memberUntil))
      );
    } else {
      // No paymentStatusFilter or "all" filter
      return textFilterMatch;
    }
  });

  return (
    <div className="flex flex-col items-center container mx-auto max-w-[40rem] gap-2">
      <input
        type="text"
        onChange={(e) => setTextFilter(e.target.value)}
        className="border border-black w-full p-3 rounded-lg"
        placeholder="🔍 Search user name or user ID..."
      />
      <div className="flex w-full gap-1 items-center">
        <span className="flex items-center">
          Filter by membership payment status
        </span>
        <button
          className={`hover:text-emerald-400 text-lg ${
            paymentStatusFilter === "paid" ? "text-emerald-400" : ""
          }`}
          onClick={() => setPaymentStatusFilter("paid")}
        >
          <AiFillCheckCircle />
        </button>
        <span>/</span>
        <button
          className={`hover:text-red-500 text-lg ${
            paymentStatusFilter === "unpaid" ? "text-red-500" : ""
          }`}
          onClick={() => setPaymentStatusFilter("unpaid")}
        >
          <PiSealWarningFill />
        </button>
        <span>/</span>
        <button
          className={`hover:text-gray-500 text-lg ${
            paymentStatusFilter === "all" ? "text-gray-500" : ""
          }`}
          onClick={() => setPaymentStatusFilter("all")}
        >
          All
        </button>
      </div>
      <div className="flex flex-col w-full gap-2">
        {filteredUserProfiles.map((userProfile) => (
          <UserCard userProfile={userProfile} />
        ))}
      </div>
    </div>
  );
};

const UserCard = ({ userProfile }) => {
  const { id, name, age, dateOfBirth, phoneNumber, memberUntil, isAdmin } =
    userProfile;

  const [toggle, setToggle] = useState(false);
  const membershipCategory = isAdmin
    ? { title: "Board", color: "bg-violet-600" }
    : memberUntil
    ? { title: "Member", color: "bg-sky-300" }
    : { title: "Non-Member", color: "bg-orange-300" };

  const paymentStatusComponent = (
    <>
      {memberUntil && new Date(memberUntil) > new Date() ? (
        <div className="text-emerald-400 text-2xl">
          <AiFillCheckCircle />
        </div>
      ) : (
        <div className="text-red-500 text-2xl">
          <PiSealWarningFill />
        </div>
      )}
    </>
  );

  return (
    <div
      onClick={() => setToggle(true)}
      className={`flex flex-col shadow p-4 rounded-lg ${
        !toggle && "hover:bg-gray-50 hover:cursor-pointer"
      }`}
    >
      <div className="flex justify-between items-center">
        <span className="font-bold">{name}</span>
        <div className="flex items-center gap-2">
          <span className={`${membershipCategory.color} py-1 px-2 rounded-xl`}>
            {membershipCategory.title}
          </span>
          {paymentStatusComponent}
        </div>
      </div>
      {toggle && (
        <>
          <div className="grid grid-cols-2">
            <UserInfo label="Age" value={age} />
            <UserInfo label="Date of Birth" value={dateOfBirth} />
            <UserInfo label="Phone Number" value={phoneNumber} />
            <EditableUserInfo
              label="Member Until"
              value={memberUntil}
              userId={id}
            />
            <UserInfo label="User ID" value={id} />
          </div>
          <Button
            className="ml-auto w-fit"
            color="red"
            onClick={(e) => {
              e.stopPropagation();
              setToggle(false);
            }}
          >
            Close
          </Button>
        </>
      )}
    </div>
  );
};

const UserInfo = ({ label, value }) => {
  return (
    <div className="flex flex-col">
      <span className=" font-bold">{label}</span>
      <span>{value}</span>
    </div>
  );
};

const EditableUserInfo = ({ label, value, userId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const updateEditValue = async () => {
    try {
      await updateDoc(doc(db, "user-profiles", userId), {
        memberUntil: editValue,
      });
      setIsEditing(false);
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex flex-col">
      <span className=" font-bold">{label}</span>
      <div className="flex justify-between w-full">
        {isEditing ? (
          <div className="flex flex-col w-full gap-2">
            <input
              type="date"
              className="w-full border-2 rounded py-2 px-2"
              value={value}
              onChange={(e) => setEditValue(e.target.value)}
            />
            <div className="flex gap-2">
              <Button
                className={"max-w-[8rem]"}
                onClick={() => updateEditValue()}
              >
                Update
              </Button>
              <Button
                className={"text-lg"}
                color={"red"}
                onClick={() => {
                  setIsEditing(false);
                  setEditValue(value);
                }}
              >
                <IoCloseSharp />
              </Button>
            </div>
          </div>
        ) : (
          <>
            <span>{value}</span>
            <button
              className="rounded hover:bg-emerald-400"
              type="button"
              onClick={() => setIsEditing(true)}
            >
              <AiOutlineEdit className="text-2xl" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MembersPage;
