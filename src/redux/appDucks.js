import axios from 'axios';
import Constantes from "../constantes";

//constantes
const rutaApi = Constantes.RUTA_API;

const dataInicial = {
    loadingApp: false,
    laDataCarta: null,
    laDataVins: null,
    titolsCarta: null,
    titolsVins: null,
    produccio: null,
    parades: null,
    zones: null,
    cartaGeneral: null,
    onEstem: null,
    alerta: {
        abierto: false,
        mensaje: '',
        tipo: '',
        posicio: ''
    },
    errorDeCarga: false,
    openDialog: null,
    actualitzarTitolExito: false,
    actualitzarItemExito: false,
    registrarItemExito: false,
    eliminarItemExito: false,
    actualitzarPrincipalExito: false,
    ordenarItemsExito: false,
    canviCartaExito: false,
    openMedis: { estado: false, dir: null },
    imatges: null,
    imatgePujadaExit: false,
    imatgeEsborradaExit: false,
    customDialog: {
        abierto: false,
        titulo: "",
        mensaje: "",
        funcionSi: null
    },
    imatgeSeleccionada: null,
    modeDialog: null,
    itemEditar: null,
    ultimaIntervencion: null,
    itemsActivosCat: null,
    intervencioRegistre: false,
    itemsActivosDestacats: null,
};

//types
const LOADING_APP = 'LOADING_APP';
const OBTENER_COMPTES_EXITO = 'OBTENER_COMPTES_EXITO';
const ERROR_DE_CARGA = 'ERROR_DE_CARGA';
const ACTUALIZAR_TITOL_EXITO = 'ACTUALIZAR_TITOL_EXITO';
const ACTUALIZAR_ITEM_EXITO = 'ACTUALIZAR_ITEM_EXITO';
const REGISTRAR_ITEM_EXITO = 'REGISTRAR_ITEM_EXITO';
const ELIMINAR_ITEM_EXITO = 'ELIMINAR_ITEM_EXITO';
const ACTUALIZAR_PRINCIPAL_EXITO = 'ACTUALIZAR_PRINCIPAL_EXITO';
const ORDENAR_ITEMS_EXITO = 'ORDENAR_ITEMS_EXITO';
const CANVI_CARTA_EXITO = 'CANVI_CARTA_EXITO';
const RESETEA_EXITO = 'RESETEA_EXITO';
const SET_ONESTEM = 'SET_ONESTEM';
const SET_ALERTA = 'SET_ALERTA';
const SET_LADATACARTA = "SET_LADATACARTA";
const SET_LADATAVINS = "SET_LADATAVINS";
const SET_TITOLSCARTA = "SET_TITOLSCARTA";
const SET_TITOLSVINS = "SET_TITOLSVINS";
const SET_PRODUCCIO = "SET_PRODUCCIO";
const SET_PARADES = "SET_PARADES";
const SET_ZONES = "SET_ZONES";
const SET_OPENLOADING = "SET_OPENLOADING";
const SET_OPENDIALOG = "SET_OPENDIALOG";
const SET_OPENMEDIS = "SET_OPENMEDIS";
const SET_IMATGES = "SET_IMATGES";
const IMATGE_PUJADA_EXIT = "IMATGE_PUJADA_EXIT";
const SET_CUSTOMDIALOG = "SET_CUSTOMDIALOG";
const IMATGE_ESBORRADA_EXIT = "IMATGE_ESBORRADA_EXIT";
const SET_IMATGESELECCIONADA = "SET_IMATGESELECCIONADA";
const SET_CARTAGENERAL = "SET_CARTAGENERAL";
const SET_MODEDIALOG = "SET_MODEDIALOG";
const SET_ITEMEDITAR = "SET_ITEMEDITAR";
const SET_ULTIMAINTERVENCION = "SET_ULTIMAINTERVENCION";
const SET_ITEMSACTIVOSCAT = "SET_ITEMSACTIVOSCAT";
const SET_INTERVENCIOREGISTRE = "SET_INTERVENCIOREGISTRE";
const SET_ITEMSACTIVOSDESTACATS = "SET_ITEMSACTIVOSDESTACATS";

//reducer
export default function appReducer(state = dataInicial, action) {
    switch (action.type) {
        case LOADING_APP:
            return { ...state, loadingApp: action.payload }
        case OBTENER_COMPTES_EXITO:
            return { ...state, arrayComptes: action.payload.array, errorDeCargaComptes: action.payload.errorDeCargaComptes, loadingApp: false }
        case ERROR_DE_CARGA:
            return { ...state, errorDeCarga: true, loadingApp: false }
        case ACTUALIZAR_TITOL_EXITO:
            return { ...state, actualitzarTitolExito: true }
        case ACTUALIZAR_ITEM_EXITO:
            return { ...state, actualitzarItemExito: true }
        case REGISTRAR_ITEM_EXITO:
            return { ...state, registrarItemExito: true }
        case ELIMINAR_ITEM_EXITO:
            return { ...state, eliminarItemExito: true }
        case ACTUALIZAR_PRINCIPAL_EXITO:
            return { ...state, actualitzarPrincipalExito: true }
        case ORDENAR_ITEMS_EXITO:
            return { ...state, ordenarItemsExito: true }
        case CANVI_CARTA_EXITO:
            return { ...state, canviCartaExito: true }
        case RESETEA_EXITO:
            return {
                ...state,
                actualitzarTitolExito: false,
                actualitzarItemExito: false,
                imatgePujadaExit: false,
                imatgeEsborradaExit: false,
                actualitzarPrincipalExito: false,
                registrarItemExito: false,
                eliminarItemExito: false,
                ordenarItemsExito: false,
                canviCartaExito: false,
            }
        case SET_ONESTEM:
            return { ...state, onEstem: action.payload.valor }
        case SET_ALERTA:
            return { ...state, alerta: action.payload }
        case SET_LADATACARTA:
            return { ...state, laDataCarta: action.payload }
        case SET_LADATAVINS:
            return { ...state, laDataVins: action.payload }
        case SET_TITOLSCARTA:
            return { ...state, titolsCarta: action.payload }
        case SET_TITOLSVINS:
            return { ...state, titolsVins: action.payload }
        case SET_PRODUCCIO:
            return { ...state, produccio: action.payload }
        case SET_PARADES:
            return { ...state, parades: action.payload }
        case SET_ZONES:
            return { ...state, zones: action.payload }
        case SET_OPENLOADING:
            return { ...state, loadingApp: action.payload.valor }
        case SET_OPENDIALOG:
            return { ...state, openDialog: action.payload }
        case SET_OPENMEDIS:
            return { ...state, openMedis: action.payload }
        case SET_IMATGES:
            return { ...state, imatges: action.payload }
        case IMATGE_PUJADA_EXIT:
            return { ...state, imatgePujadaExit: true }
        case IMATGE_ESBORRADA_EXIT:
            return { ...state, imatgeEsborradaExit: true }
        case SET_CUSTOMDIALOG:
            return { ...state, customDialog: action.payload.objeto }
        case SET_IMATGESELECCIONADA:
            return { ...state, imatgeSeleccionada: action.payload }
        case SET_CARTAGENERAL:
            return { ...state, cartaGeneral: action.payload }
        case SET_MODEDIALOG:
            return { ...state, modeDialog: action.payload }
        case SET_ITEMEDITAR:
            return { ...state, itemEditar: action.payload }
        case SET_ULTIMAINTERVENCION:
            return { ...state, ultimaIntervencion: action.payload }
        case SET_ITEMSACTIVOSCAT:
            return { ...state, itemsActivosCat: action.payload }
        case SET_INTERVENCIOREGISTRE:
            return { ...state, intervencioRegistre: action.payload }
        case SET_ITEMSACTIVOSDESTACATS:
            return { ...state, itemsActivosDestacats: action.payload }
        default:
            return { ...state }
    }
}

//acciones

const gestionaRutaServer = (ruta) => {
    const searchStr = "/images";
    const startIndex = ruta.indexOf(searchStr);
    const newDir = ruta.substr(startIndex).replace(/^\//, '');
    return newDir
};

const determinaRutaServer = (configDir) => {
    let ruta;
    if (configDir.format === "parades") {
        ruta = 'images/parades/'
    } else if (configDir.format === "produccio") {
        ruta = 'images/produccio/'
    } else if (configDir.format === "zones") {
        ruta = 'images/zones/'
    } else {
        ruta = configDir.carta === 'normal'
            ? configDir.tipus === 'plats'
                ? configDir.format === 'normal'
                    ? 'images/plats_imatges/'
                    : 'images/header_plats/carta/'
                : configDir.format === 'normal'
                    ? 'images/vins_imatges/'
                    : 'images/header_vins/carta/'
            : configDir.tipus === 'plats'
                ? configDir.format === 'normal'
                    ? 'images/plats_imatges/'
                    : 'images/header_plats/nadal/'
                : configDir.format === 'normal'
                    ? 'images/vins_imatges/'
                    : 'images/header_vins/nadal/';
    };
    return ruta
};

export const obtenerDatosInicial = (tipo) => async (dispatch, getState) => {
    const { cartaGeneral } = getState().variablesApp;
    dispatch({ type: LOADING_APP, payload: true });
    try {
        const formData1 = new FormData();
        const formData2 = new FormData();
        const formData3 = new FormData();
        const formData4 = new FormData();
        const carta = cartaGeneral?.tipus || (await obtenerCartaInicial(formData1));
        formData1.append("carta", carta);
        formData1.append("tipo", tipo);
        formData2.append("objeto", "produccio");
        formData3.append("objeto", "parades");
        formData4.append("objeto", "zones");
        const [items, titols, produccio, parades, zones] = await Promise.all([
            obtenerCarta(formData1),
            obtenerTitulos(formData1),
            tipo === "plats" ? obtenerProduccio(formData2) : null,
            tipo === "plats" ? obtenerParades(formData3) : null,
            tipo === "vins" ? obtenerZones(formData4) : null
        ]);
        switch (tipo) {
            case "plats":
                dispatch({ type: SET_LADATACARTA, payload: items });
                dispatch({ type: SET_TITOLSCARTA, payload: titols });
                dispatch({
                    type: SET_PRODUCCIO,
                    payload: produccio.map(prod => ({
                        ...prod,
                        imatges: JSON.parse(prod.imatges)
                    }))
                });
                dispatch({
                    type: SET_PARADES,
                    payload: parades.map(parada => ({
                        ...parada,
                        imatges: JSON.parse(parada.imatges)
                    }))
                });
                break;
            case "vins":
                dispatch({ type: SET_LADATAVINS, payload: items });
                dispatch({ type: SET_TITOLSVINS, payload: titols });
                dispatch({ type: SET_ZONES, payload: zones });
                break;
            default:
                break;
        };
        dispatch({ type: LOADING_APP, payload: false });
    } catch (error) {
        dispatch({ type: ERROR_DE_CARGA });
    };
    async function obtenerCartaInicial(formData) {
        const res = await axios.post(rutaApi + "obtener_carta_inicial.php", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        dispatch({
            type: SET_CARTAGENERAL,
            payload: res.data,
        });
        return res.data.tipus;
    };
    async function obtenerCarta(formData) {
        const { data } = await axios.post(rutaApi + "obtener_carta.php", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return data;
    };
    async function obtenerTitulos(formData) {
        const { data } = await axios.post(rutaApi + "obtener_titols.php", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return data;
    };
    async function obtenerProduccio(formData) {
        const { data } = await axios.post(rutaApi + "obtener_editable.php", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return data;
    };
    async function obtenerParades(formData) {
        const { data } = await axios.post(rutaApi + "obtener_editable.php", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return data;
    };
    async function obtenerZones(formData) {
        const { data } = await axios.post(rutaApi + "obtener_editable.php", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return data;
    };
};

export const canviCarta = (carta) => async (dispatch, getState) => {
    try {
        const formData = new FormData();
        formData.append("carta", carta);
        let apiUrl = rutaApi + "canvi_carta.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        if (res.data) {
            dispatch({
                type: CANVI_CARTA_EXITO
            });
            dispatch(ultimaIntervencion());
            return { payload: true }
        };
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA
        })
    }
};

export const actualizarTitol = (objeto, datos) => async (dispatch, getState) => {
    dispatch({ type: LOADING_APP, payload: true });
    try {
        const losDatos = JSON.stringify(datos);
        const formData = new FormData();
        formData.append("objeto", objeto);
        formData.append("id", datos.id);
        formData.append("datos", losDatos);
        let apiUrl = rutaApi + "actualizar.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        if (res.data) {
            dispatch({
                type: ACTUALIZAR_TITOL_EXITO
            });
            if (res.data[0].tipus === "plats") {
                dispatch({ type: SET_TITOLSCARTA, payload: res.data });
            } else {
                dispatch({ type: SET_TITOLSVINS, payload: res.data });
            };
            dispatch(ultimaIntervencion());
            dispatch({ type: LOADING_APP, payload: false });
        };
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA
        })
    }
};

export const actualizarPrincipal = (objeto, datos) => async (dispatch, getState) => {
    dispatch({ type: LOADING_APP, payload: true });
    try {
        const losDatos = JSON.stringify(datos);
        const formData = new FormData();
        formData.append("objeto", objeto);
        formData.append("id", datos.id);
        formData.append("datos", losDatos);
        let apiUrl = rutaApi + "actualizar.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        if (res.data) {
            dispatch({
                type: ACTUALIZAR_PRINCIPAL_EXITO
            });
            dispatch({
                type: SET_CARTAGENERAL,
                payload: res.data,
            });
            dispatch(ultimaIntervencion());
            dispatch({ type: LOADING_APP, payload: false });
        };
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA
        })
    }
};

export const actualizarItem = (objeto, datos, objDestacat) => async (dispatch, getState) => {
    dispatch({ type: LOADING_APP, payload: true });
    try {
        const losDatos = JSON.stringify(datos);
        const destacat = JSON.stringify(objDestacat);
        const formData = new FormData();
        formData.append("objeto", objeto);
        formData.append("id", datos.id);
        formData.append("destacat", destacat);
        formData.append("datos", losDatos);
        let apiUrl = rutaApi + "actualizar.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        if (res.data) {
            dispatch({
                type: ACTUALIZAR_ITEM_EXITO
            });
            if (objeto === "plats") {
                dispatch({ type: SET_LADATACARTA, payload: res.data });
            } else {
                dispatch({ type: SET_LADATAVINS, payload: res.data });
            };
            dispatch(ultimaIntervencion());
            dispatch({ type: LOADING_APP, payload: false });
        };
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA
        })
    }
};

const reordenarArrCat = (array) => {
    const filtrado = array.filter(item => item.ordre > 0);
    filtrado.sort((a, b) => a.ordre - b.ordre);
    filtrado.forEach((item, i) => {
        item.ordre = i + 1;
    });
    const result = array.map(item => {
        const index = filtrado.findIndex(i => i === item);
        if (index !== -1) {
            return filtrado[index];
        }
        return item;
    });
    return result;
};

export const actualizarItemReordenar = (objeto, datos, objDestacat) => async (dispatch, getState) => {
    dispatch({ type: LOADING_APP, payload: true });
    try {
        const losDatos = JSON.stringify(datos);
        const destacat = JSON.stringify(objDestacat);
        const formData1 = new FormData();
        formData1.append("objeto", objeto);
        formData1.append("id", datos.id);
        formData1.append("destacat", destacat);
        formData1.append("datos", losDatos);
        const apiUrl = rutaApi + "actualizar_reordenar.php";
        const res1 = await axios.post(apiUrl, formData1, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        if (res1.data) {
            const arrReordenado = reordenarArrCat(res1.data);
            const losDatosOrdenados = JSON.stringify({ arrReordenado });
            const formData2 = new FormData();
            formData2.append("objeto", objeto);
            formData2.append("datos", losDatosOrdenados);
            formData2.append("carta", datos.carta);
            const apiUrl2 = rutaApi + "actualizar_categoria.php";
            const res2 = await axios.post(apiUrl2, formData2, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            if (res2.data) {
                dispatch({
                    type: ACTUALIZAR_ITEM_EXITO
                });
                if (objeto === "plats") {
                    dispatch({ type: SET_LADATACARTA, payload: res2.data });
                } else {
                    dispatch({ type: SET_LADATAVINS, payload: res2.data });
                };
                dispatch(ultimaIntervencion());
                dispatch({ type: LOADING_APP, payload: false });
            };
        };
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA
        })
    }
};

export const actualizarCategoria = (objeto, datos, carta) => async (dispatch, getState) => {
    dispatch({ type: LOADING_APP, payload: true });
    try {
        const losDatosOrdenados = JSON.stringify({ arrReordenado: datos });
        const formData = new FormData();
        formData.append("objeto", objeto);
        formData.append("datos", losDatosOrdenados);
        formData.append("carta", carta);
        const apiUrl = rutaApi + "actualizar_categoria.php";
        const res = await axios.post(apiUrl, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        if (res.data) {
            dispatch({
                type: ORDENAR_ITEMS_EXITO
            });
            if (objeto === "plats") {
                dispatch({ type: SET_LADATACARTA, payload: res.data });
            } else if (objeto === "vins") {
                dispatch({ type: SET_LADATAVINS, payload: res.data });
            } else {
                dispatch({ type: SET_ZONES, payload: res.data });
            };
            dispatch(ultimaIntervencion());
            dispatch({ type: LOADING_APP, payload: false });
        };
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA
        })
    }
};

export const registrarItem = (objeto, datos, objDestacat) => async (dispatch, getState) => {
    dispatch({ type: LOADING_APP, payload: true });
    try {
        const losDatos = JSON.stringify(datos);
        const destacat = JSON.stringify(objDestacat);
        const formData = new FormData();
        formData.append("objeto", objeto);
        formData.append("datos", losDatos);
        formData.append("destacat", destacat);
        let apiUrl = rutaApi + "registrar.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        if (res.data) {
            dispatch({
                type: REGISTRAR_ITEM_EXITO
            });
            if (objeto === "plats") {
                dispatch({ type: SET_LADATACARTA, payload: res.data });
            } else {
                dispatch({ type: SET_LADATAVINS, payload: res.data });
            };
            dispatch(ultimaIntervencion());
            dispatch({ type: LOADING_APP, payload: false });
        };
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA
        })
    }
};

export const eliminarItem = (objeto, carta, id, nom, categoria) => async (dispatch, getState) => {
    dispatch({ type: LOADING_APP, payload: true });
    try {
        const formData = new FormData();
        formData.append("objeto", objeto);
        formData.append("carta", carta);
        formData.append("id", id);
        formData.append("nom", nom);
        let apiUrl = rutaApi + "eliminar.php";
        const res1 = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        if (res1.data) {            
            const arrayFiltrado = res1.data.filter(obj => obj.categoria === categoria);            
            const arrReordenado = reordenarArrCat(arrayFiltrado);           
            const losDatosOrdenados = JSON.stringify({ arrReordenado });
            const formData2 = new FormData();
            formData2.append("objeto", objeto);
            formData2.append("datos", losDatosOrdenados);
            formData2.append("carta", carta);
            const apiUrl2 = rutaApi + "actualizar_categoria.php";
            const res2 = await axios.post(apiUrl2, formData2, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            if (res2.data) {
                dispatch({
                    type: ACTUALIZAR_ITEM_EXITO
                });
                if (objeto === "plats") {
                    dispatch({ type: SET_LADATACARTA, payload: res2.data });
                } else {
                    dispatch({ type: SET_LADATAVINS, payload: res2.data });
                };
                dispatch(ultimaIntervencion());
                dispatch({ type: LOADING_APP, payload: false });
            };
        };
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA
        })
    }
};

export const registrarEditable = (objeto, datos) => async (dispatch, getState) => {
    dispatch({ type: LOADING_APP, payload: true });
    try {
        const losDatos = JSON.stringify(datos);
        const formData = new FormData();
        formData.append("objeto", objeto);
        formData.append("datos", losDatos);
        let apiUrl = rutaApi + "registrar.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        if (res.data) {
            dispatch({
                type: REGISTRAR_ITEM_EXITO
            });
            const actionsMap = {
                produccio: SET_PRODUCCIO,
                parades: SET_PARADES
            };
            const actionType = actionsMap[objeto];
            dispatch({
                type: actionType,
                payload: res.data.map(item => ({
                    ...item,
                    imatges: JSON.parse(item.imatges)
                }))
            });
            dispatch(ultimaIntervencion());
            dispatch({ type: LOADING_APP, payload: false });
        };
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA
        })
    }
};

export const registrarZona = (datos) => async (dispatch, getState) => {
    dispatch({ type: LOADING_APP, payload: true });
    try {
        const losDatos = JSON.stringify(datos);
        const formData = new FormData();
        formData.append("objeto", "zones");
        formData.append("datos", losDatos);
        let apiUrl = rutaApi + "registrar.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        if (res.data) {
            dispatch({
                type: REGISTRAR_ITEM_EXITO
            });
            dispatch({
                type: SET_ZONES,
                payload: res.data
            });
            dispatch(ultimaIntervencion());
            dispatch({ type: LOADING_APP, payload: false });
        };
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA
        })
    }
};

export const actualitzarEditable = (objeto, datos) => async (dispatch, getState) => {
    dispatch({ type: LOADING_APP, payload: true });
    try {
        const losDatos = JSON.stringify(datos);
        const formData = new FormData();
        formData.append("objeto", objeto);
        formData.append("id", datos.id);
        formData.append("datos", losDatos);
        let apiUrl = rutaApi + "actualizar.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        if (res.data) {
            dispatch({
                type: ACTUALIZAR_ITEM_EXITO
            });
            const actionsMap = {
                produccio: SET_PRODUCCIO,
                parades: SET_PARADES
            };
            const actionType = actionsMap[objeto];
            dispatch({
                type: actionType,
                payload: res.data.map(item => ({
                    ...item,
                    imatges: JSON.parse(item.imatges)
                }))
            });
            dispatch(ultimaIntervencion());
            dispatch({ type: LOADING_APP, payload: false });
        };
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA
        })
    };
};

export const actualitzarZona = (datos) => async (dispatch, getState) => {
    dispatch({ type: LOADING_APP, payload: true });  
    try {
        const losDatos = JSON.stringify(datos);
        const formData = new FormData();
        formData.append("objeto", "zones");
        formData.append("id", datos.id);
        formData.append("datos", losDatos);
        let apiUrl = rutaApi + "actualizar.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        if (res.data) {
            dispatch({
                type: ACTUALIZAR_ITEM_EXITO
            });
            dispatch({
                type: SET_ZONES,
                payload: res.data
            });
            dispatch(ultimaIntervencion());
            dispatch({ type: LOADING_APP, payload: false });
        };
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA
        })
    };
};

export const eliminarEditable = (objeto, id) => async (dispatch, getState) => {
    dispatch({ type: LOADING_APP, payload: true });
    try {
        const formData = new FormData();
        formData.append("objeto", objeto);
        formData.append("id", id);
        let apiUrl = rutaApi + "eliminar.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        if (res.data) {
            dispatch({
                type: ELIMINAR_ITEM_EXITO
            });
            const actionsMap = {
                produccio: SET_PRODUCCIO,
                parades: SET_PARADES,
                zones: SET_ZONES
            };
            const actionType = actionsMap[objeto];
            dispatch({
                type: actionType,
                payload: objeto === "zones" ? res.data : res.data.map(item => ({
                    ...item,
                    imatges: JSON.parse(item.imatges)
                }))
            });
            dispatch(ultimaIntervencion());
            dispatch({ type: LOADING_APP, payload: false });
        };
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA
        })
    }
};

export const obtenerImatges = (dir) => async (dispatch, getState) => {
    dispatch({ type: LOADING_APP, payload: true });
    try {
        const formData = new FormData();
        //la ruta ha de ser absoluta        
        const newDir = gestionaRutaServer(dir);
        formData.append("directori", newDir);
        let apiUrl = rutaApi + "obtener_imagenes_medis.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        if (res) {
            dispatch({ type: SET_IMATGES, payload: res.data });
            dispatch({ type: LOADING_APP, payload: false });
        };
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA
        })
    };
};

const cambiarNombreArchivo = (file, nuevoNombre) => {
    const blobModificado = new Blob([file], { type: file.type });
    const archivoModificado = new File([blobModificado], nuevoNombre, { lastModified: file.lastModified, type: file.type });
    return archivoModificado;
};

export const uploadImatge = (file, configDir) => async (dispatch, getState) => {
    dispatch({ type: LOADING_APP, payload: true });
    try {
        const nomSanitize = file.name.replace(/\s+/g, "_");
        const fileSanitize = cambiarNombreArchivo(file, nomSanitize);
        const ruta = determinaRutaServer(configDir);
        const esHeader = configDir.format === 'header' ? "si" : "no";
        const esEditable = configDir.format === 'produccio' || configDir.format === 'parades' || configDir.format === 'zones' ? "si" : "no";
        const formData = new FormData();
        formData.append("file", fileSanitize);
        formData.append("ruta", ruta);
        formData.append("header", esHeader);
        formData.append("editable", esEditable);
        let apiUrl = rutaApi + "upload.php";
        const resUpload = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        if (resUpload.status === 200) {
            const imagesUrl = rutaApi + "obtener_imagenes_medis.php";
            const resImages = await axios.post(imagesUrl, { directori: ruta }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            if (resImages) {
                dispatch({ type: SET_IMATGES, payload: resImages.data });
                dispatch({ type: LOADING_APP, payload: false });
                dispatch({ type: IMATGE_PUJADA_EXIT });
                dispatch(ultimaIntervencion());
            };
        };
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA
        })
    };
};

export const eliminarImatge = (rutaImatge, configDir) => async (dispatch, getState) => {
    dispatch({ type: LOADING_APP, payload: true });
    try {
        const formData = new FormData();
        //la ruta ha de ser absoluta          
        const newDir = gestionaRutaServer(rutaImatge);
        const esHeader = configDir.format === 'header' ? "si" : "no";
        const esEditable = configDir.format === 'produccio' || configDir.format === 'parades' || configDir.format === 'zones' ? "si" : "no";
        const newDirThumb = (esHeader === "no" && esEditable === "no")
            ? newDir.replace(/images\/(plats_imatges|vins_imatges)\//, "images/$1/thumbnails/")
            : "no";
        formData.append("imatge", newDir);
        formData.append("thumb", newDirThumb);
        let apiUrl = rutaApi + "eliminar_imatge.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        if (res.data === "OK") {
            const ruta = determinaRutaServer(configDir);
            const imagesUrl = rutaApi + "obtener_imagenes_medis.php";
            const resImages = await axios.post(imagesUrl, { directori: ruta }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            if (resImages) {
                dispatch({ type: SET_IMATGES, payload: resImages.data });
                dispatch({ type: LOADING_APP, payload: false });
                dispatch({ type: IMATGE_ESBORRADA_EXIT });
                dispatch(ultimaIntervencion());
            };
        };
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA
        })
    }
};

export const ultimaIntervencion = () => async (dispatch, getState) => {
    const usuari = getState().variablesUsuario.usuarioActivo.nombre;
    const fecha = new Date();
    try {
        const losDatos = JSON.stringify({ usuari, fecha });
        const formData = new FormData();
        formData.append("datos", losDatos);
        let apiUrl = rutaApi + "ultima_intervencion.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        if (res.data) {
            dispatch({
                type: SET_ULTIMAINTERVENCION,
                payload: res.data
            });
            dispatch({
                type: SET_INTERVENCIOREGISTRE,
                payload: true
            });
        };
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA
        })
    }
};

export const setOpenMedis = (obj) => (dispatch, getState) => {
    dispatch({
        type: SET_OPENMEDIS,
        payload: obj
    });
};

export const setOpenDialog = (valor) => (dispatch, getState) => {
    dispatch({
        type: SET_OPENDIALOG,
        payload: valor
    });
};

export const setModeDialog = (valor) => (dispatch, getState) => {
    dispatch({
        type: SET_MODEDIALOG,
        payload: valor
    });
};

export const setOpenLoading = (valor) => (dispatch, getState) => {
    dispatch({
        type: SET_OPENLOADING,
        payload: {
            valor
        }
    });
};

export const setAlertaAccion = (objeto) => (dispatch, getState) => {
    dispatch({
        type: SET_ALERTA,
        payload: objeto
    });
};

export const setOnEstemAccion = (valor) => (dispatch, getState) => {
    dispatch({
        type: SET_ONESTEM,
        payload: {
            valor: valor
        }
    });
};

export const setLaDataCarta = (valor) => (dispatch, getState) => {
    dispatch({
        type: SET_LADATACARTA,
        payload: valor
    });
};

export const setLaDataVins = (valor) => (dispatch, getState) => {
    dispatch({
        type: SET_LADATAVINS,
        payload: valor
    });
};

export const setTitolsCarta = (array) => (dispatch, getState) => {
    dispatch({
        type: SET_TITOLSCARTA,
        payload: array
    });
};

export const setTitolsVins = (array) => (dispatch, getState) => {
    dispatch({
        type: SET_TITOLSVINS,
        payload: array
    });
};

export const reseteaExitoAccion = () => (dispatch, getState) => {
    dispatch({
        type: RESETEA_EXITO
    });
};

export const setCustomDialog = (objeto) => (dispatch, getState) => {
    dispatch({
        type: SET_CUSTOMDIALOG,
        payload: {
            objeto: objeto
        }
    });
};

export const setImatgeSeleccionada = (imatge) => (dispatch, getState) => {
    dispatch({
        type: SET_IMATGESELECCIONADA,
        payload: imatge
    });
};

export const setImatges = (valor) => (dispatch, getState) => {
    dispatch({
        type: SET_IMATGES,
        payload: valor
    });
    return new Promise((resolve, reject) => {
        resolve({ payload: true });
    });
};

export const setCartaGeneral = (objeto) => (dispatch, getState) => {
    dispatch({
        type: SET_CARTAGENERAL,
        payload: objeto
    });
};

export const setItemEditar = (objeto) => (dispatch, getState) => {
    dispatch({
        type: SET_ITEMEDITAR,
        payload: objeto
    });
};

export const setItemsActivosCat = (num) => (dispatch, getState) => {
    dispatch({
        type: SET_ITEMSACTIVOSCAT,
        payload: num
    });
};

export const setItemsActivoDestacats = (num) => (dispatch, getState) => {
    dispatch({
        type: SET_ITEMSACTIVOSDESTACATS,
        payload: num
    });
};

export const resetIIntervencioRegistre = () => (dispatch, getState) => {
    dispatch({
        type: SET_INTERVENCIOREGISTRE,
        payload: false
    });
};

export const resetApp = () => (dispatch, getState) => {
    const actions = [
        { type: SET_LADATACARTA, payload: null },
        { type: SET_LADATAVINS, payload: null },
        { type: SET_TITOLSCARTA, payload: null },
        { type: SET_TITOLSCARTA, payload: null },
        { type: SET_PRODUCCIO, payload: null },
        { type: SET_PARADES, payload: null },
        { type: SET_ZONES, payload: null },
        { type: SET_OPENMEDIS, payload: { estado: false, dir: null } },
        { type: SET_OPENDIALOG, payload: null },
        { type: SET_IMATGES, payload: null },
        {
            type: SET_CUSTOMDIALOG,
            payload: { objeto: { abierto: false, titulo: "", mensaje: "", funcionSi: null } }
        },
        { type: SET_IMATGESELECCIONADA, payload: null },
        { type: SET_CARTAGENERAL, payload: null },
        { type: SET_MODEDIALOG, payload: null },
        { type: SET_ITEMEDITAR, payload: null },
        { type: SET_ULTIMAINTERVENCION, payload: null },
        { type: SET_ITEMSACTIVOSCAT, payload: null },
        { type: SET_INTERVENCIOREGISTRE, payload: false },
        { type: SET_ITEMSACTIVOSDESTACATS, payload: null },
        { type: RESETEA_EXITO }
    ];
    actions.forEach(action => dispatch(action));
};