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
    setOpenMedis,
    setImatgeSeleccionada,
    actualizarPrincipal
} from '../redux/appDucks';
import { replaceSingleQuotes } from '../logica/logicaApp';

//constantes
const {
    RUTA_SERVER: rutaServer
} = Constantes;

const DialogPrincipal = (props) => {
    const {
        estemAPlats,
        estemAVins,
        estemACocktails
    } = props;
    const classes = Clases();
    const dispatch = useDispatch();
    const {
        openDialog,
        cartaGeneral,
        imatgeSeleccionada
    } = useSelector(store => store.variablesApp);
    const usuari = useSelector(store => store.variablesUsuario.usuarioActivo.nombre);
    const [initialStateValuesFormPrincipal, setInitialStateValuesFormPrincipal] = useState(
        {
            ca: estemAPlats ? cartaGeneral.nom_plats_ca : estemAVins ? cartaGeneral.nom_vins_ca : cartaGeneral.nom_cocktails_ca,
            es: estemAPlats ? cartaGeneral.nom_plats_es : estemAVins ? cartaGeneral.nom_vins_es : cartaGeneral.nom_cocktails_es,
            en: estemAPlats ? cartaGeneral.nom_plats_en : estemAVins ? cartaGeneral.nom_vins_en : cartaGeneral.nom_cocktails_en,
            fr: estemAPlats ? cartaGeneral.nom_plats_fr : estemAVins ? cartaGeneral.nom_vins_fr : cartaGeneral.nom_cocktails_fr,
            imatge: estemAPlats ? cartaGeneral.imatge_plats : estemAVins ? cartaGeneral.imatge_vins : cartaGeneral.imatge_cocktails
        }
    );
    const [valuesFormPrincipal, setValuesFormPrincipal] = useState(initialStateValuesFormPrincipal);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [botonDesactivadoRegistrar, setBotonDesactivadoRegistrar] = useState(true);
    const subRuta = cartaGeneral?.tipus === "normal" ? "carta/" : "nadal/";
    const rutaImatges = `${rutaServer}images/header_${estemAPlats ? "plats" : estemAVins ? "vins" : "cocktails"}/${subRuta}`;

    //useEffect

    useEffect(() => {
        if (imatgeSeleccionada) {
            setValuesFormPrincipal({ ...valuesFormPrincipal, imatge: imatgeSeleccionada });
            dispatch(setImatgeSeleccionada(null));
        };
    }, [imatgeSeleccionada]);

    useEffect(() => {
        setBotonDesactivadoRegistrar(JSON.stringify(valuesFormPrincipal) === JSON.stringify(initialStateValuesFormPrincipal));
    }, [valuesFormPrincipal]);

    //funciones

    const handleCloseDialogPrincipal = () => {
        dispatch(setOpenDialog(null));
        setValuesFormPrincipal(
            {
                ca: '',
                es: '',
                en: '',
                fr: '',
                imatge: ''
            }
        );
    };

    const handleChangeFormPrincipal = (prop) => (event) => {
        setValuesFormPrincipal({ ...valuesFormPrincipal, [prop]: event.target.value });
    };

    const processarDadesPrincipal = (e) => {
        e.preventDefault();
        const objDatos = {
            ...cartaGeneral,
            ...(estemAPlats && ({
                nom_plats_ca: valuesFormPrincipal.ca,
                nom_plats_es: valuesFormPrincipal.es,
                nom_plats_en: valuesFormPrincipal.en,
                nom_plats_fr: valuesFormPrincipal.fr,
                imatge_plats: valuesFormPrincipal.imatge,
            })),
            ...(estemAVins && ({
                nom_vins_ca: valuesFormPrincipal.ca,
                nom_vins_es: valuesFormPrincipal.es,
                nom_vins_en: valuesFormPrincipal.en,
                nom_vins_fr: valuesFormPrincipal.fr,
                imatge_vins: valuesFormPrincipal.imatge,
            })),
            ...(estemACocktails && ({
                nom_cocktails_ca: valuesFormPrincipal.ca,
                nom_cocktails_es: valuesFormPrincipal.es,
                nom_cocktails_en: valuesFormPrincipal.en,
                nom_cocktails_fr: valuesFormPrincipal.fr,
                imatge_cocktails: valuesFormPrincipal.imatge,
            })),
            modificat: new Date(),
            usuari
        };
        dispatch(actualizarPrincipal('carta', replaceSingleQuotes(objDatos)));
        handleCloseDialogPrincipal();
    };

    if (!valuesFormPrincipal) {
        return null
    };

    return (
        <Box>
            <Dialog
                open={Boolean(openDialog === "principal")}
                onClose={handleCloseDialogPrincipal}
                fullWidth
                maxWidth="sm"
            >
                <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <DialogTitle id="alert-dialog-title2">
                        {estemAPlats ? 'Editar títol carta' : estemAVins ? 'Editar títol vins' : 'Editar títol cocktails'}
                    </DialogTitle>
                </Box>
                <DialogContent>
                    <form onSubmit={processarDadesPrincipal}>
                        <Box px={3} style={{ marginTop: 10 }}>
                            <FormControl
                                className={classes.form}
                                fullWidth
                            >
                                <InputLabel style={{ marginLeft: "-10px" }}>Títol [Ca]</InputLabel>
                                <Input
                                    className={classes.formInput}
                                    id="form-titols_1"
                                    defaultValue={valuesFormPrincipal.ca}
                                    onChange={handleChangeFormPrincipal('ca')}
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
                                    defaultValue={valuesFormPrincipal.es}
                                    onChange={handleChangeFormPrincipal('es')}
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
                                    defaultValue={valuesFormPrincipal.en}
                                    onInput={handleChangeFormPrincipal('en')}
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
                                    defaultValue={valuesFormPrincipal.fr}
                                    onInput={handleChangeFormPrincipal('fr')}
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
                                        value={valuesFormPrincipal.imatge}
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
                                    image={`${rutaImatges}${valuesFormPrincipal.imatge}`}
                                    alt=""
                                    onClick={() => setLightboxOpen(true)}
                                />
                            </Box>
                            <Lightbox isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} image={`${rutaImatges}${valuesFormPrincipal.imatge}`} />
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

export default DialogPrincipal
