import React,{useState,useEffect} from 'react';
import { Typography, Button, Container, Box } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
    backgroundColor: '#f4f4f4',
    borderRadius: '12px',
    padding: '48px',
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.02)',
      boxShadow: '0px 15px 25px rgba(0, 0, 0, 0.15)',
    },
  };

  const headingStyle = {
    marginBottom: '24px',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
  };

  const descriptionStyle = {
    marginBottom: '36px',
    color: '#555',
    fontFamily: 'Arial, sans-serif',
  };

  const buttonStyle = {
    borderRadius: '25px',
    padding: '14px 28px',
    fontSize: '1rem',
    fontWeight: 'bold',
    fontFamily: 'Arial, sans-serif',
    textTransform: 'none',
  };

  const footerStyle = {
    marginTop: '48px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const iconStyle = {
    fontSize: '2rem',
    margin: '8px',
    cursor: 'pointer',
    color: '#333',
  };



  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const fetchUser = async () => {
    try {
        const res = await fetch('http://localhost:8081/home', {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        })

        const data = await res.json();
        if(res.status === 200) setUsername(data)
    } catch (error) {
        console.log(error.messages)
    }
}

useEffect(() => {
    fetchUser();
}, []);
  

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick =async () => {
    try {
        const res = await fetch('http://localhost:8081/logout', {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        })

        if(res.status === 200) {
            setUsername(null);
        }
    } catch (error) {
        console.log(error.messages)
    }
  };




  return (
    <Container maxWidth="sm">
      <Box sx={containerStyle}>
        <Typography variant="h3" sx={headingStyle}>
          Hi {username}, Welcome to my Website!
        </Typography>
        <Typography variant="body1" sx={descriptionStyle}>
          Discover our amazing features and services.
        </Typography>
        {!username && <Button variant="contained" color="primary" sx={buttonStyle} onClick={handleLoginClick}>
          Login
        </Button>}
        {username && <Button variant="contained" color="primary" sx={buttonStyle} onClick={handleLogoutClick}>
          Logout
        </Button>}
        <Box sx={footerStyle}>
          <Box sx={{ marginBottom: '16px' }}>
            <Typography variant="body2">Made with ❤️ by Alok Jaiswal</Typography>
          </Box>
          <Box>
            <a href="https://github.com/Alok-jaiswal-075" target="_blank" rel="noopener noreferrer">
              <GitHubIcon sx={iconStyle} />
            </a>
            <a href="https://www.linkedin.com/in/alokjaiswal075" target="_blank" rel="noopener noreferrer">
              <LinkedInIcon sx={iconStyle} />
            </a>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
