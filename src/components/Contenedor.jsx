import { useState } from 'react';
import Constantes from "../constantes";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
    CssBaseline,
    Hidden
} from '@mui/material';

//carga componentes
import Cajon from './Cajon';
import Carta from './Carta';
import Vins from './Vins';
import Login from './Login';
import Navbar from './Navbar';

//estilos
import Clases from "../clases";

//constantes
const subProduccio = Constantes.SUBDIRECTORI_PRODUCCIO;

const Contenedor = () => {
    const classes = Clases();
    const [abrir, setAbrir] = useState(false);
    const accionAbrir = () => {
        setAbrir(!abrir)
    };
    let baseName;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        baseName = '';
    } else {
        baseName = subProduccio;
    };

    return (
        <div className={classes.rootCont}>
            <CssBaseline />
            <Router basename={baseName} >
                <Navbar accionAbrir={accionAbrir} />
                <Hidden xsDown>
                    <Cajon
                        variant="permanent"
                        open={true}
                    />
                </Hidden>
                <Hidden smUp>
                    <Cajon
                        variant="temporary"
                        open={abrir}
                        onClose={accionAbrir}
                    />
                </Hidden>
                <div className={classes.content}>
                    <div className={classes.toolbar}></div>
                    <Routes>
                        <Route path="/" exact element={<Carta />} />
                        <Route path="/vins" element={<Vins />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
            </Router>
        </div>
    )
}

export default Contenedor
