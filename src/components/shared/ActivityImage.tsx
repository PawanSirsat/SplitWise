import { imageKeywordPairs, imageKeywordPairsGroup } from "@/types";

interface ImageKeywordPair {
  name: string;
  keywords: string[];
}

type UserCardProps = {
  Desc: string;
  Type: string;
};

const ActivityImage = ({ Desc, Type }: UserCardProps) => {
  let imageKeywordPair: ImageKeywordPair[];
  if (Type === "group") {
    imageKeywordPair = imageKeywordPairsGroup;
  } else {
    imageKeywordPair = imageKeywordPairs;
  }
  const findMatchingImage = (desc: string) => {
    const lowercaseDesc = desc.toLowerCase();
    const matchingImage = imageKeywordPair.find((pair) =>
      pair.keywords.some((keyword: string) => lowercaseDesc.includes(keyword))
    );

    if (matchingImage) {
      return matchingImage.name;
    } else {
      return Type;
    }
  };

  const imageName = findMatchingImage(Desc); // Use the Desc from props
  const imagePath = `/assets/${Type}/${imageName}.png`;

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
