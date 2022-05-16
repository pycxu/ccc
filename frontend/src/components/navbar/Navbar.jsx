import React from 'react'
import './navbar.scss'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import HomeIcon from '@mui/icons-material/Home';

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='navbar__wrapper'>
            <span className='left'>
                <img className='logo' src="https://d2h9b02ioca40d.cloudfront.net/0.7/assets/logo-105a9.svg"  alt="The University of Melbourne homepage"/>
                <span className='title'><HomeIcon/> COMP90024 Cluster and Cloud Computing - Team 38</span>
            </span>
            <span className='right'><a  href="#home"><ArrowUpwardIcon style={{fontSize: 45}}/></a></span>
            
        </div>
    </div>
  )
}

export default Navbar;
