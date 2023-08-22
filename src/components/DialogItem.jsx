import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Constantes from "../constantes";
import {
    Box,
    Button,
    Chip,
    AppBar,
    Tabs,
    Tab,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    useMediaQuery,
    Stack
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    AutoFixNormal,
    AutoFixOff
} from '@mui/icons-material';

//carga componentes
import DialogItemFormPlats from './DialogItemFormPlats';
import DialogItemFormVins from './DialogItemFormVins';

//estilos
import Clases from "../clases";

//importacion acciones
import {
    setOpenDialog,
    actualizarItem,
    setImatgeSeleccionada,
    setItemEditar,
    setAlertaAccion,
    registrarItem,
    // actualizarItemReordenar
} from '../redux/appDucks';
import {
    a11yProps,
    orientacioTabs,
    replaceSingleQuotes
} from '../logica/logicaApp';

//constantes
const { ALERGENS: alergens } = Constantes;

const DialogItem = (props) => {
    const {
        estemAPlats,
        estemAVins,
        valueTab,
        categoria
    } = props;
    const classes = Clases();
    const dispatch = useDispatch();
    const {
        openDialog,
        imatgeSeleccionada,
        modeDialog,
        itemEditar,
        cartaGeneral,
        itemsActivosCat,
        itemsActivosDestacats,
        produccio,
        parades
    } = useSelector(store => store.variablesApp);
    const { index, item } = itemEditar ?? {};
    const esDesktop = useMediaQuery(theme => theme.breakpoints.up('lg'));
    const usuari = useSelector(store => store.variablesUsuario.usuarioActivo.nombre);
    const [initialStateValuesFormItem, setInitialStateValuesFormItem] = useState(
        {
            descripcio_ca: modeDialog === "edicio" ? item.descripcio_ca : "",
            descripcio_es: modeDialog === "edicio" ? item.descripcio_es : "",
            descripcio_en: modeDialog === "edicio" ? item.descripcio_en : "",
            descripcio_fr: modeDialog === "edicio" ? item.descripcio_fr : "",
            imatge: modeDialog === "edicio" ? item.imatge : "",
            ...(estemAPlats && ({
                nom_ca: modeDialog === "edicio" ? item.nom_ca : "",
                nom_es: modeDialog === "edicio" ? item.nom_es : "",
                nom_en: modeDialog === "edicio" ? item.nom_en : "",
                nom_fr: modeDialog === "edicio" ? item.nom_fr : "",
                parada: modeDialog === "edicio" ? item.parada !== null ? item.parada.split(",").map((parada) => parades.find((item) => item.id === Number(parada)).nom_ca) : ['No'] : ['No'],
                produccio: modeDialog === "edicio" ? item.produccio !== null ? item.produccio.split(",").map((prod) => produccio.find((item) => item.id === Number(prod)).nom_ca) : ['No'] : ['No'],
                alergens: modeDialog === "edicio" ? item.alergens.split(",").map((alergen) => alergens[alergen]) : ['No'],
                destacat: modeDialog === "edicio" ? item.destacat : "0",
            })),
            ...(estemAVins && ({
                nom: modeDialog === "edicio" ? item.nom : "",
                denominacio: modeDialog === "edicio" ? item.denominacio : "",
                puntuacio_pr: modeDialog === "edicio" ? item.puntuacio_pr : "0",
                puntuacio_pe: modeDialog === "edicio" ? item.puntuacio_pe : "0",
                zona: modeDialog === "edicio" ? (item.zona ? item.zona : "No") : "No"
            })),
            preu: modeDialog === "edicio" ? item.preu : "",
            visibilitat: modeDialog === "edicio" ? item.visibilitat : "1",
            ...(modeDialog === "edicio" && ({ categoria: item.categoria }))
        }
    );
    const [valuesFormItem, setValuesFormItem] = useState(initialStateValuesFormItem);
    const [botonDesactivadoRegistrar, setBotonDesactivadoRegistrar] = useState(true);
    const [valueTab2, setValueTab2] = useState(0);

    //useEffect

    useEffect(() => {
        if (imatgeSeleccionada) {
            setValuesFormItem({
                ...valuesFormItem,
                imatge: imatgeSeleccionada
            });
            dispatch(setImatgeSeleccionada(null));
        };
    }, [imatgeSeleccionada]);

    useEffect(() => {
        setBotonDesactivadoRegistrar(JSON.stringify(valuesFormItem) === JSON.stringify(initialStateValuesFormItem));
    }, [valuesFormItem]);

    //funciones

    const handleCloseDialogItem = () => {
        dispatch(setItemEditar(null));
        dispatch(setOpenDialog(null));
        setValuesFormItem(
            {
                descripcio_ca: "",
                descripcio_es: "",
                descripcio_en: "",
                descripcio_fr: "",
                imatge: "",
                ...(estemAPlats && ({
                    nom_ca: "",
                    nom_es: "",
                    nom_en: "",
                    nom_fr: "",
                    parada: "",
                    produccio: "",
                    alergens: "",
                    destacat: "0",
                })),
                ...(estemAVins && ({
                    denominacio: "",
                    puntuacio_pr: "0",
                    puntuacio_pe: "0",
                    zona: "No",
                })),
                preu: "",
                visibilitat: "1",
                ...(modeDialog === "edicio" && ({ categoria: "" }))
            }
        );
    };

    const handleChangeTab2 = (event, newValue) => {
        setValueTab2(newValue);
    };

    const handleMouseDown = (event) => {
        event.preventDefault();
    };

    const handleClickBotonsSup = (prop) => {
        const propToUpdate = prop === "visibilitat" ? "visibilitat" : "destacat";
        const newValue = valuesFormItem[propToUpdate] === "1" ? "0" : "1";
        setValuesFormItem({
            ...valuesFormItem,
            [propToUpdate]: newValue
        });
    };

    const processarDadesItem = (e) => {
        e.preventDefault();
        const objTabla = estemAPlats ? "plats" : "vins";
        const retornaItemsNum = (array, string) => {
            const index = array.indexOf(string);
            return index === -1 ? index : String(index);
        };
        const retornaItemsObjNum = (array, string) => {
            const index = array.findIndex(item => item.nom_ca === string);
            return index === -1 ? index : String(array[index].id);
        };
        const objDatos = {
            ...item,
            ...(modeDialog === 'edicio' && ({
                id: item.realId,
                categoria: valuesFormItem.categoria
            })),
            ...(estemAPlats && ({
                nom_ca: valuesFormItem.nom_ca,
                nom_es: valuesFormItem.nom_es,
                nom_en: valuesFormItem.nom_en,
                nom_fr: valuesFormItem.nom_fr,
                parada: valuesFormItem.parada[0] !== "No" ? valuesFormItem.parada.map(parada => (
                    retornaItemsObjNum(parades, parada))).join(",") : null,
                produccio: valuesFormItem.produccio[0] !== "No" ? valuesFormItem.produccio.map(prod => (
                    retornaItemsObjNum(produccio, prod))).join(",") : null,
                alergens: valuesFormItem.alergens.map(alergen => (
                    retornaItemsNum(alergens, alergen))).join(","),
                destacat: valuesFormItem.destacat
            })),
            ...(estemAVins && ({
                nom: valuesFormItem.nom,
                denominacio: valuesFormItem.denominacio,
                puntuacio_pr: valuesFormItem.puntuacio_pr,
                puntuacio_pe: valuesFormItem.puntuacio_pe,
                zona: valuesFormItem.zona === "No" ? null : valuesFormItem.zona
            })),
            descripcio_ca: valuesFormItem.descripcio_ca,
            descripcio_es: valuesFormItem.descripcio_es,
            descripcio_en: valuesFormItem.descripcio_en,
            descripcio_fr: valuesFormItem.descripcio_fr,
            imatge: valuesFormItem.imatge,
            preu: valuesFormItem.preu,
            visibilitat: valuesFormItem.visibilitat,
            modificat: new Date(),
            usuari
        };
        modeDialog === 'creacio' ? revisarRegistresCreacio(objTabla, replaceSingleQuotes(objDatos)) : revisarRegistresEdicio(objTabla, replaceSingleQuotes(objDatos));
    };

    const revisarRegistresEdicio = (objTabla, objDatos) => {
        const objDestacat = !estemAPlats || (objDatos.visibilitat === "1" && objDatos.destacat === "1") ? { estado: "si", ordre: itemsActivosDestacats + 1 } : { estado: "no", ordre: null };
        const sameVisibilityAndCategory = objDatos.visibilitat === item.visibilitat && objDatos.categoria === item.categoria;
        if (sameVisibilityAndCategory) {
            dispatch(actualizarItem(objTabla, objDatos, objDestacat));
        } else {
            if (objDatos.categoria !== item.categoria) {
                //objDatos.ordre = 0;
                objDatos.visibilitat = "0";
            } else {
                //objDatos.ordre = objDatos.visibilitat === "1" ? itemsActivosCat + 1 : 0;
            };
            dispatch(actualizarItem(objTabla, objDatos, objDestacat));
            //dispatch(actualizarItemReordenar(objTabla, objDatos, objDestacat));
        };
        handleCloseDialogItem();
    };

    const revisarRegistresCreacio = (objTabla, objDatos) => {
        const keysToCheck = estemAPlats ?
            ['nom_ca', 'nom_es', 'nom_en', 'nom_fr', 'descripcio_ca', 'descripcio_es', 'descripcio_en', 'descripcio_fr', 'imatge', 'preu'] :
            ['nom', 'denominacio', 'descripcio_ca', 'descripcio_es', 'descripcio_en', 'descripcio_fr', 'imatge', 'preu'];
        if (!keysToCheck.every(key => objDatos[key])) {
            dispatch(setAlertaAccion({
                abierto: true,
                mensaje: "Falten dades per omplir revisa el formulari.",
                tipo: 'error',
                posicio: 'esquerra'
            }));
            return;
        };
        objDatos.categoria = valueTab + 1;
        //objDatos.ordre = objDatos.visibilitat === "1" ? itemsActivosCat + 1 : 0;
        objDatos.ordre = itemsActivosCat + 1;
        objDatos.carta = cartaGeneral.tipus;
        const objDestacat = !estemAPlats || (objDatos.visibilitat === "1" && objDatos.destacat === "1") ? { estado: "si", ordre: itemsActivosDestacats + 1 } : { estado: "no", ordre: null };
        dispatch(registrarItem(objTabla, objDatos, objDestacat));
        handleCloseDialogItem();
    };

    if (!valuesFormItem) {
        return null
    };

    return (
        <Box>
            <Dialog
                open={Boolean(openDialog === "item")}
                onClose={handleCloseDialogItem}
                fullWidth
                maxWidth="lg"
            >
                <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <DialogTitle>
                        {modeDialog === 'creacio' ? "Crear registre" : `Editar registre: ${index + 1}`}
                    </DialogTitle>
                    <Stack direction="row" alignItems="center">
                        <Box>
                            {estemAPlats && (
                                <>
                                    <Chip variant="outlined" size="small" label={valuesFormItem.destacat === "1" ? "Destacat" : "No Destacat"} />
                                    <IconButton
                                        style={{ marginRight: '10px', marginLeft: '5px' }}
                                        onClick={() => handleClickBotonsSup('destacat')}
                                        onMouseDown={handleMouseDown}
                                        disabled={Boolean(valuesFormItem.visibilitat === "0")}
                                    >
                                        {valuesFormItem.destacat === "1" ? <AutoFixNormal /> : <AutoFixOff />}
                                    </IconButton>
                                </>
                            )}
                        </Box>
                        <Box>
                            <Chip variant="outlined" size="small" label={valuesFormItem.visibilitat === "1" ? "Visible a la carta" : "No Visible a la carta"} />
                            <IconButton
                                style={{ marginRight: '15px', marginLeft: '5px' }}
                                onClick={() => handleClickBotonsSup('visibilitat')}
                                onMouseDown={handleMouseDown}
                            >
                                {valuesFormItem.visibilitat === "1" ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </Box>
                    </Stack>
                </Box>
                <DialogContent>
                    <form onSubmit={processarDadesItem}>
                        <AppBar position="static" sx={{ marginTop: -2 }} color={cartaGeneral?.tipus === "nadal" ? "custom" : "primary"}>
                            <Tabs
                                value={valueTab2}
                                onChange={handleChangeTab2}
                                orientation={orientacioTabs(esDesktop)}
                                indicatorColor="secondary"
                                textColor="inherit"
                            >
                                <Tab label="Ca" {...a11yProps(0)} />
                                <Tab label="Es" {...a11yProps(1)} />
                                <Tab label="En" {...a11yProps(2)} />
                                <Tab label="Fr" {...a11yProps(3)} />
                            </Tabs>
                        </AppBar>
                        {estemAPlats && (
                            <DialogItemFormPlats
                                valueTab={valueTab}
                                valueTab2={valueTab2}
                                valuesFormItem={valuesFormItem}
                                setValuesFormItem={setValuesFormItem}
                            />
                        )}
                        {estemAVins && (
                            <DialogItemFormVins
                                valueTab={valueTab}
                                valueTab2={valueTab2}
                                valuesFormItem={valuesFormItem}
                                setValuesFormItem={setValuesFormItem}
                                categoria={categoria}
                            />
                        )}
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
                            {modeDialog === 'edicio' ? "Actualitzar" : "Registrar"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog >
        </Box >
    )
}

export default DialogItem
