import { auth } from "../config/firebase";

const Home = () => {
  return (
    <div>
      <h1>Current User: {auth?.currentUser?.uid}</h1>
    </div>
  );
};

export default Home;
