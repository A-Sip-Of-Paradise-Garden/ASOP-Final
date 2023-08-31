import { useState } from "react";
import Button from "./Button";
import { UserAuth } from "../context/AuthContext";

const CreateProfileForm = () => {
  const { createUserProfile } = UserAuth();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("male");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const newUserProfileData = {
      name,
      age,
      dateOfBirth,
      gender,
      phoneNumber,
    };
    await createUserProfile(newUserProfileData, profilePicture);
  };

  const handlePhoneNumberChange = (e) => {
    const cleanedPhoneNumber = e.target.value.replace(/\D/g, "");
    setPhoneNumber(cleanedPhoneNumber);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto gap-4">
      <h1 className="text-2xl font-bold">Create profile</h1>
      <form
        className="flex flex-col w-full items-center gap-4"
        onSubmit={onSubmitHandler}
      >
        <div className="flex w-full flex-col">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="border-2 rounded py-2 px-2"
            placeholder="Your name here..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex w-full flex-col">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            className="border-2 rounded py-2 px-2"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="flex w-full flex-col">
          <label htmlFor="date-of-birth">Date of Birth</label>
          <input
            type="date"
            id="date-of-birth"
            className="border-2 rounded py-2 px-2"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </div>
        <div className="flex w-full flex-col">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            className="border-2 rounded py-2 px-2"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="flex w-full flex-col">
          <label htmlFor="phone-number">Phone Number</label>
          <input
            type="tel"
            id="phone-number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            className="border-2 rounded py-2 px-2"
            placeholder="123-456-7890"
            maxLength="12"
            pattern="[0-9]*"
            required
          />
        </div>
        <div className="flex w-full flex-col">
          <label htmlFor="profile-picture">Profile Picture</label>
          <input
            id="profile-picture"
            type="file"
            accept="image/*"
            className="border-2 rounded py-2 px-2"
            onChange={(e) => setProfilePicture(e.target.files[0])}
            required
          />
        </div>
        <Button className="w-full py-2" color="emerald" type="submit">
          Create profile
        </Button>
      </form>
    </div>
  );
};

export default CreateProfileForm;
