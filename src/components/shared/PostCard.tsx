import { Models } from "appwrite";

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  // Sum all amounts from the activity array
  const totalAmount = post.activity.reduce((sum: number, activityItem: { Amout: string; }) => {
    // Convert the amount to a number and add it to the sum
    return sum + parseFloat(activityItem.Amout);
  }, 0);

  return (
    <>
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
    </>
  );
};

export default PostCard;
