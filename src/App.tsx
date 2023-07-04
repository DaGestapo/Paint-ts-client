import {useParams} from 'react-router-dom';

import canvasState from './store/canvasState';

import Toolbar from './components/Toolbar';
import Settingbar from './components/Settingbar';
import Canvas from './components/Canvas';
import Modal from './components/Modal';


import './styles/app.scss';

const socket = new WebSocket('ws://82.202.198.51:4000');

function App() {

  const {id} = useParams();
  if(id) {
    const connectionHandler = (socket: WebSocket, id: string): Function => {
    
        return (username: string) => {
            canvasState.setWebSocket(socket);
            canvasState.setId(id);
        
            canvasState.socket?.send(JSON.stringify({
              id: id,
              method: 'connection',
              username: username
          }));
        }
      }


    return (
      <div className="App">
        <Modal connectionHandler={connectionHandler(socket, id)}/>
        <Toolbar id={id}/>
        <Settingbar />
        <Canvas />
      </div>
    ) 
  } else return (
    <></>
  )
    

}

export default App;
