import { Models } from "appwrite";
import { Link } from "react-router-dom";

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {

  const totalAmount = post.activity.reduce((sum: number, activityItem: { Amout: string; }) => {
    return sum + parseFloat(activityItem.Amout);
  }, 0);

  return (
    <>
       <Link to={`/profile/${post?.$id}`}>                
      <h2 className="text-lg font-bold mb-2">{post.groupName}</h2>
      {post.Members && post.Members.length > 2 && (
        <p>
          Members: {post.Members.slice(0, 2).map((user: { name: any }) => user.name).join(', ')}...
        </p>
      )}
      {!(post.Members && post.Members.length > 2) && (
        <p>Members: {post.Members?.map((user: { name: any }) => user.name).join(', ')}</p>
      )}
      <p>Expenses: ${totalAmount.toFixed(2)}</p>
      </Link>
    </>
  );
};

export default PostCard;
