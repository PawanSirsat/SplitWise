import { Models } from 'appwrite';

type UserCardProps = {
  name: Models.Document;
};

const Profilephoto = ({ name }: UserCardProps) => {
  const getBackgroundColor = (letter: string): string => {
    // You can define your own logic to determine background color based on the initial letter
    // Here, a simple example is used for demonstration purposes
    const colors = ['#7cfc00', '#00bfff', '#ff6347', '#ffd700', '#9370db']; // Array of colors
    const charCode = letter.charCodeAt(0) % colors.length;
    return colors[charCode];
  };

  const renderInitial = (name: string): string => {
    const firstLetter = name.charAt(0).toUpperCase();
    return firstLetter;
  };

  const userName = name.name || ''; // Assuming userName is a property in your Models.Document
  const backgroundColor = getBackgroundColor(userName.charAt(0));

  return (
    <div
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: backgroundColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontWeight: 'bold',
      }}
    >
      {renderInitial(userName)}
    </div>
  );
};

export default Profilephoto;
