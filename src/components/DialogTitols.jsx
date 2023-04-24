import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Constantes from "../constantes";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    InputLabel,
    FormControl,
    Input,
    Stack,
    CardMedia,
} from '@mui/material';

//carga componentes
import Lightbox from './Lightbox';

//estilos
import Clases from "../clases";

//importacion acciones
import {
    setOpenDialog,
    actualizarTitol,
    setOpenMedis,
    setImatgeSeleccionada
} from '../redux/appDucks';

//constantes
const {
    RUTA_SERVER: rutaServer
} = Constantes;

const DialogTitols = (props) => {
    const {
        estemAPlats,
        estemAVins,
        valueTab
    } = props;
    const classes = Clases();
    const dispatch = useDispatch();
    const {
        openDialog,
        titolsCarta,
        titolsVins,
        cartaGeneral,
        imatgeSeleccionada
    } = useSelector(store => store.variablesApp);
    const usuari = useSelector(store => store.variablesUsuario.usuarioActivo.nombre);
    const length = estemAPlats ? 5 : 4;
    const [initialStateValuesFormTitols, setInitialStateValuesFormTitols] = useState(
        Array.from({ length }).map((_, i) => ({
            ca: estemAPlats ? titolsCarta[i].titol_ca : titolsVins[i].titol_ca,
            es: estemAPlats ? titolsCarta[i].titol_es : titolsVins[i].titol_es,
            en: estemAPlats ? titolsCarta[i].titol_en : titolsVins[i].titol_en,
            fr: estemAPlats ? titolsCarta[i].titol_fr : titolsVins[i].titol_fr,
            imatge: estemAPlats ? titolsCarta[i].imatge : titolsVins[i].imatge
        }))
    );
    const [valuesFormTitols, setValuesFormTitols] = useState(initialStateValuesFormTitols);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [botonDesactivadoRegistrar, setBotonDesactivadoRegistrar] = useState(true);
    const subRuta = cartaGeneral.tipus === "normal" ? "carta/" : "nadal/";
    const rutaImatges = `${rutaServer}images/header_${estemAPlats ? "plats" : "vins"}/${subRuta}`;

    //useEffect

    useEffect(() => {
        if (imatgeSeleccionada) {
            setValuesFormTitols(valuesFormTitols.map((value, index) => {
                if (index !== valueTab) {
                    return value;
                }
                return {
                    ...value,
                    imatge: imatgeSeleccionada
                };
            }));
            dispatch(setImatgeSeleccionada(null));
        };
    }, [imatgeSeleccionada]);

    useEffect(() => {
        setBotonDesactivadoRegistrar(JSON.stringify(valuesFormTitols) === JSON.stringify(initialStateValuesFormTitols));
    }, [valuesFormTitols]);

    //funciones

    const handleCloseDialogTitols = () => {
        dispatch(setOpenDialog(null));
        setValuesFormTitols( Array.from({ length }).map((_, i) => ({
            ca: "",
            es: "",
            en: "",
            fr: "",
            imatge: "",
        })));
    };

    const handleChangeFormTitols = (prop) => (event) => {
        setValuesFormTitols(valuesFormTitols.map((value, index) => {
            if (index !== valueTab) {
                return value;
            }
            return {
                ...value,
                [prop]: event.target.value
            };
        }));
    };

    const processarDadesTitol = (e) => {
        e.preventDefault();
        const arr = valuesFormTitols.map((titol, index) => {
            return {               
                ...(estemAPlats && ({
                    ...titolsCarta[index]
                })),
                ...(estemAVins && ({
                    ...titolsVins[index]
                })),
                modificat: new Date(),
                ...(valueTab === index && ({
                    titol_ca: valuesFormTitols[valueTab].ca,
                    titol_es: valuesFormTitols[valueTab].es,
                    titol_en: valuesFormTitols[valueTab].en,
                    titol_fr: valuesFormTitols[valueTab].fr,
                    imatge: valuesFormTitols[valueTab].imatge
                })),
                usuari
            }
        });
        handleCloseDialogTitols();
        dispatch(actualizarTitol('categories', arr[valueTab]));
    };

    if (!valuesFormTitols) {
        return null
    };

    return (
        <Box>
            <Dialog
                open={Boolean(openDialog === "titols")}
                onClose={handleCloseDialogTitols}
                fullWidth
                maxWidth="sm"
            >
                <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <DialogTitle id="alert-dialog-title2">
                        {estemAPlats ? 'Editar títol imatge carta' : 'Editar títol imatge vins'}
                    </DialogTitle>
                </Box>
                <DialogContent>
                    <form onSubmit={processarDadesTitol}>
                        <Box px={3} style={{ marginTop: 10 }}>
                            <FormControl
                                className={classes.form}
                                fullWidth
                            >
                                <InputLabel style={{ marginLeft: "-10px" }}>Títol [Ca]</InputLabel>
                                <Input
                                    className={classes.formInput}
                                    id="form-titols_1"
                                    defaultValue={valuesFormTitols[valueTab].ca}
                                    onChange={handleChangeFormTitols('ca')}
                                />
                            </FormControl>
                            <FormControl
                                className={classes.form}
                                fullWidth
                            >
                                <InputLabel style={{ marginLeft: "-10px" }}>Títol [Es]</InputLabel>
                                <Input
                                    className={classes.formInput}
                                    id="form-titols_2"
                                    defaultValue={valuesFormTitols[valueTab].es}
                                    onChange={handleChangeFormTitols('es')}
                                />
                            </FormControl>
                            <FormControl
                                className={classes.form}
                                fullWidth
                            >
                                <InputLabel style={{ marginLeft: "-10px" }}>Títol [En]</InputLabel>
                                <Input
                                    className={classes.formInput}
                                    id="form-titols_3"
                                    defaultValue={valuesFormTitols[valueTab].en}
                                    onInput={handleChangeFormTitols('en')}
                                />
                            </FormControl>
                            <FormControl
                                className={classes.form}
                                fullWidth
                            >
                                <InputLabel style={{ marginLeft: "-10px" }}>Títol [Fr]</InputLabel>
                                <Input
                                    className={classes.formInput}
                                    id="form-titols_4"
                                    defaultValue={valuesFormTitols[valueTab].fr}
                                    onInput={handleChangeFormTitols('fr')}
                                />
                            </FormControl>
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >
                                <FormControl
                                    className={classes.form}
                                    fullWidth
                                    sx={{
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        width: '70%'
                                    }}
                                >
                                    <InputLabel style={{ marginLeft: "-10px" }}>Imatge</InputLabel>
                                    <Input
                                        disabled
                                        className={classes.formInput}
                                        id="form-titols_4"
                                        value={valuesFormTitols[valueTab].imatge}
                                    />
                                </FormControl>
                                <Button
                                    variant="contained"
                                    color={cartaGeneral?.tipus === "nadal" ? "custom" : "primary"}
                                    size="small"
                                    sx={{ width: '30%', height: 'fit-content' }}
                                    onClick={(ev) => dispatch(setOpenMedis({ estado: true, dir: rutaImatges }))}
                                >
                                    Medis
                                </Button>
                            </Stack>
                            <Box className={classes.imageContainerTitols}>
                                <CardMedia
                                    component="img"
                                    className={classes.image}
                                    style={{ padding: 0 }}
                                    image={`${rutaImatges}${valuesFormTitols[valueTab].imatge}`}
                                    alt=""
                                    onClick={() => setLightboxOpen(true)}
                                />
                            </Box>
                            <Lightbox isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} image={`${rutaImatges}${valuesFormTitols[valueTab].imatge}`} />
                        </Box>
                        <Button
                            fullWidth
                            className={classes.formButton}
                            variant="contained"
                            color={cartaGeneral?.tipus === "nadal" ? "custom" : "primary"}
                            size="large"
                            type="submit"
                            style={{ marginBottom: 15, marginTop: 15 }}
                            disabled={botonDesactivadoRegistrar}
                        >
                            Registrar
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </Box>
    )
}

export default DialogTitols
