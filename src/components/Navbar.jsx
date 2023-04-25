import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Constantes from "../constantes";
import {
    IconButton,
    AppBar,
    Toolbar,
    Typography,
    Box,
    Hidden,
    Button,
    ButtonGroup,
    ClickAwayListener,
    Grow,
    Paper,
    Popper,
    MenuItem,
    MenuList
} from "@mui/material";
import {
    Menu as MenuIcon,
    ArrowDropDown as ArrowDropDownIcon
} from '@mui/icons-material';

//carga componentes
import logo from '../images/logo_header.png';

//importacion acciones
import {
    setCustomDialog,
    canviCarta,
    resetApp
} from '../redux/appDucks';

//estilos
import Clases from "../clases";

//constantes
const { TIPUS_CARTA: tipusCarta } = Constantes;

const Navbar = (props) => {
    const classes = Clases();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartaGeneral } = useSelector(store => store.variablesApp);
    const logged = useSelector(store => store.variablesUsuario.activo);
    const usuari = useSelector(store => store.variablesUsuario.usuarioActivo.nombre);
    const options = tipusCarta;
    const [openMenuCarta, setOpenMenuCarta] = useState(false);
    const anchorRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
        if (cartaGeneral) {
            setSelectedIndex(options.indexOf(cartaGeneral.tipus));
        };
    }, [cartaGeneral]);

    //funciones

    const handleMenuItemClick = (event, index) => {
        const funcionsSi = () => {
            setSelectedIndex(index);
            setOpenMenuCarta(false);
            dispatch(canviCarta(options[index])).then(({ payload }) => {
                if (payload) {
                    dispatch(resetApp());
                    navigate('/');
                };
            });
        };
        dispatch(setCustomDialog({
            abierto: true,
            titulo: "Advertència",
            mensaje: "Estàs segur que vols canviar de carta? Això suposarà canviar l'entorn i la carta en ús.",
            funcionSi: () => funcionsSi()
        }));
    };

    const handleToggleMenuCarta = () => {
        setOpenMenuCarta((prevOpen) => !prevOpen);
    };

    const handleCloseMenuCarta = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        };
        setOpenMenuCarta(false);
    };

    return (
        <AppBar className={classes.appBar} color={cartaGeneral?.tipus === "nadal" ? "custom" : "primary"}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    className={classes.menuButton}
                    onClick={() => props.accionAbrir()}
                >
                    <MenuIcon />
                </IconButton>
                <Hidden only={'xs'}>
                    <Box className={classes.fonsLogo}>
                        <img src={logo} className={classes.logo} alt="logo" />
                    </Box>
                    <Typography className={classes.title} variant="h5">
                        {cartaGeneral?.tipus === "nadal" ? "Backend Gestió Carta Nadal Casa Amàlia" : "Backend Gestió Carta Casa Amàlia"}
                    </Typography>
                </Hidden>
                {(logged && cartaGeneral) && (
                    <Box sx={{ marginRight: 0 }}>
                        <ButtonGroup
                            variant="contained"
                            ref={anchorRef}
                            color={cartaGeneral?.tipus === "nadal" ? "custom" : "primary"}
                            disableElevation
                            className={classes.ombra}
                            disabled={usuari !== "admin" && usuari !== "sergi"}
                        >
                            <Button sx={{ pointerEvents: "none" }}>{options[selectedIndex]}</Button>
                            <Button
                                size="small"
                                onClick={handleToggleMenuCarta}
                            >
                                <ArrowDropDownIcon />
                            </Button>
                        </ButtonGroup>
                        <Popper
                            sx={{
                                zIndex: 1,
                            }}
                            open={openMenuCarta}
                            anchorEl={anchorRef.current}
                            role={undefined}
                            transition
                            disablePortal
                        >
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{
                                        transformOrigin:
                                            placement === 'bottom' ? 'center top' : 'center bottom',
                                    }}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={handleCloseMenuCarta}>
                                            <MenuList id="split-button-menu" autoFocusItem>
                                                {options.map((option, index) => (
                                                    <MenuItem
                                                        key={option}
                                                        selected={index === selectedIndex}
                                                        onClick={(event) => handleMenuItemClick(event, index)}
                                                        disabled={option === cartaGeneral.tipus ? true : false}
                                                    >
                                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                                    </MenuItem>
                                                ))}
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;
