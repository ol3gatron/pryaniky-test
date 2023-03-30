import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useAppDispatch } from '../redux/redux';
import { useNavigate } from 'react-router-dom';
import { changeStatus } from '../features/docsSlice';


function ResponsiveAppBar() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleExit = () => {
    localStorage.clear()
    dispatch(changeStatus("loading"))
    navigate("/")
  }

  const login = localStorage.getItem("login")?.slice(5, 7)

  return (
    <AppBar elevation={0} sx={{ position: "sticky", marginBottom: "20px", backgroundColor: "#f9f9f9", color: "black"}}>
          <Toolbar>
            <Typography sx={{flex: 1}}>
              Добро пожаловать, {localStorage.getItem("login")?.slice(1, 7)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleExit}
            >
            Выйти
            </Button>
            <Avatar sx={{ marginLeft: "16px" }}>{login}</Avatar>
          </Toolbar>
        </AppBar>
  );
}
export default ResponsiveAppBar;