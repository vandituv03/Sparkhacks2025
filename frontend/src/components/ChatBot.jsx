import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatBot = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [image, setImage] = useState(null);

    // Effect to simulate fetching previous messages (replace with API call if needed)
    useEffect(() => {
        const savedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        setMessages(savedMessages);
    }, []);

    // Effect to store messages locally when they change (for persistence)
    useEffect(() => {
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }, [messages]);

    const handleInputChange = (e) => setInput(e.target.value);

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setImage(URL.createObjectURL(e.target.files[0])); // Preview uploaded image
        }
    };

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            localStorage.removeItem('chatMessages'); // Clear chat history on logout
            navigate("/login");
        }
    };

    const sendMessage = () => {
        if (!input.trim() && !image) return; // Prevent empty messages

        const newMessage = { text: input, img: image };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        
        // Reset input fields
        setInput('');
        setImage(null);
    };

    useEffect(() => {
        // Disable scrolling when the component mounts
        document.body.style.overflow = 'hidden';

        // Re-enable scrolling when the component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

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
            position: 'fixed',
            top: 0,
            right: 0,
            

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
            overflowY: 'hidden',
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
            padding: '5px',
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