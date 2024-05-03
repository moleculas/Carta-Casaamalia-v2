import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import {
    List,
    ListItemIcon,
    ListItemText,
    Divider,
    Typography,
    ListItemButton
} from '@mui/material';
import {
    LocalBar,
    Restaurant,
    LockOpen,
    SubdirectoryArrowRight,
    Nightlife
} from '@mui/icons-material';
import clsx from 'clsx';

//importaciones acciones
import { logoutUsuarioAccion } from '../redux/usuarioDucks';
import { resetApp } from '../redux/appDucks';
import useInactivityTimer from '../logica/useInactivityTimer';

//estilos
import Clases from "../clases";

const Menu = (props) => {
    const classes = Clases();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logged = useSelector(store => store.variablesUsuario.activo);
    const usuari = useSelector(store => store.variablesUsuario.usuarioActivo.nombre);

    //funciones

    const tancarSessio = () => {
        dispatch(logoutUsuarioAccion()).then(({ payload }) => {
            if (payload) {              
                dispatch(resetApp());
                localStorage.clear();
                navigate('/login');
            }
        })
    };
    
    const [tiempoAlarma, timer] = useInactivityTimer(tancarSessio, logged, usuari);

    return (
        <div>
            <List component='nav'>
                {logged ? (
                    <div>
                        <Link to="/" className={classes.link}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Restaurant />
                                </ListItemIcon>
                                <ListItemText primary='Plats' />
                            </ListItemButton>
                        </Link>
                        <Link to="/vins" className={classes.link}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <LocalBar />
                                </ListItemIcon>
                                <ListItemText primary='Vins' />
                            </ListItemButton>
                        </Link>
                        <Link to="/cocktails" className={classes.link}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Nightlife />
                                </ListItemIcon>
                                <ListItemText primary='Cocktails' />
                            </ListItemButton>
                        </Link>
                        <a rel="noopener noreferrer" href="https://carta.casaamalia.com" target="_blank" className={classes.link}>
                            {/* <a rel="noopener noreferrer" href="https://carta.casaamalia.cat" target="_blank" className={classes.link}> */}
                            <ListItemButton>
                                <ListItemIcon>
                                    <SubdirectoryArrowRight />
                                </ListItemIcon>
                                <ListItemText primary='Accés Carta' />
                            </ListItemButton>
                        </a>
                    </div>
                ) : null}
                <ListItemButton
                    onClick={tancarSessio}
                >
                    <ListItemIcon>
                        <LockOpen />
                    </ListItemIcon>
                    <ListItemText primary={logged ? (
                        <>
                            <Typography component="span">{`Logout `}</Typography>
                            <Typography className={clsx(tiempoAlarma && (classes.alarma))} component="span">{`(${timer})`}</Typography>
                        </>
                    ) : ('Login')} />
                </ListItemButton>
                <Divider />
            </List>
        </div>
    )
}

export default Menu
