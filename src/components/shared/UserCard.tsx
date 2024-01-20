import { Models } from "appwrite";
import { Link } from "react-router-dom";
import Profilephoto from "./Profilephoto";
type UserCardProps = {
  user: Models.Document;
  userCanPay: number;
  friendCanPay: number;
};

const UserCard = ({ user, userCanPay, friendCanPay }: UserCardProps) => {
  return (
    <Link to={`/profile/${user.$id}`}>
      <div
        style={{ display: "flex", alignItems: "center" }}
        className="pb-3 text-white">
        <Profilephoto name={user} />
        <p className="text-lg font-bold mb-1 pl-3 text-blue-500">
          {user.name}{" "}
        </p>
      </div>
      {/* <h3 className="text-lg font-bold mb-2"> {user.name}</h3> */}
      <p>
        You owe :{" "}
        <span className="text-lg font-bold text-green-500">
          &#8377;&nbsp;{userCanPay}
        </span>
      </p>
      <p>
        "{user.name}" owe :{" "}
        <span className="text-lg font-bold text-red">
          &#8377;&nbsp;{friendCanPay}
        </span>
      </p>
    </Link>
  );
};

export default UserCard;
