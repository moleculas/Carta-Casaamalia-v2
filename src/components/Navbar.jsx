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
    MenuList,
    Stack
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
    canviCartaEdicio,
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
    const [openMenuCartaActiva, setOpenMenuCartaActiva] = useState(false);
    const anchorRef = useRef(null);
    const anchorRefActiva = useRef(null);
    const [selectedIndexEdicio, setSelectedIndexEdicio] = useState(null);
    const [selectedIndexActiva, setSelectedIndexActiva] = useState(null);

    useEffect(() => {
        if (cartaGeneral) {
            const edicioIndex = cartaGeneral.activa_edicio === "si" ? 1 : 0;
            const activaIndex = cartaGeneral.activa === "si" ? 1 : 0;
            if (cartaGeneral.tipus === "normal") {
                setSelectedIndexEdicio(edicioIndex);
                setSelectedIndexActiva(activaIndex);
            } else if (cartaGeneral.tipus === "nadal") {
                setSelectedIndexEdicio(1 - edicioIndex);
                setSelectedIndexActiva(1 - activaIndex);
            }
        }
    }, [cartaGeneral]);

    //funciones

    const handleMenuItemClickEdicio = (event, index) => {
        setSelectedIndexEdicio(index);
        setOpenMenuCarta(false);
        dispatch(canviCartaEdicio(options[index])).then(({ payload }) => {
            if (payload) {
                dispatch(resetApp());
                navigate('/');
            };
        });
    };

    const handleMenuItemClickDefinitiu = (event, index) => {
        const funcionsSi = () => {
            setSelectedIndexActiva(index);
            setOpenMenuCartaActiva(false);
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

    const handleToggleMenuCartaActiva = () => {
        setOpenMenuCartaActiva((prevOpen) => !prevOpen);
    };

    const handleCloseMenuCartaActiva = (event) => {
        if (anchorRefActiva.current && anchorRefActiva.current.contains(event.target)) {
            return;
        };
        setOpenMenuCartaActiva(false);
    };

    const retornaActiuColor = (boto) => {
        if (!cartaGeneral) return;
        const isNormal = cartaGeneral.tipus === "normal";
        const isSi = (prop) => cartaGeneral[prop] === "si";
        if (isNormal) {
            return boto === "edicio" ? (isSi("activa_edicio") ? "primary" : "custom") :
                (isSi("activa") ? "primary" : "custom");
        } else if (cartaGeneral.tipus === "nadal") {
            return boto === "edicio" ? (isSi("activa_edicio") ? "custom" : "primary") :
                (isSi("activa") ? "custom" : "primary");
        }
    };

    const retornaActiuDisabled = (boto, option) => {
        if (!cartaGeneral) return;
        const isNormal = cartaGeneral.tipus === "normal";
        const isSi = (prop) => cartaGeneral[prop] === "si";
        if (isNormal) {
            return boto === "edicio" ? (isSi("activa_edicio") ? option === "normal" : option === "nadal") :
                (isSi("activa") ? option === "normal" : option === "nadal");
        } else if (cartaGeneral.tipus === "nadal") {
            return boto === "edicio" ? (isSi("activa_edicio") ? option === "nadal" : option === "normal") :
                (isSi("activa") ? option === "nadal" : option === "normal");
        }
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
                {(logged && cartaGeneral && (usuari === "admin" || usuari === "sergi_nadal")) && (
                    <Stack direction="row" spacing={1}>
                        <Box sx={{ marginRight: 0 }}>
                            <ButtonGroup
                                variant="contained"
                                ref={anchorRef}
                                color={retornaActiuColor("edicio")}
                                disableElevation
                                className={classes.ombra}
                            >
                                <Button sx={{ pointerEvents: "none" }}>{`Edició ${options[selectedIndexEdicio]}`}</Button>
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
                                                            selected={index === selectedIndexEdicio}
                                                            onClick={(event) => handleMenuItemClickEdicio(event, index)}
                                                            //disabled={option === cartaGeneral.tipus ? true : false}
                                                            disabled={retornaActiuDisabled("edicio", option)}
                                                        >
                                                            {`Edició ${option.charAt(0).toUpperCase() + option.slice(1)}`}
                                                        </MenuItem>
                                                    ))}
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </Box>
                        <Box sx={{ marginRight: 0 }}>
                            <ButtonGroup
                                variant="contained"
                                ref={anchorRefActiva}
                                color={retornaActiuColor("activa")}
                                disableElevation
                                className={classes.ombra}
                            >
                                <Button sx={{ pointerEvents: "none" }}>{`Activa ${options[selectedIndexActiva]}`}</Button>
                                <Button
                                    size="small"
                                    onClick={handleToggleMenuCartaActiva}
                                >
                                    <ArrowDropDownIcon />
                                </Button>
                            </ButtonGroup>
                            <Popper
                                sx={{
                                    zIndex: 1,
                                }}
                                open={openMenuCartaActiva}
                                anchorEl={anchorRefActiva.current}
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
                                            <ClickAwayListener onClickAway={handleCloseMenuCartaActiva}>
                                                <MenuList id="split-button-menu" autoFocusItem>
                                                    {options.map((option, index) => (
                                                        <MenuItem
                                                            key={option}
                                                            selected={index === selectedIndexActiva}
                                                            onClick={(event) => handleMenuItemClickDefinitiu(event, index)}
                                                            //disabled={option === cartaGeneral.tipus ? true : false}
                                                            disabled={retornaActiuDisabled("activa", option)}
                                                        >
                                                            {`Activa ${option.charAt(0).toUpperCase() + option.slice(1)}`}
                                                        </MenuItem>
                                                    ))}
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </Box>
                    </Stack>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;
