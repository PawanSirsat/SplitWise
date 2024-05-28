import { Models } from "appwrite";
import { Link } from "react-router-dom";
import ActivityImage from "./ActivityImage";

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  const totalAmount = post.activity.reduce(
    (sum: number, activityItem: { Amout: string }) => {
      return sum + parseFloat(activityItem.Amout);
    },
    0
  );

  return (
    <>
      <Link to={`/groups/${post?.$id}`}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <ActivityImage Desc={post.groupName} Type={"group"} />
          <p className="text-lg font-bold mb-2 mt-2 text-emerald-500">
            &ensp;{post.groupName}
          </p>
        </div>

        {/* {post.Members && post.Members.length > 2 && (
          <p className="font-bold text-gray-400">
            Members :&nbsp;&nbsp;
            <span className="font-mono text-blue-400">
           {post.Members.slice(0, 2).map((user: { name: any }) =>
             user.name).join(', ')}...
           </span>
          </p>
        )} */}
        <p className="font-bold text-gray-400 capitalize mt-2">
          Creator :&nbsp;&nbsp;
          <span className="font-mono text-blue-400">{post.Creator?.name}</span>
        </p>

        <p className="font-bold text-gray-400">
          Expenses :{" "}
          <span className="font-bold text-green-400">
            &#8377;{totalAmount.toFixed(2)}
          </span>
        </p>
      </Link>
    </>
  );
};

export default PostCard;
