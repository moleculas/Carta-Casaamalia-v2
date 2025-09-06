import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import Constantes from "../constantes";
import clsx from 'clsx';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
    Collapse,
    IconButton,
    Tooltip,
    Typography
} from '@mui/material';
import {
    ExpandMore as ExpandMoreIcon,
    Visibility,
    VisibilityOff,
    AutoFixNormal
} from '@mui/icons-material';
import { Draggable } from "react-beautiful-dnd";

//carga componentes
import Lightbox from './Lightbox';

//estilos
import Clases from "../clases";

//importacion acciones
import {
    setOpenDialog,
    setModeDialog,
    setItemEditar,
    eliminarItem,
    setCustomDialog,
} from '../redux/appDucks';

//constantes
const {
    RUTA_SERVER: rutaServer,
    ALERGENS: alergens
} = Constantes;

const Item = (props) => {
    const {
        item,
        index,
        estemAPlats,
        estemAVins,
        estemACocktails,
        valueTab,
        cartaGeneral,
        produccio,
        parades,
        zones,
        usuari,
        subcategoriesVins
    } = props;
    const classes = Clases();
    const dispatch = useDispatch();
    const [expandedId, setExpandedId] = useState(-1);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const rutaImatges = estemAPlats ? `${rutaServer}images/plats_imatges/` : estemAVins ? `${rutaServer}images/vins_imatges/` : `${rutaServer}images/cocktails_imatges/`;

    // Array de usuarios autorizados para acceder a Plats
    const usuariosAutorizados = ['admin', 'sergi', 'jordi', 'antonio', 'berta', 'josep', 'mariona', 'sergi_nadal', 'olga'];

    // Verificar si el usuario actual está autorizado
    const conPermisos = usuariosAutorizados.includes(usuari);

    //funciones

    const handleExpandClick = index => {
        setExpandedId(expandedId === index ? -1 : index);
    };

    const retornaPuntuacioParker = (valor) => {
        if (valor === '0') {
            return 'No'
        } else if (valor === '94_2') {
            return '94+ punts'
        } else {
            return valor + ' punts'
        };
    };

    return (
        <Draggable
            draggableId={String(item.id)}
            index={index}
            type="list"
        //isDragDisabled={item.visibilitat === "0" ? true : false}
        >
            {(provided, snapshot) => (
                <Card
                    className={snapshot.isDragging ? classes.dragItem : ""}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <div>
                        <Box className={classes.root1}
                            {...provided.dragHandleProps}
                        >
                            <Box style={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent style={{ flex: '1 0 auto' }}>
                                    <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <Avatar className={clsx(item.visibilitat === '1' ? classes.avtGreen : classes.avtRed)}>
                                            {index + 1}
                                        </Avatar>
                                        <Typography className={classes.paddLef} component="div" variant="h6">
                                            {estemAPlats ? item.nom_ca : item.nom}
                                        </Typography>
                                    </Box>
                                    <Box mt={2}>
                                        {estemAPlats ? (
                                            <Fragment>
                                                <Typography variant="body2" component="div">
                                                    {item.descripcio_ca}
                                                </Typography>
                                                <Typography variant="body1" component="div">
                                                    Preu: {item.preu}
                                                </Typography>
                                                <Typography variant="body1" component="div">
                                                    Parada: {item.parada !== null ? item.parada.split(",").map((parada) => parades.find((item) => item.id === Number(parada)).nom_ca).join(', ') : "No"}
                                                </Typography>
                                                <Typography variant="body1" component="div">
                                                    Producció: {item.produccio !== null ? item.produccio.split(",").map((prod) => produccio.find((item) => item.id === Number(prod)).nom_ca).join(', ') : "No"}
                                                </Typography>
                                                <Typography variant="body1" component="div">
                                                    Al·lèrgens: {item.alergens.split(",").map((alergen) => alergens[alergen]).join(', ')}
                                                </Typography>
                                            </Fragment>
                                        ) : estemAVins ? (
                                            <Fragment>
                                                <Typography variant="body1" component="div">
                                                    Denominació: {item.denominacio}
                                                </Typography>
                                                <Typography variant="body2" component="div">
                                                    {item.descripcio_ca}
                                                </Typography>
                                                <Typography variant="body1" component="div">
                                                    Preu: {item.preu}
                                                </Typography>
                                                <Typography variant="body1" component="div">
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        Subcategoria: {subcategoriesVins.find(subcat => subcat.id === item.subcategoria)?.nom_ca || "No"}
                                                        {item.subcategoria && subcategoriesVins.find(subcat => subcat.id === item.subcategoria) && (
                                                            <Box
                                                                sx={{
                                                                    width: 16,
                                                                    height: 16,
                                                                    borderRadius: '50%',
                                                                    backgroundColor: subcategoriesVins.find(subcat => subcat.id === item.subcategoria)?.color,
                                                                    marginLeft: 1,
                                                                    border: '1px solid rgba(0, 0, 0, 0.2)'
                                                                }}
                                                            />
                                                        )}
                                                    </Box>
                                                </Typography>
                                                {/* <Typography variant="body1" component="div">
                                                    Puntuació Parker: {retornaPuntuacioParker(item.puntuacio_pr)}
                                                </Typography>
                                                <Typography variant="body1" component="div">
                                                    Puntuació Peñín: {item.puntuacio_pe === '0' ? ('No') : (item.puntuacio_pe + ' punts')}
                                                </Typography> */}
                                                <Typography variant="body1" component="div">
                                                    Zona: {!item.zona ? ('No') : zones?.find((zona) => zona.id === Number(item.zona)).titol_ca}
                                                </Typography>
                                            </Fragment>
                                        ) : (
                                            <Fragment>
                                                <Typography variant="body2" component="div">
                                                    {item.descripcio_ca}
                                                </Typography>
                                                <Typography variant="body1" component="div">
                                                    Preu: {item.preu}
                                                </Typography>
                                            </Fragment>
                                        )}
                                    </Box>
                                </CardContent>
                            </Box>
                            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                {item?.destacat === '1' ? (
                                    <Chip style={{ marginTop: '10px', marginRight: '5px' }} avatar={<Avatar><AutoFixNormal color="action" /></Avatar>} label="Destacat" />
                                ) : null}
                                {item.visibilitat === '1' ? (
                                    <Chip style={{ marginTop: '10px' }} avatar={<Avatar><Visibility color="action" /></Avatar>} label="Visible" />
                                ) : (
                                    <Chip style={{ marginTop: '10px' }} avatar={<Avatar><VisibilityOff color="action" /></Avatar>} label="No Visible" />
                                )}
                                <Box className={classes.imageContainerItem}>
                                    <CardMedia
                                        component="img"
                                        className={classes.image}
                                        style={{ padding: 10 }}
                                        image={`${rutaImatges}${item.imatge}`}
                                        alt=""
                                        onClick={() => setLightboxOpen(true)}
                                    />
                                </Box>
                                <Lightbox isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} image={`${rutaImatges}${item.imatge}`} />
                            </Box>
                        </Box>
                        <Box className={classes.root1} style={{ marginTop: (valueTab === 0 && estemAPlats) ? '-25px' : '' }}>
                            <CardActions
                                disableSpacing
                            >
                                <Tooltip title="Idiomes" placement="right" arrow>
                                    <IconButton
                                        className={clsx(classes.expand, {
                                            [classes.expandOpen]: expandedId,
                                        })}
                                        onClick={() => handleExpandClick(index)}
                                        aria-expanded={expandedId === index}
                                    >
                                        <ExpandMoreIcon />
                                    </IconButton>
                                </Tooltip>
                            </CardActions>
                            {!(valueTab === 0 && estemAPlats) && (
                                <Box pl={2} pr={2} pb={2}>
                                    <Button
                                        color={cartaGeneral?.tipus === "nadal" ? "custom" : "primary"}
                                        variant="contained"
                                        onClick={() => (dispatch(setItemEditar({ index, item })), dispatch(setModeDialog("edicio")), dispatch(setOpenDialog("item")))}
                                        disabled={!conPermisos}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        className={classes.btnError}
                                        variant="contained"
                                        onClick={() => dispatch(setCustomDialog({
                                            abierto: true,
                                            titulo: "Advertència",
                                            mensaje: "Estàs segur que vols eliminar el registre?",
                                            funcionSi: () => dispatch(eliminarItem(estemAPlats ? "plats" : estemAVins ? "vins" : "cocktails", cartaGeneral.tipus, item.realId, estemAPlats ? item.nom_ca : "", item.categoria))
                                        }))}
                                        disabled={usuari !== "admin"}
                                    >
                                        Borrar
                                    </Button>
                                </Box>
                            )}
                        </Box>
                        <Collapse in={expandedId === index} timeout="auto" unmountOnExit >
                            <CardContent>
                                {estemAPlats ? (
                                    <Fragment>
                                        <Box p={1} className={clsx(classes.root11_2, classes.bgr1)} style={{ marginTop: '-15px' }}>
                                            <Box className={clsx(classes.box30, classes.root11_2)}>
                                                <Chip avatar={<Avatar>Es</Avatar>} label="Nom" className={classes.root5} />
                                                <Typography variant="body2" component="div">
                                                    {item.nom_es}
                                                </Typography>
                                            </Box>
                                            <Box className={clsx(classes.box70, classes.root11_2)}>
                                                <Chip avatar={<Avatar>Es</Avatar>} label="Descripció" className={classes.root5} />
                                                <Typography variant="body2" component="div">
                                                    {item.descripcio_es}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box p={1} className={clsx(classes.root11_2, classes.bgr1)}>
                                            <Box className={clsx(classes.box30, classes.root11_2)}>
                                                <Chip avatar={<Avatar>En</Avatar>} label="Nom" className={classes.root5} />
                                                <Typography variant="body2" component="div">
                                                    {item.nom_en}
                                                </Typography>
                                            </Box>
                                            <Box className={clsx(classes.box70, classes.root11_2)}>
                                                <Chip avatar={<Avatar>En</Avatar>} label="Descripció" className={classes.root5} />
                                                <Typography variant="body2" component="div">
                                                    {item.descripcio_en}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box p={1} className={clsx(classes.root11_2, classes.bgr1)}>
                                            <Box className={clsx(classes.box30, classes.root11_2)}>
                                                <Chip avatar={<Avatar>Fr</Avatar>} label="Nom" className={classes.root5} />
                                                <Typography variant="body2" component="div">
                                                    {item.nom_fr}
                                                </Typography>
                                            </Box>
                                            <Box className={clsx(classes.box70, classes.root11_2)}>
                                                <Chip avatar={<Avatar>Fr</Avatar>} label="Descripció" className={classes.root5} />
                                                <Typography variant="body2" component="div">
                                                    {item.descripcio_fr}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <Box p={1} className={clsx(classes.root11_2, classes.bgr1)} style={{ marginTop: '-15px' }}>
                                            <Box className={clsx(classes.box70, classes.root11_2)}>
                                                <Chip avatar={<Avatar>Es</Avatar>} label="Descripció" className={classes.root5} />
                                                <Typography variant="body2" component="div">
                                                    {item.descripcio_es}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box p={1} className={clsx(classes.root11_2, classes.bgr1)}>
                                            <Box className={clsx(classes.box70, classes.root11_2)}>
                                                <Chip avatar={<Avatar>En</Avatar>} label="Descripció" className={classes.root5} />
                                                <Typography variant="body2" component="div">
                                                    {item.descripcio_en}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box p={1} className={clsx(classes.root11_2, classes.bgr1)}>
                                            <Box className={clsx(classes.box70, classes.root11_2)}>
                                                <Chip avatar={<Avatar>Fr</Avatar>} label="Descripció" className={classes.root5} />
                                                <Typography variant="body2" component="div">
                                                    {item.descripcio_fr}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Fragment>
                                )}
                            </CardContent>
                        </Collapse>
                    </div>
                </Card>
            )}
        </Draggable>
    )
}

export default Item
