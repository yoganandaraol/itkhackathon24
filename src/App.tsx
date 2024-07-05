import React, { useState } from 'react';
import Chat from './components/Chat';
import PDFPreviewer from './components/PdfPreviewer';
import { Box } from '@mui/material';
import DragAndDropInput from './components/DragandDropInput';

const App: React.FC = () => {
  const [isWaiting, setIsWaiting] = useState<boolean>(true);
  const [fileName, setFileName] = useState<string | null>(null);
  const initChatBot = async (file: File) => {
    if (!file) {
      return;
    }
    setFileName(file.name);
    setIsWaiting(true);
    const formData = new FormData();
    formData.append('file', file!);

    // axios.post('http://localhost:8080/initAssistant', formData).then(response => {
    //     console.log(response);
    //     setAssistant((response.data! as any).assistant!);
    //     setThread((response.data! as any).thread);
    //     setIsWaiting(false);
    // })
  };
  return (
  <>
<div className="App">
            <header className="App-header">
                <h1 style={{ textAlign: 'center' }}>COSA</h1>
            </header>
            <main className="main-container">
                <div className="drag-drop">
                  <DragAndDropInput submit={initChatBot}/>
                </div>
                <div className="content-container">
                <Box sx={{ display: 'flex', flexDirection:'row', width: '100%' }}>
                  <Box sx={{width:'50%'}}>
                      <PDFPreviewer fileUrl={fileName} />
                    </Box>
                    <Box sx={{width:'50%'}}>
                      <Chat isWaiting={isWaiting} setIsWaiting={setIsWaiting}/>
                    </Box>
                    </Box>
                </div>
            </main>
        </div>
      </>
  );
};

export default App;