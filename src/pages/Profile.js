import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../config/firebase";
import { capitalizeString } from "../helpers/stringUtils";
import { AiOutlineEdit } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import Button from "../components/Button";
import { doc, updateDoc } from "firebase/firestore";

const Profile = () => {
  const { user, userProfile } = UserAuth();
  const [profilePictureImg, setProfilePictureImg] = useState("");
  const { name, age, dateOfBirth, gender, phoneNumber, profilePicture } =
    userProfile;

  useEffect(() => {
    getDownloadURL(ref(storage, profilePicture))
      .then((img) => {
        setProfilePictureImg(img);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [profilePicture]);

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto gap-4">
      <img
        src={profilePictureImg}
        alt="Profile"
        className="rounded-full max-h-[15rem] max-w-[15rem] w-full border-2 object-cover"
      />
      <DisplayComponent label="User ID" value={user.uid} />
      <UpdateComponent
        label="Name"
        firebaseUserProperty="name"
        uid={user.uid}
        initialValue={capitalizeString(name)}
        placeholder="Your name here..."
        key={"name"}
      />
      <UpdateComponent
        label="Age"
        firebaseUserProperty="age"
        uid={user.uid}
        initialValue={age}
        type="number"
        placeholder="Your age here..."
        key={"age"}
      />
      <UpdateComponent
        label="Date"
        firebaseUserProperty="dateOfBirth"
        uid={user.uid}
        initialValue={dateOfBirth}
        type="date"
        placeholder="Your date of birth here..."
        key={"date-of-birth"}
      />
      <UpdateComponent
        label="Gender"
        firebaseUserProperty="gender"
        uid={user.uid}
        initialValue={gender}
        type="option"
        key={"gender"}
      />
      <UpdateComponent
        label="Phone Number"
        firebaseUserProperty="phoneNumber"
        uid={user.uid}
        initialValue={phoneNumber}
        type="tel"
        placeholder="Your phone number here..."
        key={"phone-number"}
      />
      <UpdateComponent
        label="Profile Picture"
        firebaseUserProperty="profilePicture"
        uid={user.uid}
        initialValue={""}
        type="file"
        userProfile={userProfile}
        key={"profile-picture"}
      />
    </div>
  );
};

const DisplayComponent = ({ label, value }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <span className="font-bold text-lg underline underline-offset-2 decoration-emerald-400 decoration-2">
        {label}
      </span>
      <span className="text-lg">{value}</span>
    </div>
  );
};

const UpdateComponent = ({
  label,
  type = "text",
  initialValue,
  firebaseUserProperty,
  uid,
  placeholder = "",
  userProfile = null,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [selectedFile, setSelectedFile] = useState(null);
  let inputComponent;

  const updatePropertyHandler = async () => {
    try {
      await updateDoc(doc(db, "user-profiles", uid), {
        [firebaseUserProperty]: value,
      });
      setIsEditing(false);
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  };

  const updatePictureHandler = async () => {
    try {
      if (!selectedFile) throw new Error("Please upload an image file");
      const fileLocation = `profilePictures/${new Date().getTime()}_${
        selectedFile.name
      }`;
      const filesFolderRef = ref(storage, fileLocation);

      await uploadBytes(filesFolderRef, selectedFile);
      await deleteObject(ref(storage, userProfile.profilePicture));
      await updateDoc(doc(db, "user-profiles", uid), {
        profilePicture: fileLocation,
      });
      setIsEditing(false);
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  };

  const handlePhoneNumberChange = (e) => {
    const cleanedPhoneNumber = e.target.value.replace(/\D/g, "");
    setValue(cleanedPhoneNumber);
  };

  switch (type) {
    case "tel":
      inputComponent = (
        <input
          type="tel"
          value={value}
          onChange={handlePhoneNumberChange}
          className="border-2 rounded py-2 px-2"
          placeholder={placeholder}
          maxLength="10"
          pattern="[0-9]*"
        />
      );
      break;
    case "option":
      inputComponent = (
        <select
          className="border-2 rounded py-2 px-2"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      );
      break;
    case "file":
      inputComponent = (
        <input
          id="profile-picture"
          type="file"
          accept="image/*"
          className="border-2 rounded py-2 px-2"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
      );
      break;
    default:
      inputComponent = (
        <input
          type={type}
          className="w-full border-2 rounded py-2 px-2"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      );
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <span className="font-bold text-lg underline underline-offset-2 decoration-emerald-400 decoration-2">
        {label}
      </span>
      {isEditing ? (
        <>
          {inputComponent}
          <div className="flex gap-2">
            <Button
              className={"max-w-[8rem]"}
              onClick={() =>
                type === "file"
                  ? updatePictureHandler()
                  : updatePropertyHandler()
              }
            >
              Update
            </Button>
            <Button
              className={"text-lg"}
              color={"red"}
              onClick={() => {
                setIsEditing(false);
                setValue(initialValue);
              }}
            >
              <IoCloseSharp />
            </Button>
          </div>
        </>
      ) : (
        <div className="flex justify-between">
          <span className="text-lg">{value}</span>
          <button
            className="rounded hover:bg-emerald-400"
            type="button"
            onClick={() => setIsEditing(true)}
          >
            <AiOutlineEdit className="text-2xl" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
