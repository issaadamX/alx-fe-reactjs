import UserContext from './UserContext';
import ProfilePage from './components/ProfilePage';

function App() {
  const userData = { 
    name: "Jane Doe", 
    email: "jane.doe@example.com",
    age: 30,
    bio: "Software developer"
  };

  return (
    <UserContext.Provider value={userData}>
      <ProfilePage />
    </UserContext.Provider>
  );
}

export default App;
