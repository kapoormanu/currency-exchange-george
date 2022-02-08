import React from 'react';
import { Trans } from 'react-i18next';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import styles from 'components/Header/Header.module.scss';

/**
 * The Header component used to show the website header using the <header> tag.
 *
 * @returns {JSX.Element} a JSX element composing the header
 * @example
 *  <Header />
 */
function Header() {
    return (
        <header className={styles.header}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position='static' className={styles.headerTitle}>
                    <Toolbar>
                        <Typography variant='h6' component='h1' sx={{ flexGrow: 1 }}>
                            <Trans>header.title</Trans>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </header>
    );
}

export default Header;
