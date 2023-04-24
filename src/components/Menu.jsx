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
    SubdirectoryArrowRight
} from '@mui/icons-material';

//importaciones acciones
import { logoutUsuarioAccion } from '../redux/usuarioDucks';
import {   
    setLaDataCarta,
    setLaDataVins,
    setTitolsCarta,
    setTitolsVins,
    setCartaGeneral
} from '../redux/appDucks';

//estilos
import Clases from "../clases";

const Menu = (props) => {
    const classes = Clases();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logged = useSelector(store => store.variablesUsuario.activo);

    //funciones

    const tancarSessio = () => {        
        dispatch(setLaDataCarta(null));
        dispatch(setLaDataVins(null));
        dispatch(setTitolsCarta([]));
        dispatch(setTitolsVins([]));
        dispatch(logoutUsuarioAccion());
        dispatch(setCartaGeneral(null));
        localStorage.clear();
        navigate('/login');
    };

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
                        <Typography component={'span'}>{`Logout `}</Typography>
                    ) : ('Login')} />
                </ListItemButton>
                <Divider />
            </List>
        </div>
    )
}

export default Menu
