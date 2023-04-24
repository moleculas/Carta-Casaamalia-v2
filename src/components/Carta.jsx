import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Grid,
    Backdrop,
    CircularProgress,
    Snackbar,
    Typography,
    Divider,
    Chip,
    AppBar,
    Tabs,
    Tab,
    useMediaQuery
} from '@mui/material';

//carga componentes
import Panel from './Panel';
import DialogComponent from './DialogComponent';
import DialogPrincipal from './DialogPrincipal';

//estilos
import Clases from "../clases";

//importacion acciones
import {
    TabPanel,
    a11yProps,
    useForceUpdate,
    Alert,
    orientacioTabs,
    useWebSocket
} from '../logica/logicaApp';
import {
    obtenerDatosInicial,
    setAlertaAccion,
    reseteaExitoAccion,
    setItemsActivosCat,
    setItemsActivoDestacats,
    resetIIntervencioRegistre
} from '../redux/appDucks';

const Carta = (props) => {
    const classes = Clases();
    let forceUpdate = useForceUpdate();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logged = useSelector(store => store.variablesUsuario.activo);
    const usuari = useSelector(store => store.variablesUsuario.usuarioActivo.nombre);
    const { websocket, sendMessageWebSocket } = useWebSocket(usuari);
    const {
        laDataCarta,
        titolsCarta,
        errorDeCarga,
        cartaGeneral,
        alerta,
        actualitzarTitolExito,
        actualitzarItemExito,
        registrarItemExito,
        eliminarItemExito,
        actualitzarPrincipalExito,
        customDialog,
        openDialog,
        ultimaIntervencion,
        ordenarItemsExito,
        canviCartaExito,
        intervencioRegistre,
        produccio
    } = useSelector(store => store.variablesApp);
    const openLoading = useSelector(store => store.variablesApp.loadingApp);
    const [itemsCat1, setItemsCat1] = useState(null);
    const [itemsCat2, setItemsCat2] = useState(null);
    const [itemsCat3, setItemsCat3] = useState(null);
    const [itemsCat4, setItemsCat4] = useState(null);
    const [itemsCat5, setItemsCat5] = useState(null);
    const [openSnack, setOpenSnack] = useState(false);
    const [alert, setAlert] = useState({});
    const [valueTab, setValueTab] = useState(0);
    const esDesktop = useMediaQuery(theme => theme.breakpoints.up('lg'));
    const [isDataReady, setIsDataReady] = useState(false);

    //useEffect

    useEffect(() => {
        if (!logged) {
            navigate('/login');
        };
    }, [logged]);

    // useEffect(() => {
    //     if (intervencioRegistre) {
    //         if (websocket.readyState === 1) {
    //             sendMessageWebSocket(usuari);
    //         };
    //         dispatch(resetIIntervencioRegistre());
    //     };
    // }, [intervencioRegistre]);

    useEffect(() => {
        if (laDataCarta) {
            const categorias = [1, 2, 3, 4, 5];
            const itemsPorCategoria = categorias.reduce((obj, cat) => {
                obj[`p${cat}`] = laDataCarta.filter((plat) => plat.categoria === cat)
                    .sort((a, b) => {
                        if (a.ordre === 0 && b.ordre === 0) {
                            return 0;
                        } else if (a.ordre === 0) {
                            return 1;
                        } else if (b.ordre === 0) {
                            return -1;
                        } else {
                            return a.ordre - b.ordre;
                        }
                    });
                return obj;
            }, {});
            for (let i = 0; i < categorias.length; i++) {
                const cat = categorias[i];
                if (cat === 1) {
                    setItemsCat1(itemsPorCategoria[`p${cat}`]);
                    determinaItemsActivosDestacats(itemsPorCategoria[`p${cat}`]);
                };
                cat === 2 && setItemsCat2(itemsPorCategoria[`p${cat}`]);
                cat === 3 && setItemsCat3(itemsPorCategoria[`p${cat}`]);
                cat === 4 && setItemsCat4(itemsPorCategoria[`p${cat}`]);
                cat === 5 && setItemsCat5(itemsPorCategoria[`p${cat}`]);
                if (i === valueTab) {
                    determinaItemsActivos(itemsPorCategoria[`p${cat}`]);
                };
            };
        } else {
            setIsDataReady(false);
            dispatch(obtenerDatosInicial("plats"));
            forceUpdate();
        };
    }, [laDataCarta]);

    useEffect(() => {
        const allItemsReady = [
            itemsCat1,
            itemsCat2,
            itemsCat3,
            itemsCat4,
            itemsCat5
        ].every(item => item);
        if (allItemsReady && laDataCarta) {
            setIsDataReady(true);
        } else {
            setIsDataReady(false);
        };
    }, [
        itemsCat1,
        itemsCat2,
        itemsCat3,
        itemsCat4,
        itemsCat5,
        laDataCarta
    ]);

    useEffect(() => {
        if (alerta.abierto) {
            setAlert({
                mensaje: alerta.mensaje,
                tipo: alerta.tipo,
                posicio: alerta.posicio
            })
            setOpenSnack(true);
        }
    }, [alerta]);

    useEffect(() => {
        if (errorDeCarga) {
            dispatch(setAlertaAccion({
                abierto: true,
                mensaje: "Error de connexió amb la base de dades.",
                tipo: 'error',
                posicio: 'esquerra'
            }));
        }
    }, [errorDeCarga]);

    useEffect(() => {
        if (actualitzarTitolExito || actualitzarItemExito || actualitzarPrincipalExito) {
            dispatch(setAlertaAccion({
                abierto: true,
                mensaje: "Registre actualitzat correctament.",
                tipo: 'success',
                posicio: 'esquerra'
            }));
        };
        if (registrarItemExito) {
            dispatch(setAlertaAccion({
                abierto: true,
                mensaje: "Registre creat correctament.",
                tipo: 'success',
                posicio: 'esquerra'
            }));
        };
        if (eliminarItemExito) {
            dispatch(setAlertaAccion({
                abierto: true,
                mensaje: "Registre eliminat correctament.",
                tipo: 'success',
                posicio: 'esquerra'
            }));
        };
        if (ordenarItemsExito) {
            dispatch(setAlertaAccion({
                abierto: true,
                mensaje: "Registres ordenats correctament.",
                tipo: 'success',
                posicio: 'esquerra'
            }));
        };
        if (canviCartaExito) {
            dispatch(setAlertaAccion({
                abierto: true,
                mensaje: "Carta canviada correctament.",
                tipo: 'success',
                posicio: 'esquerra'
            }));
        };
        dispatch(reseteaExitoAccion());
    }, [
        actualitzarTitolExito,
        actualitzarItemExito,
        actualitzarPrincipalExito,
        registrarItemExito,
        eliminarItemExito,
        ordenarItemsExito,
        canviCartaExito
    ]);

    //funciones  

    const determinaItemsActivos = (array) => {
        const itemsActivos = array.filter(item => item.ordre > 0).length;
        dispatch(setItemsActivosCat(itemsActivos));
    };

    const determinaItemsActivosDestacats = (array) => {
        const itemsActivos = array.filter(item => item.ordre > 0).length;
        dispatch(setItemsActivoDestacats(itemsActivos));
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        };
        setOpenSnack(false);
        dispatch(setAlertaAccion({
            abierto: false,
            mensaje: "",
            tipo: '',
            posicio: ''
        }));
    };

    const handleChangeTab = (event, newValue) => {
        const arr = [itemsCat1, itemsCat2, itemsCat3, itemsCat4, itemsCat5];
        determinaItemsActivos(arr[newValue]);
        setValueTab(newValue);
    };

    if (!isDataReady) {
        return null
    };

    return (
        <div>
            <Backdrop className={classes.loading} open={openLoading} style={{ zIndex: 9999 }}>
                <CircularProgress color="inherit" />
            </Backdrop>  
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box
                        p={2}
                        mt={2}
                        className={classes.root1}
                    >
                        <Typography variant="h5">{cartaGeneral?.nom_plats_ca}</Typography>
                        {cartaGeneral && (
                            <Chip
                                label={`Actualitzat per última vegada el: ${ultimaIntervencion?.modificat ?? cartaGeneral.modificat} per ${((ultimaIntervencion ?? cartaGeneral).usuari).charAt(0).toUpperCase() + ((ultimaIntervencion ?? cartaGeneral).usuari).slice(1)}`}
                            />
                        )}
                    </Box>
                    <Box
                        pl={2}
                        pr={2}
                    >
                        <Divider />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box p={2}>
                        <div className={classes.root2}>
                            <AppBar position="static" color={cartaGeneral?.tipus === "nadal" ? "custom" : "primary"}>
                                <Tabs
                                    value={valueTab}
                                    onChange={handleChangeTab}
                                    orientation={orientacioTabs(esDesktop)}
                                    indicatorColor="secondary"
                                    textColor="inherit"
                                >
                                    <Tab label={titolsCarta[0][`titol_ca`]} {...a11yProps(0)} />
                                    <Tab label={titolsCarta[1][`titol_ca`]} {...a11yProps(1)} />
                                    <Tab label={titolsCarta[2][`titol_ca`]} {...a11yProps(2)} />
                                    <Tab label={titolsCarta[3][`titol_ca`]} {...a11yProps(3)} />
                                    <Tab label={titolsCarta[4][`titol_ca`]} {...a11yProps(4)} />
                                </Tabs>
                            </AppBar>
                            {titolsCarta.map((categoria, index) => {
                                const itemsArr = [itemsCat1, itemsCat2, itemsCat3, itemsCat4, itemsCat5];
                                return (
                                    <TabPanel
                                        key={`tabPanel-${index}`}
                                        value={valueTab}
                                        index={index}
                                    >
                                        <Panel
                                            estemAPlats={true}
                                            estemAVins={false}
                                            items={itemsArr[index]}
                                            valueTab={valueTab}
                                        />
                                    </TabPanel>
                                )
                            })}
                        </div>
                    </Box >
                </Grid >
            </Grid >
            <Snackbar
                anchorOrigin={alert.posicio === "dreta" ? { vertical: 'bottom', horizontal: 'right' } : { vertical: 'bottom', horizontal: 'left' }}
                open={openSnack}
                autoHideDuration={4000}
                onClose={handleCloseSnack}
            >
                <Alert severity={alert.tipo} onClose={handleCloseSnack}>
                    {alert.mensaje}
                </Alert>
            </Snackbar>
            {customDialog?.abierto && (
                <DialogComponent
                    abierto={customDialog.abierto}
                    titulo={customDialog.titulo}
                    mensaje={customDialog.mensaje}
                    funcionSi={customDialog.funcionSi}
                />
            )}
            {openDialog === "principal" && (
                <DialogPrincipal
                    estemAPlats={true}
                    estemAVins={false}
                />
            )}
        </div>
    )
}

export default Carta