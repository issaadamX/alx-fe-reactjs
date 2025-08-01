import UserContext from './UserContext';
import UserProfile from './components/UserProfile';

function App() {
  const userData = { name: "Jane Doe", age: 30, bio: "Software developer" };

  return (
    <UserContext.Provider value={userData}>
      <UserProfile />
    </UserContext.Provider>
  );
}

export default App;
