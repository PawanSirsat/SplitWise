type UserCardProps = {
  Desc: string;
};

const ActivityImage = ({ Desc }: UserCardProps) => {
  const imageKeywordPairs = [
    { name: "coffee", keywords: ["coffee", "chai", "milk"] },
    { name: "chicken", keywords: ["chicken", "meat", "beef"] },
    { name: "burger", keywords: ["burger", "bread", "breakfast"] },
    { name: "pizza", keywords: ["pizza", "dominos"] },
    {
      name: "food",
      keywords: [
        "food",
        "reastaurant",
        "reastro",
        "panipuri",
        "dinner",
        "lunch",
      ],
    },
    { name: "cart", keywords: ["order", "amazon", "flipkart"] },
    { name: "grocery", keywords: ["grocery", "dmart", "mart"] },
    { name: "list", keywords: ["list"] },
    {
      name: "fruits",
      keywords: ["fruit", "fruits", "mangoes", "mango", "apple", "banana"],
    },
    { name: "shop", keywords: ["shop"] },
    { name: "icecream", keywords: ["ice", "icecream"] },
    { name: "vegetable", keywords: ["vegitable", "veg", "vegetable"] },
  ];

  const findMatchingImage = (desc: string) => {
    const lowercaseDesc = desc.toLowerCase();
    const matchingImage = imageKeywordPairs.find((pair) =>
      pair.keywords.some((keyword) => lowercaseDesc.includes(keyword))
    );

    if (matchingImage) {
      return matchingImage.name;
    } else {
      return "cart";
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
