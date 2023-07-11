import { useState, useEffect, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Slide,
    Grid,
    Box,
    CircularProgress,
    Input
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

//carga componentes
import ImatgesMedis from './ImatgesMedis';

//estilos
import Clases from "../clases";

//importacion acciones
import {
    setOpenMedis,
    obtenerImatges,
    reseteaExitoAccion,
    setAlertaAccion,
    uploadImatge,
    setImatges
} from '../redux/appDucks';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Medis = (props) => {
    const classes = Clases();
    const dispatch = useDispatch();
    const {
        openMedis,
        imatges,
        imatgePujadaExit,
        imatgeEsborradaExit,
        errorDeCarga,
        cartaGeneral
    } = useSelector(store => store.variablesApp);
    const [titolBotoImatge, setTitolBotoImatge] = useState("Seleccionar imatge");
    const [botonsDesactivats, setBotonsDesactivats] = useState({ seleccionar: false, pujar: true });
    const [file, setFile] = useState(null);
    const [configDir, setConfigDir] = useState(null);

    //useEffect

    useEffect(() => {
        if (openMedis.estado) {
            dispatch(setImatges(null)).then(({ payload }) => {
                if (payload) {
                    dispatch(obtenerImatges(openMedis.dir));
                    setConfigDir({
                        carta: openMedis.dir.includes("nadal") ? "nadal" : "normal",
                        tipus: openMedis.dir.includes("vins") ? "vins" : openMedis.dir.includes("plats") ? "plats" : "-",
                        format: openMedis.dir.includes("header") ? "header" :
                            openMedis.dir.includes("produccio") ? "produccio" :
                                openMedis.dir.includes("parades") ? "parades" :
                                    openMedis.dir.includes("zones") ? "zones" :
                                        "normal"
                    });
                };
            });
        };
    }, [openMedis]);

    useEffect(() => {
        if (imatgePujadaExit) {
            dispatch(setAlertaAccion({
                abierto: true,
                mensaje: "L'arxiu s'ha pujat correctament.",
                tipo: 'success',
                posicio: 'dreta'
            }));
        };
        if (imatgeEsborradaExit) {
            dispatch(setAlertaAccion({
                abierto: true,
                mensaje: "L'arxiu s'ha eliminat correctament.",
                tipo: 'success',
                posicio: 'dreta'
            }));
        };
        if (errorDeCarga) {
            dispatch(setAlertaAccion({
                abierto: true,
                mensaje: "Error al pujar l'arxiu.",
                tipo: 'error',
                posicio: 'dreta'
            }));
        };
        dispatch(reseteaExitoAccion());
    }, [imatgePujadaExit, errorDeCarga, imatgeEsborradaExit]);

    //funciones

    const renameImageFile = (file) => {
        const newFileName = file.name.replace(/'/g, '-');
        return new File([file], newFileName, { type: file.type });
    };

    const handleChangeImage = (e) => {
        const imatgeGest = renameImageFile(e.target.files[0]);
        const img = new Image();
        img.src = URL.createObjectURL(imatgeGest);
        img.onload = () => {
            if (imatgeGest.name.includes(".webp")) {
                dispatch(setAlertaAccion({
                    abierto: true,
                    mensaje: "Formar d'imatge no acceptat: webp.",
                    tipo: 'error',
                    posicio: 'dreta'
                }));
                resetImage();
                return
            };
            const { width, height } = img;
            const pesBrut = imatgeGest.size;
            if (pesBrut >= 10485760) {
                dispatch(setAlertaAccion({
                    abierto: true,
                    mensaje: "L'arxiu pesa més de 10MB. No acceptat.",
                    tipo: 'error',
                    posicio: 'dreta'
                }));
                resetImage();
                return
            };
            if (height > width) {
                dispatch(setAlertaAccion({
                    abierto: true,
                    mensaje: "L'orientació de la imatge no és correcta, ha de ser horitzontal. No acceptat.",
                    tipo: 'error',
                    posicio: 'dreta'
                }));
                resetImage();
                return
            };
            // if (width > 2000 && configDir.format !== "header") {
            //     dispatch(setAlertaAccion({
            //         abierto: true,
            //         mensaje: "La imatge és massa gran. Redueix les dimensions per optimitzar la càrrega. No acceptat.",
            //         tipo: 'error',
            //         posicio: 'dreta'
            //     }));
            //     resetImage();
            //     return
            // };
            if (width < 1500 && configDir.format === "header") {
                dispatch(setAlertaAccion({
                    abierto: true,
                    mensaje: "Les imatges per les capçaleres han de ser majors de 1500px. No acceptat.",
                    tipo: 'error',
                    posicio: 'dreta'
                }));
                resetImage();
                return
            };
        };
        setTitolBotoImatge(imatgeGest.name);
        setFile(imatgeGest);
        setBotonsDesactivats({ seleccionar: true, pujar: false });
    };

    const resetImage = () => {
        setFile(null);
        setBotonsDesactivats({ seleccionar: false, pujar: true });
        setTitolBotoImatge("Seleccionar imatge");
        document.getElementById("uploadCaptureInputFile").value = "";
    };

    const handleSubmitImage = () => {
        dispatch(uploadImatge(file, configDir));
        resetImage();
    };

    return (
        <div>
            <Dialog
                classes={{
                    paper: 'rounded-none',
                }}
                fullScreen
                TransitionComponent={Transition}
                onClose={(ev) => dispatch(setOpenMedis({ estado: false, dir: null }))}
                open={Boolean(openMedis.estado)}
            >
                <AppBar component="nav" color={cartaGeneral?.tipus === "nadal" ? "custom" : "primary"}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={(ev) => dispatch(setOpenMedis({ estado: false, dir: null }))}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2 }} variant="h6" component="div">
                            Biblioteca de medis
                        </Typography>
                        <Box sx={{ ml: 2, mr: 2, display: 'none' }}>|</Box>
                        {configDir && (
                            <Typography sx={{ ml: 2, marginTop: "4px" }} variant="body1" component="div">
                                {`Ruta/ Carta: ${configDir?.carta} - Format: ${configDir?.format} - Tipus: ${configDir?.tipus}`}
                            </Typography>
                        )}
                        <Button
                            autoFocus
                            color="inherit"
                            onClick={(ev) => dispatch(setOpenMedis({ estado: false, dir: null }))}
                            sx={{ marginLeft: 'auto' }}
                        >
                            Tancar
                        </Button>
                    </Toolbar>
                </AppBar>
                <Grid container spacing={2} mt={5} mb={6}>
                    <Grid item xs={12}>
                        <Box
                            p={2}
                            mt={2}
                            className={classes.root1}
                        >
                            <div>
                                {(imatges && openMedis.estado) && (
                                    <ImatgesMedis
                                        dir={openMedis.dir}
                                        configDir={configDir}
                                    />
                                )}
                            </div>
                        </Box>
                        <AppBar position="fixed" color="default" sx={{ top: 'auto', bottom: 0 }}>
                            <Toolbar>
                                <Box className={classes.box80} >
                                    <Input
                                        accept="image/*"
                                        id="uploadCaptureInputFile"
                                        multiple type="file"
                                        style={{ display: 'none' }}
                                        onChange={handleChangeImage}
                                    />
                                    <label htmlFor="uploadCaptureInputFile">
                                        <Button
                                            variant="contained"
                                            component="span"
                                            color={cartaGeneral?.tipus === "nadal" ? "custom" : "primary"}
                                            disabled={botonsDesactivats.seleccionar}
                                            endIcon={<CloudUploadIcon />}
                                        >
                                            {titolBotoImatge}
                                        </Button>
                                    </label>
                                    <Button
                                        variant="contained"
                                        color={cartaGeneral?.tipus === "nadal" ? "custom" : "primary"}
                                        style={{ marginLeft: '5px' }}
                                        onClick={() => handleSubmitImage()}
                                        disabled={botonsDesactivats.pujar}
                                    >
                                        Pujar
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        style={{ marginLeft: '5px' }}
                                        onClick={resetImage}
                                        disabled={botonsDesactivats.pujar}
                                    >
                                        Cancel·lar
                                    </Button>
                                </Box>
                            </Toolbar>
                        </AppBar>
                    </Grid>
                </Grid>
            </Dialog>
        </div>
    )
}

export default Medis
