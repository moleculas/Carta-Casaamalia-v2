import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Constantes from "../constantes";
import {
    Box,
    Grid,
    Button,
    AppBar,
    Dialog,
    DialogContent,
    DialogTitle,
    useMediaQuery,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    FormControl,
    Input,
    InputLabel,
    Typography,
    Stack,
    Tooltip,
    CardMedia,
    IconButton,
} from '@mui/material';
import {
    BorderColor,
    RestartAlt,
    Delete as DeleteIcon
} from '@mui/icons-material';
import { DragDropContext, Droppable } from "react-beautiful-dnd";

//carga componentes
import Lightbox from './Lightbox';
import ItemZones from './ItemZones';

//estilos
import Clases from "../clases";

//importacion acciones
import {
    setOpenDialog,
    actualitzarZona,
    setItemEditar,
    setAlertaAccion,
    registrarZona,
    setCustomDialog,
    eliminarEditable,
    setOpenMedis,
    setImatgeSeleccionada,
    actualizarCategoria
} from '../redux/appDucks';
import { replaceSingleQuotes } from '../logica/logicaApp';

//constantes
const {
    RUTA_SERVER: rutaServer
} = Constantes;

const DialogZones = (props) => {
    const { categoria } = props;
    const classes = Clases();
    const dispatch = useDispatch();
    const {
        openDialog,
        cartaGeneral,
        zones,
        imatgeSeleccionada
    } = useSelector(store => store.variablesApp);
    const esDesktop = useMediaQuery(theme => theme.breakpoints.up('lg'));
    const usuari = useSelector(store => store.variablesUsuario.usuarioActivo.nombre);
    const [modeDialogZones, setModeDialogZones] = useState("creacio");
    const [initialStateValuesFormZones, setInitialStateValuesFormZones] = useState(
        {
            titol_ca: "",
            titol_es: "",
            titol_en: "",
            titol_fr: "",
            imatge: ""
        }
    );
    const [valuesFormZones, setValuesFormZones] = useState(
        {
            titol_ca: "",
            titol_es: "",
            titol_en: "",
            titol_fr: "",
            imatge: ""
        }
    );
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [botonDesactivadoRegistrar, setBotonDesactivadoRegistrar] = useState(true);
    const [item, setItem] = useState(null);
    //const arrItems = zones.filter((obj) => obj.categoria === categoria);
    const rutaImatges = `${rutaServer}images/zones/`;
    const [itemsOrdenablesZones, setItemsOrdenablesZones] = useState(null);

    //useEffect

    useEffect(() => {
        if (zones) {
            const filteredItems = zones
                .filter((obj) => obj.categoria === categoria)
                .sort((a, b) => a.ordre - b.ordre)
                .map((item, index) => ({
                    ...item,
                    id: `item-${index}`,
                    realId: item.id,
                    index: index + 1,
                }))
            setItemsOrdenablesZones(filteredItems);
        }
    }, [zones]);

    useEffect(() => {
        if (imatgeSeleccionada) {
            setValuesFormZones({
                ...valuesFormZones,
                imatge: imatgeSeleccionada
            });
            dispatch(setImatgeSeleccionada(null));
        };
    }, [imatgeSeleccionada]);

    useEffect(() => {
        setBotonDesactivadoRegistrar(JSON.stringify(valuesFormZones) === JSON.stringify(initialStateValuesFormZones));
    }, [valuesFormZones]);

    //funciones

    const handleClickItem = (item) => {
        setModeDialogZones('edicio');
        setItem(item);
        const obj = {
            titol_ca: item.titol_ca,
            titol_es: item.titol_es,
            titol_en: item.titol_en,
            titol_fr: item.titol_fr,
            imatge: item.imatge
        };
        setValuesFormZones(obj);
        setInitialStateValuesFormZones(obj);
    };

    const resetDialog = () => {
        setModeDialogZones('creacio');
        const obj = {
            titol_ca: "",
            titol_es: "",
            titol_en: "",
            titol_fr: "",
            imatge: ""
        };
        setValuesFormZones(obj);
        setInitialStateValuesFormZones(obj);
    };

    const handleCloseDialogItem = () => {
        dispatch(setItemEditar(null));
        dispatch(setOpenDialog(null));
    };

    const processarDadesItem = (e) => {
        e.preventDefault();
        const emptyFields = [
            valuesFormZones.titol_ca,
            valuesFormZones.titol_es,
            valuesFormZones.titol_en,
            valuesFormZones.titol_fr,
            valuesFormZones.imatge
        ].some((field) => field === "");
        if (emptyFields) {
            dispatch(setAlertaAccion({
                abierto: true,
                mensaje: "Falten dades per omplir revisa el formulari.",
                tipo: 'error',
                posicio: 'esquerra'
            }));
            return;
        };
        const objDatos = {
            ...(modeDialogZones === 'edicio' && ({
                ...item,
                id: item.realId
            })),
            titol_ca: valuesFormZones.titol_ca,
            titol_es: valuesFormZones.titol_es,
            titol_en: valuesFormZones.titol_en,
            titol_fr: valuesFormZones.titol_fr,
            imatge: valuesFormZones.imatge,
            categoria,
            modificat: new Date(),
            usuari,
            ordre: modeDialogZones === 'edicio' ? item.ordre : itemsOrdenablesZones.length + 1
        };
        modeDialogZones === 'creacio' ?
            dispatch(registrarZona(replaceSingleQuotes(objDatos))) :
            dispatch(actualitzarZona(replaceSingleQuotes(objDatos)));
        resetDialog();
    };

    const handleChangeFormItem = (prop) => (event) => {
        setValuesFormZones({
            ...valuesFormZones,
            [prop]: event.target.value
        });
    };

    const handleEliminar = (event, id) => {
        const funcionsSi = (id) => {
            dispatch(eliminarEditable("zones", id));
        };
        dispatch(setCustomDialog({
            abierto: true,
            titulo: "Advertència",
            mensaje: "Estàs segur que vols eliminar el registre?",
            funcionSi: () => funcionsSi(id)
        }));
    };

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) {
            return;
        };
        if (destination.index === source.index) {
            return;
        };
        // const destino = (destination.index > (itemsActivosCat - 1)) ? (itemsActivosCat - 1) : destination.index;
        const destino = destination.index;
        const itemsNew = [...itemsOrdenablesZones];
        const removed = itemsNew.splice(source.index, 1);
        itemsNew.splice(destino, 0, ...removed);
        const nuevoArr = itemsNew.map((item, index) => ({ ...item, id: `item-${index}` }));
        setItemsOrdenablesZones(nuevoArr);
        const arrActualizar = nuevoArr.map((item, index) => ({
            ...item,
            id: item.realId,
            ordre: item.ordre > 0 ? index + 1 : 0
        }));
        setTimeout(() => {
            dispatch(actualizarCategoria("zones", arrActualizar, "no"));
        }, 200);
    };

    if (!valuesFormZones || !itemsOrdenablesZones) {
        return null
    };

    return (
        <Box>
            <Dialog
                open={Boolean(openDialog === "zones")}
                onClose={handleCloseDialogItem}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>
                    Gestió de zones
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={7} style={{ height: '710px', maxHeight: '710px', overflowY: 'hidden' }}>
                            <AppBar position="static" color={cartaGeneral?.tipus === "nadal" ? "custom" : "primary"} sx={{ p: 1.5 }}>
                                <Stack direction="row" alignItems="center" justifyContent="space-between">
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        className={classes.fuentePequena}
                                    >
                                        {`Categoria vins ${categoria}`}
                                    </Typography>
                                    <Tooltip title="Reset" placement="left" arrow>
                                        <IconButton
                                            size="small"
                                            sx={{ my: -1 }}
                                            onClick={() => resetDialog()}
                                        >
                                            <RestartAlt />
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                            </AppBar>
                            <form onSubmit={processarDadesItem}>
                                <Box px={3} style={{ marginTop: 30 }}>
                                    <FormControl
                                        className={classes.form}
                                        fullWidth
                                    >
                                        <InputLabel style={{ marginLeft: "-10px" }}>Títol [Ca]</InputLabel>
                                        <Input
                                            className={classes.formInput}
                                            value={valuesFormZones.titol_ca}
                                            onChange={handleChangeFormItem('titol_ca')}
                                        />
                                    </FormControl>
                                    <FormControl
                                        className={classes.form}
                                        fullWidth
                                    >
                                        <InputLabel style={{ marginLeft: "-10px" }}>Títol [Es]</InputLabel>
                                        <Input
                                            className={classes.formInput}
                                            value={valuesFormZones.titol_es}
                                            onChange={handleChangeFormItem('titol_es')}
                                        />
                                    </FormControl>
                                    <FormControl
                                        className={classes.form}
                                        fullWidth
                                    >
                                        <InputLabel style={{ marginLeft: "-10px" }}>Títol [En]</InputLabel>
                                        <Input
                                            className={classes.formInput}
                                            value={valuesFormZones.titol_en}
                                            onInput={handleChangeFormItem('titol_en')}
                                        />
                                    </FormControl>
                                    <FormControl
                                        className={classes.form}
                                        fullWidth
                                    >
                                        <InputLabel style={{ marginLeft: "-10px" }}>Títol [Fr]</InputLabel>
                                        <Input
                                            className={classes.formInput}
                                            value={valuesFormZones.titol_fr}
                                            onInput={handleChangeFormItem('titol_fr')}
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
                                                value={valuesFormZones.imatge}
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
                                    {valuesFormZones.imatge && (
                                        <Box className={classes.imageContainerTitols}>
                                            <CardMedia
                                                component="img"
                                                className={classes.image}
                                                style={{ padding: 0 }}
                                                image={`${rutaImatges}${valuesFormZones.imatge}`}
                                                alt=""
                                                onClick={() => setLightboxOpen(true)}
                                            />
                                        </Box>
                                    )}
                                    <Lightbox isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} image={`${rutaImatges}${valuesFormZones.imatge}`} />
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
                                    {modeDialogZones === 'creacio' ? "Registrar" : "Actualitzar"}
                                </Button>
                            </form>
                        </Grid>
                        <Grid item xs={5} style={{ height: '710px', maxHeight: '710px', overflowY: 'hidden' }}>
                            <AppBar position="static" color={cartaGeneral?.tipus === "nadal" ? "custom" : "primary"} sx={{ p: 1.5 }}>
                                <Stack direction="row" alignItems="center" justifyContent="space-between">
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        className={classes.fuentePequena}
                                    >
                                        Llistat zones
                                    </Typography>
                                </Stack>
                            </AppBar>
                            <Box style={{ maxHeight: '640px', overflowY: 'hidden', overflowX: 'hidden', marginRight: 10, marginTop: 10 }}>
                                <List
                                    style={{ paddingY: 5, paddingLeft: 5, paddingRight: 15 }}
                                >
                                    <DragDropContext onDragEnd={onDragEnd}>
                                        <Droppable droppableId="list" type="list" direction="vertical">
                                            {(provided) => (
                                                <div ref={provided.innerRef}>
                                                    {itemsOrdenablesZones.map((item, index) => {
                                                        return (
                                                            <Box mb={0.5} key={index}>
                                                                <ItemZones
                                                                    item={item}
                                                                    index={index}
                                                                    handleClickItem={handleClickItem}
                                                                    handleEliminar={handleEliminar}
                                                                />
                                                            </Box>
                                                        )
                                                    })}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    </DragDropContext>
                                    {/* {arrItems.map((item, index) => (
                                        <ListItem
                                            key={`list-zones-${index}`}
                                            className={classes.casilla}
                                        >
                                            <ListItemText
                                                secondary={
                                                    <Typography
                                                        component={"span"}
                                                        style={{ fontSize: '14px' }}
                                                    >
                                                        {item.titol_ca}
                                                    </Typography>
                                                }
                                                sx={{
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis',
                                                    marginRight: 3
                                                }}
                                            />
                                            <ListItemSecondaryAction>
                                                <Tooltip title="Actualitzar" placement="top-end" arrow>
                                                    <BorderColor
                                                        color="disabled"
                                                        onClick={() => handleClickItem(item)}
                                                        sx={{ cursor: 'pointer' }}
                                                    />
                                                </Tooltip>
                                                <Tooltip title="Eliminar" placement="top-end" arrow>
                                                    <DeleteIcon
                                                        color="error"
                                                        onClick={(event) => handleEliminar(event, item.id)}
                                                        sx={{ cursor: 'pointer', ml: 1, opacity: 0.7 }}
                                                    />
                                                </Tooltip>
                                            </ListItemSecondaryAction>
                                        </ListItem >
                                    ))} */}
                                </List>
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog >
        </Box >
    )
}

export default DialogZones
