// src/App.tsx
import React from 'react';
import Chat from './components/Chat';
import PDFPreviewer from './components/PdfPreviewer';

const App: React.FC = () => {
  const fileUrl = 'Contract of Sale - Good 1.pdf';
  return (
    <div className="App">
      <header className="App-header">
         {/* align center */}
        <h1 style={{ textAlign: 'center' }}>Contract GPT</h1>
      </header>
      <main>
        <Chat />
        <div>
            <h1>PDF Previewer</h1>
            <PDFPreviewer fileUrl={fileUrl} />
        </div>
      </main>
    </div>
  );
};

export default App;
