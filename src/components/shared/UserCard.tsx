import { Models } from "appwrite";
import { Link } from "react-router-dom";
type UserCardProps = {
  user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {

  return (
    <Link to={`/profile/${user.$id}`}>
      {/* <img
        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
        alt="creator"
        className="rounded-full w-14 h-14"
      /> */}
      <h3 className="text-lg font-bold mb-2"> {user.name}</h3>
      <p>Expenses: $256</p>
    </Link>
  );
};

export default UserCard;
