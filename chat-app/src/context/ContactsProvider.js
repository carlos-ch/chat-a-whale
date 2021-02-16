import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const ContactsContext = React.createContext();

export const useContacts = () => {
  return React.useContext(ContactsContext);
};
export const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);

  const createContact = (id, name) => {
    setContacts(previousState => {
      return [...previousState, { id, name }];
    });
  };
  return (
    <div>
      <ContactsContext.Provider value={{ contacts, createContact }}>
        {children}
      </ContactsContext.Provider>
    </div>
  );
};

// export default ContactsProvider;
