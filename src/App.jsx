import React, { useState } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import TabContent from './components/Tab/TabContent';
import TabNavItem from './components/Tab/TabNavItem';
import DecryptForm from './features/Decrypt/DecryptForm';
import EncryptForm from './features/Encrypt/EncryptForm';

function App() {
  const [activeTab, setActiveTab] = useState('encrypt');

  return (
    <div className="App">
      <div>
        <Header />
        <h1 style={{ fontFamily: "'Alkalami', serif" }}>SHARK ENCRYPT</h1>
        <main>
          <ul className="tabs">
            <TabNavItem
              title="Encrypt"
              id="encrypt"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              icon="fa-solid fa-lock"
            />
            <TabNavItem
              title="Decrypt"
              id="decrypt"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              icon="fa-solid fa-lock-open"
            />
          </ul>
          <TabContent id="encrypt" activeTab={activeTab}>
            <EncryptForm />
          </TabContent>
          <TabContent id="decrypt" activeTab={activeTab}>
            <DecryptForm />
          </TabContent>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
