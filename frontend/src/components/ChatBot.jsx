import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'


const ChatBot = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [image, setImage] = useState(null);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
          navigate("/login");
        }
      };

    const sendMessage = () => {
        const newMessage = { text: input, img: image };
        setMessages([...messages, newMessage]);
        setInput('');
        setImage(null);
        // Placeholder for sending message to your server
        // sendToServer(newMessage);
    };

    const styles = {
        chatbotContainer: {
            display: 'flex',
            flexDirection: 'column',
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            height: '100vh',
            width: '100vw',
            backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            
        },
        header: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 20px',
            backgroundColor: 'white',
            color: 'white',
            fontSize: '1.2rem',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
            position: 'absolute',
            top: 0
        },
        homeIcon: {
            cursor: 'pointer',
            width: '80px', 
            height: '50px'
        },
        logoutButton: {
            backgroundColor: '#ef4444', 
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '8px 16px',
            cursor: 'pointer'
        },
        chatDisplay: {
            width: '75%',
            flex: 1,
            overflowY: 'auto',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            borderRadius: '10px',
            padding: '20px',
            margin: '100px 0 10px 0',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
        },
        inputArea: {
            width: '75%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
        },
        inputText: {
            flex: 1,
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginRight: '10px',
            outline: 'none'
        },
        inputFile: {
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 20px',
            marginRight: '10px'
        },
        button: {
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 20px',
            cursor: 'pointer',
            fontWeight: 'bold'
        },
        message: {
            background: '#f3f3f3', 
            padding: '8px 16px',
            borderRadius: '5px',
            margin: '5px 0',
            alignSelf: 'flex-end'
        }
    };

    return (
        <div style={styles.chatbotContainer}>
            <div style={styles.header}>
            <img src="/public/finalLogo.png" style={styles.homeIcon} alt="Home" onClick={() => window.location.href = '/dashboard'} />
            <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
            </div>
            <div style={styles.chatDisplay}>
                {messages.map((msg, index) => (
                    <div key={index} style={styles.message}>
                        <p>{msg.text}</p>
                        {msg.img && <img src={URL.createObjectURL(msg.img)} alt="attachment" style={{ maxWidth: '100%', borderRadius: '5px' }} />}
                    </div>
                ))}
            </div>
            <div style={styles.inputArea}>
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type your message here..."
                    style={styles.inputText}
                />
                <input
                    type="file"
                    onChange={handleFileChange}
                    style={styles.inputFile}
                    accept="image/*"
                />
                <button onClick={sendMessage} style={styles.button}>Send</button>
            </div>
        </div>
    );
};

export default ChatBot;