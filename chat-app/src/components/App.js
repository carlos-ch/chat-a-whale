// import './App.css';
import { ContactsProvider } from '../context/ContactsProvider';
import { ConversationsProvider } from '../context/ConversationsProvider';
import useLocalStorage from '../hooks/useLocalStorage';
import Dashboard from './Dashboard';
import { Login } from './Login';

function App() {
  const [id, setId] = useLocalStorage('id');
  return (
    <>
      {id ? (
        <ContactsProvider>
          <ConversationsProvider id={id}>
            <Dashboard id={id} />
          </ConversationsProvider>
        </ContactsProvider>
      ) : (
        <Login onIdSubmit={setId} />
      )}
    </>
  );
}

export default App;
