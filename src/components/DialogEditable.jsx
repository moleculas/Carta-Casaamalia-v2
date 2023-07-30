import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Grid,
    Button,
    AppBar,
    Tabs,
    Tab,
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
    IconButton,
    Tooltip
} from '@mui/material';
import {
    BorderColor,
    RestartAlt,
    Delete as DeleteIcon
} from '@mui/icons-material';
import MUIRichTextEditor from 'mui-rte';
import {
    convertFromHTML,
    ContentState,
    convertToRaw
} from "draft-js";
import { stateToHTML } from 'draft-js-export-html';

//carga componentes
import DialogEditableFormImatge from './DialogEditableFormImatge';

//estilos
import Clases from "../clases";

//importacion acciones
import {
    setOpenDialog,
    actualitzarEditable,
    setItemEditar,
    setAlertaAccion,
    registrarEditable,
    setCustomDialog,
    eliminarEditable
} from '../redux/appDucks';
import {
    a11yProps,
    orientacioTabs,
    TabPanel,
    replaceSingleQuotes,
    CustomDeleteIcon
} from '../logica/logicaApp';

const DialogEditable = (props) => {
    const {
        element,
        itemsTotal
    } = props;
    const classes = Clases();
    const dispatch = useDispatch();
    const {
        openDialog,
        produccio,
        parades,
        cartaGeneral
    } = useSelector(store => store.variablesApp);
    const esDesktop = useMediaQuery(theme => theme.breakpoints.up('lg'));
    const usuari = useSelector(store => store.variablesUsuario.usuarioActivo.nombre);
    const [modeDialogEditable, setModeDialogEditable] = useState("creacio");
    const [initialStateValuesFormEditable, setInitialStateValuesFormEditable] = useState(
        {
            nom_ca: "",
            nom_es: "",
            nom_en: "",
            nom_fr: "",
            subNom_ca: "",
            subNom_es: "",
            subNom_en: "",
            subNom_fr: "",
            descripcio_ca: "",
            descripcio_es: "",
            descripcio_en: "",
            descripcio_fr: "",
            imatges: []
        }
    );
    const [valuesFormEditable, setValuesFormEditable] = useState(
        {
            nom_ca: "",
            nom_es: "",
            nom_en: "",
            nom_fr: "",
            subNom_ca: "",
            subNom_es: "",
            subNom_en: "",
            subNom_fr: "",
            descripcio_ca: "",
            descripcio_es: "",
            descripcio_en: "",
            descripcio_fr: "",
            imatges: []
        }
    );
    const [botonDesactivadoRegistrar, setBotonDesactivadoRegistrar] = useState(true);
    const [valueTab3, setValueTab3] = useState(0);
    const controls = ["title", "bold", "italic", "underline", "strikethrough", "highlight", "undo", "redo", "link", "numberList", "bulletList", "quote"];
    const editorRefCa = useRef(null);
    const editorRefEs = useRef(null);
    const editorRefEn = useRef(null);
    const editorRefFr = useRef(null);
    const [estadosMuiRte, setEstadosMuiRte] = useState(
        {
            ca: '',
            es: '',
            en: '',
            fr: '',
        }
    );
    const [estadosMuiRteTemp, setEstadosMuiRteTemp] = useState('');
    const [item, setItem] = useState(null);
    const arrItems = { "produccio": produccio, "parades": parades }[element] || null;
    const textItem = { "produccio": "producció", "parades": "parades" }[element] || "";

    //useEffect

    useEffect(() => {
        setBotonDesactivadoRegistrar(JSON.stringify(valuesFormEditable) === JSON.stringify(initialStateValuesFormEditable));
    }, [valuesFormEditable]);

    //funciones

    const handleClickItem = (item) => {
        setModeDialogEditable('edicio');
        setItem(item);
        const obj = {
            nom_ca: item.nom_ca,
            nom_es: item.nom_es,
            nom_en: item.nom_en,
            nom_fr: item.nom_fr,
            subNom_ca: item.subNom_ca,
            subNom_es: item.subNom_es,
            subNom_en: item.subNom_en,
            subNom_fr: item.subNom_fr,
            descripcio_ca: item.descripcio_ca,
            descripcio_es: item.descripcio_es,
            descripcio_en: item.descripcio_en,
            descripcio_fr: item.descripcio_ca,
            imatges: item.imatges.imatges
        };
        setValuesFormEditable(obj);
        setInitialStateValuesFormEditable(obj);
        setEstadosMuiRte({
            ca: convertirHtml(item.descripcio_ca),
            es: convertirHtml(item.descripcio_es),
            en: convertirHtml(item.descripcio_en),
            fr: convertirHtml(item.descripcio_fr),
        });
    };

    const resetDialog = () => {
        setModeDialogEditable('creacio');
        const obj = {
            nom_ca: "",
            nom_es: "",
            nom_en: "",
            nom_fr: "",
            subNom_ca: "",
            subNom_es: "",
            subNom_en: "",
            subNom_fr: "",
            descripcio_ca: "",
            descripcio_es: "",
            descripcio_en: "",
            descripcio_fr: "",
            imatges: []
        };
        setValuesFormEditable(obj);
        setInitialStateValuesFormEditable(obj);
        setEstadosMuiRte({
            ca: '',
            es: '',
            en: '',
            fr: '',
        });
    };

    const handleCloseDialogItem = () => {
        dispatch(setItemEditar(null));
        dispatch(setOpenDialog(null));
    };

    const handleChangeTab3 = (event, newValue) => {
        setValueTab3(newValue);
    };

    const processarDadesItem = (e) => {
        e.preventDefault();
        const emptyFields = [
            valuesFormEditable.nom_ca,
            valuesFormEditable.nom_es,
            valuesFormEditable.nom_en,
            valuesFormEditable.nom_fr,
            valuesFormEditable.descripcio_ca,
            valuesFormEditable.descripcio_es,
            valuesFormEditable.descripcio_en,
            valuesFormEditable.descripcio_fr,
            valuesFormEditable.imatges.length === 0,
        ].some((field) => field === "" || field === "<p><br></p>");
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
            ...(modeDialogEditable === 'edicio' && ({
                ...item
            })),
            nom_ca: valuesFormEditable.nom_ca,
            nom_es: valuesFormEditable.nom_es,
            nom_en: valuesFormEditable.nom_en,
            nom_fr: valuesFormEditable.nom_fr,
            subNom_ca: valuesFormEditable.subNom_ca || null,
            subNom_es: valuesFormEditable.subNom_es || null,
            subNom_en: valuesFormEditable.subNom_en || null,
            subNom_fr: valuesFormEditable.subNom_fr || null,
            descripcio_ca: valuesFormEditable.descripcio_ca,
            descripcio_es: valuesFormEditable.descripcio_es,
            descripcio_en: valuesFormEditable.descripcio_en,
            descripcio_fr: valuesFormEditable.descripcio_fr,
            imatges: JSON.stringify({ imatges: valuesFormEditable.imatges }),
            modificat: new Date(),
            usuari
        };
        modeDialogEditable === 'creacio' ?
            dispatch(registrarEditable(element, replaceSingleQuotes(objDatos))) :
            dispatch(actualitzarEditable(element, replaceSingleQuotes(objDatos)));
        resetDialog();
    };

    const handleChangeFormItem = (prop) => (event) => {
        setValuesFormEditable({
            ...valuesFormEditable,
            [prop]: event.target.value
        });
    };

    const convertirHtml = (markup) => {
        const contentHTML = convertFromHTML(markup);
        const state = ContentState.createFromBlockArray(contentHTML.contentBlocks, contentHTML.entityMap);
        return JSON.stringify(convertToRaw(state));
    };

    const handleEditorChange = (state, prop) => {
        const content = stateToHTML(state.getCurrentContent());
        setEstadosMuiRteTemp(JSON.stringify(convertToRaw(state.getCurrentContent())));
        if (content !== "<p><br></p>") {
            setValuesFormEditable({
                ...valuesFormEditable,
                [prop]: content
            });
        };
    };

    const handleEditorBlur = (prop) => {
        setEstadosMuiRte(prevState => ({
            ...prevState,
            [prop]: estadosMuiRteTemp
        }));
    };

    const handleEliminar = (event, id) => {
        const funcionsSi = (id) => {
            dispatch(eliminarEditable(element, id));
        };
        dispatch(setCustomDialog({
            abierto: true,
            titulo: "Advertència",
            mensaje: "Estàs segur que vols eliminar el registre?",
            funcionSi: () => funcionsSi(id)
        }));
    };

    const habilitatEliminar = (id) => {
        if (element === "parades") {
            for (const objeto of itemsTotal) {
                const parades = (objeto.parada || "").split(",").map(parada => Number(parada));
                if (parades.includes(id)) {
                    return true;
                };
            };
            return false;
        };
        if (element === "produccio") {
            for (const objeto of itemsTotal) {
                const produccions = (objeto.produccio || "").split(",").map(produccio => Number(produccio));
                if (produccions.includes(id)) {
                    return true;
                };
            };
            return false;
        };
    };

    if (!valuesFormEditable) {
        return null
    };

    return (
        <Box>
            <Dialog
                open={Boolean(openDialog === element)}
                onClose={handleCloseDialogItem}
                fullWidth
                maxWidth="xl"
            >
                <DialogTitle>
                    {modeDialogEditable === 'creacio' ?
                        `Crear registre ${textItem}` :
                        `Editar registre ${arrItems.findIndex(prod => prod.id === item.id) + 1} ${textItem}`}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={8} style={{ height: '750px', maxHeight: '750px', overflowY: 'hidden' }}>
                            <form onSubmit={processarDadesItem}>
                                <AppBar position="static" color={cartaGeneral?.tipus === "nadal" ? "custom" : "primary"}>
                                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                                        <Box>
                                            <Tabs
                                                value={valueTab3}
                                                onChange={handleChangeTab3}
                                                orientation={orientacioTabs(esDesktop)}
                                                indicatorColor="secondary"
                                                textColor="inherit"
                                            >
                                                <Tab label="Ca" {...a11yProps(0)} />
                                                <Tab label="Es" {...a11yProps(1)} />
                                                <Tab label="En" {...a11yProps(2)} />
                                                <Tab label="Fr" {...a11yProps(3)} />
                                            </Tabs>
                                        </Box>
                                        <Tooltip title="Reset" placement="left" arrow>
                                            <IconButton
                                                size="small"
                                                sx={{ my: -1, mr: 2 }}
                                                onClick={() => resetDialog()}
                                            >
                                                <RestartAlt />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>

                                </AppBar>
                                <TabPanel value={valueTab3} index={0}>
                                    <Stack direction="row" alignItems="center">
                                        <Box sx={{ width: '60%' }}>
                                            <FormControl
                                                className={classes.form}
                                                fullWidth
                                            >
                                                <InputLabel style={{ marginLeft: "-10px" }}>Nom [Ca]</InputLabel>
                                                <Input
                                                    className={classes.formInput}
                                                    value={valuesFormEditable.nom_ca}
                                                    onInput={handleChangeFormItem('nom_ca')}
                                                />
                                            </FormControl>
                                        </Box>
                                        <Box sx={{ width: '40%' }}>
                                            <FormControl
                                                className={classes.form}
                                                fullWidth
                                            >
                                                <InputLabel style={{ marginLeft: "-10px" }}>SubTítol [Ca]</InputLabel>
                                                <Input
                                                    className={classes.formInput}
                                                    value={valuesFormEditable.subNom_ca}
                                                    onInput={handleChangeFormItem('subNom_ca')}
                                                />
                                            </FormControl>
                                        </Box>
                                    </Stack>
                                    <Box sx={{ minHeight: 150, padding: "4px", marginTop: "-10px" }}>
                                        <Typography
                                            variant="body1"
                                            color="text.secondary"
                                            className={classes.fuentePequena}
                                        >
                                            Descripció [Ca]
                                        </Typography>
                                        <MUIRichTextEditor
                                            ref={editorRefCa}
                                            label="Descripció..."
                                            controls={controls}
                                            defaultValue={estadosMuiRte.ca}
                                            onBlur={() => handleEditorBlur('ca')}
                                            onChange={(state) => handleEditorChange(state, 'descripcio_ca')}
                                        />
                                    </Box>
                                </TabPanel>
                                <TabPanel value={valueTab3} index={1}>
                                    <Stack direction="row" alignItems="center">
                                        <Box sx={{ width: '60%' }}>
                                            <FormControl
                                                className={classes.form}
                                                fullWidth
                                            >
                                                <InputLabel style={{ marginLeft: "-10px" }}>Nom [Es]</InputLabel>
                                                <Input
                                                    className={classes.formInput}
                                                    value={valuesFormEditable.nom_es}
                                                    onInput={handleChangeFormItem('nom_es')}
                                                />
                                            </FormControl>
                                        </Box>
                                        <Box sx={{ width: '40%' }}>
                                            <FormControl
                                                className={classes.form}
                                                fullWidth
                                            >
                                                <InputLabel style={{ marginLeft: "-10px" }}>SubTítol [Es]</InputLabel>
                                                <Input
                                                    className={classes.formInput}
                                                    value={valuesFormEditable.subNom_es}
                                                    onInput={handleChangeFormItem('subNom_es')}
                                                />
                                            </FormControl>
                                        </Box>
                                    </Stack>
                                    <Box sx={{ minHeight: 150, padding: "4px", marginTop: "-10px" }}>
                                        <Typography
                                            variant="body1"
                                            color="text.secondary"
                                            className={classes.fuentePequena}
                                        >
                                            Descripció [Es]
                                        </Typography>
                                        <MUIRichTextEditor
                                            ref={editorRefEs}
                                            label="Descripció..."
                                            controls={controls}
                                            defaultValue={estadosMuiRte.es}
                                            onBlur={() => handleEditorBlur('es')}
                                            onChange={(state) => handleEditorChange(state, 'descripcio_es')}
                                        />
                                    </Box>
                                </TabPanel>
                                <TabPanel value={valueTab3} index={2}>
                                    <Stack direction="row" alignItems="center">
                                        <Box sx={{ width: '60%' }}>
                                            <FormControl
                                                className={classes.form}
                                                fullWidth
                                            >
                                                <InputLabel style={{ marginLeft: "-10px" }}>Nom [En]</InputLabel>
                                                <Input
                                                    className={classes.formInput}
                                                    value={valuesFormEditable.nom_en}
                                                    onInput={handleChangeFormItem('nom_en')}
                                                />
                                            </FormControl>
                                        </Box>
                                        <Box sx={{ width: '40%' }}>
                                            <FormControl
                                                className={classes.form}
                                                fullWidth
                                            >
                                                <InputLabel style={{ marginLeft: "-10px" }}>SubTítol [En]</InputLabel>
                                                <Input
                                                    className={classes.formInput}
                                                    value={valuesFormEditable.subNom_en}
                                                    onInput={handleChangeFormItem('subNom_en')}
                                                />
                                            </FormControl>
                                        </Box>
                                    </Stack>
                                    <Box sx={{ minHeight: 150, padding: "4px", marginTop: "-10px" }}>
                                        <Typography
                                            variant="body1"
                                            color="text.secondary"
                                            className={classes.fuentePequena}
                                        >
                                            Descripció [En]
                                        </Typography>
                                        <MUIRichTextEditor
                                            ref={editorRefEn}
                                            label="Descripció..."
                                            controls={controls}
                                            defaultValue={estadosMuiRte.en}
                                            onBlur={() => handleEditorBlur('en')}
                                            onChange={(state) => handleEditorChange(state, 'descripcio_en')}
                                        />
                                    </Box>
                                </TabPanel>
                                <TabPanel value={valueTab3} index={3}>
                                    <Stack direction="row" alignItems="center">
                                        <Box sx={{ width: '60%' }}>
                                            <FormControl
                                                className={classes.form}
                                                fullWidth
                                            >
                                                <InputLabel style={{ marginLeft: "-10px" }}>Nom [Fr]</InputLabel>
                                                <Input
                                                    className={classes.formInput}
                                                    value={valuesFormEditable.nom_fr}
                                                    onInput={handleChangeFormItem('nom_fr')}
                                                />
                                            </FormControl>
                                        </Box>
                                        <Box sx={{ width: '40%' }}>
                                            <FormControl
                                                className={classes.form}
                                                fullWidth
                                            >
                                                <InputLabel style={{ marginLeft: "-10px" }}>SubTítol [Fr]</InputLabel>
                                                <Input
                                                    className={classes.formInput}
                                                    value={valuesFormEditable.subNom_fr}
                                                    onInput={handleChangeFormItem('subNom_fr')}
                                                />
                                            </FormControl>
                                        </Box>
                                    </Stack>
                                    <Box sx={{ minHeight: 150, padding: "4px", marginTop: "-10px" }}>
                                        <Typography
                                            variant="body1"
                                            color="text.secondary"
                                            className={classes.fuentePequena}
                                        >
                                            Descripció [Fr]
                                        </Typography>
                                        <MUIRichTextEditor
                                            ref={editorRefFr}
                                            label="Descripció..."
                                            controls={controls}
                                            defaultValue={estadosMuiRte.fr}
                                            onBlur={() => handleEditorBlur('fr')}
                                            onChange={(state) => handleEditorChange(state, 'descripcio_fr')}
                                        />
                                    </Box>
                                </TabPanel>
                                <DialogEditableFormImatge
                                    element={element}
                                    valuesFormEditable={valuesFormEditable}
                                    setValuesFormEditable={setValuesFormEditable}
                                />
                                <Button
                                    fullWidth
                                    className={classes.formButton}
                                    variant="contained"
                                    color={cartaGeneral?.tipus === "nadal" ? "custom" : "primary"}
                                    size="large"
                                    type="submit"
                                    style={{ marginBottom: '15px' }}
                                    disabled={botonDesactivadoRegistrar}
                                >
                                    {modeDialogEditable === 'creacio' ? "Registrar" : "Actualitzar"}
                                </Button>
                            </form>
                        </Grid>
                        <Grid item xs={4} style={{ height: '750px', maxHeight: '750px', overflowY: 'hidden' }}>
                            <AppBar position="static" color={cartaGeneral?.tipus === "nadal" ? "custom" : "primary"} sx={{ p: 1.5 }}>
                                <Stack direction="row" alignItems="center" justifyContent="space-between">
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        className={classes.fuentePequena}
                                    >
                                        {element === "produccio" ? "Llistat producció" : "Llistat parades"}
                                    </Typography>

                                </Stack>
                            </AppBar>
                            <Box style={{ maxHeight: '680px', overflowY: 'auto', overflowX: 'hidden', marginRight: 10, marginTop: 10 }}>
                                <List
                                    style={{ paddingY: 5, paddingLeft: 5, paddingRight: 15 }}
                                >
                                    {arrItems.map((item, index) => (
                                        <ListItem
                                            key={`list-prod-${index}`}
                                            className={classes.casilla}
                                        >
                                            <ListItemText
                                                secondary={
                                                    <Typography
                                                        component={"span"}
                                                        style={{ fontSize: '14px' }}
                                                    >
                                                        {item.nom_ca}
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
                                                <CustomDeleteIcon
                                                    disabled={habilitatEliminar(item.id)}
                                                    handleEliminar={handleEliminar}
                                                    id={item.id}
                                                />
                                                {/* <Tooltip title="Eliminar" placement="top-end" arrow>
                                                    <DeleteIcon
                                                        color="error"
                                                        onClick={(event) => handleEliminar(event, item.id)}
                                                        sx={{ cursor: 'pointer', ml: 1, opacity: 0.7 }}
                                                    />
                                                </Tooltip> */}
                                            </ListItemSecondaryAction>
                                        </ListItem >
                                    ))}
                                </List>
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog >
        </Box >
    )
}

export default DialogEditable
