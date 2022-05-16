import React from 'react'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WorkOffIcon from '@mui/icons-material/WorkOff';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import './menu.scss';

const Menu = () => {
  return (
    <div className='menu'>
        <div className='menu__wrapper'>
            <ul>
                <li>
                    <a className='link' href="#income"><AttachMoneyIcon style={{fontSize: 25, marginRight: '10px'}}/><span>Average Income</span></a>
                </li>
                <li>
                    <a className='link' href="#unemployment"><WorkOffIcon style={{fontSize: 25, marginRight: '10px'}}/><span>Unemployment Rate</span></a>
                </li>
                <li>
                    <a className='link' href="#facility"><ApartmentIcon style={{fontSize: 25, marginRight: '10px'}}/><span>Facility Number</span></a>
                </li>
                <li>
                    <a className='link' href="#about"><ImportContactsIcon style={{fontSize: 25, marginRight: '10px'}}/><span>About</span></a>
                </li>
            </ul> 
        </div>
    </div>
  );
}

export default Menu;
