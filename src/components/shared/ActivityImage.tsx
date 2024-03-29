import { imageKeywordPairs } from "@/types";

type UserCardProps = {
  Desc: string;
};

const ActivityImage = ({ Desc }: UserCardProps) => {
  const findMatchingImage = (desc: string) => {
    const lowercaseDesc = desc.toLowerCase();
    const matchingImage = imageKeywordPairs.find((pair) =>
      pair.keywords.some((keyword) => lowercaseDesc.includes(keyword))
    );

    if (matchingImage) {
      return matchingImage.name;
    } else {
      return "list";
    }
  };

  const imageName = findMatchingImage(Desc); // Use the Desc from props
  const imagePath = `/assets/activity/${imageName}.png`;

  return (
    <div
      style={{
        width: "45px",
        height: "45px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#3498db",
        color: "#fff",
        fontWeight: "bold",
      }}>
      <img
        src={imagePath}
        alt="Logo"
        style={{ width: "80%", height: "80%", borderRadius: "50%" }}
      />
    </div>
  );
};

export default ActivityImage;
