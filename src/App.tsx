import React, { useState } from 'react';
import Chat from './components/Chat';
import PDFPreviewer from './components/PdfPreviewer';
import { Box } from '@mui/material';

const App: React.FC = () => {
  const fileUrl = 'Contract of Sale - Good 1.pdf';

  return (
  <>
<div className="App">
            <header className="App-header">
                <h1 style={{ textAlign: 'center' }}>COSA</h1>
            </header>
            <main className="main-container">
                <div className="drag-drop">
                    <p>Div with drag drop file feature</p>
                </div>
                <div className="content-container">
                <Box sx={{ display: 'flex', flexDirection:'row', width: '100%' }}>
                  <Box sx={{width:'50%'}}>
                      <PDFPreviewer fileUrl={fileUrl} />
                    </Box>
                    <Box sx={{width:'50%'}}>
                      <Chat />
                    </Box>
                    </Box>
                </div>
            </main>
        </div>
      </>
  );
};

export default App;
