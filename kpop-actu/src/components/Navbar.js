import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Bouton Menu fixé en haut à gauche */}
            <IconButton 
                onClick={() => setOpen(!open)} 
                style={{ position: 'fixed', top: 10, left: 10, zIndex: 1300 }}
            >
                <MenuIcon />
            </IconButton>

            {/* Drawer (Menu latéral) avec marge en haut */}
            <Drawer 
                anchor="left" 
                open={open} 
                onClose={() => setOpen(false)}
                PaperProps={{
                    style: { paddingTop: '50px' } // Ajout d'un espace pour éviter le chevauchement
                }}
            >
                <List>
                    <ListItem button component={Link} to="/" onClick={() => setOpen(false)}>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button component={Link} to="/news" onClick={() => setOpen(false)}>
                        <ListItemText primary="News" />
                    </ListItem>
                    <ListItem button component={Link} to="/events" onClick={() => setOpen(false)}>
                        <ListItemText primary="Events" />
                    </ListItem>
                    <ListItem button component={Link} to="/artists" onClick={() => setOpen(false)}>
                        <ListItemText primary="Artists" />
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
}

export default Navbar;
