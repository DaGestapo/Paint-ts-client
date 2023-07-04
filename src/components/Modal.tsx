import {FC, useState, createRef, FormEvent} from 'react';
import canvasState from '../store/canvasState';
import '../styles/modal.scss';

interface ModalI {
    connectionHandler: Function;
}

const Modal: FC<ModalI> = ({connectionHandler}) => {
    const [name, setName] = useState<string>('');
    const formRef = createRef<HTMLFormElement>(); 

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        if(formRef.current === null) return;

        formRef.current.style.display = 'none';
        canvasState.setUsername(name);
        
        e.preventDefault();
    }
    return (
        <form 
            className='modal' 
            onSubmit={submitHandler}
            ref={formRef}
            >
            <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={() => connectionHandler(name)}>Connect</button>
        </form>
    
    )
}

export default Modal;