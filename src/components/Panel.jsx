import { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Button,
    Typography,
    Chip,
    Stack,
    FormControl,
    ListItemText,
    MenuItem
} from '@mui/material';
import { DragDropContext, Droppable } from "react-beautiful-dnd";

//carga componentes
import Item from './Item';
import DialogTitols from './DialogTitols';
import Medis from './Medis';
import DialogItem from './DialogItem';
import DialogEditable from './DialogEditable';

//estilos
import Clases from "../clases";

//importacion acciones
import {
    setOpenDialog,
    setModeDialog,
    actualizarCategoria,
} from '../redux/appDucks';
import { StyledMenu } from '../logica/logicaApp';

const Panel = (props) => {
    const {
        estemAPlats,
        estemAVins,
        items,
        valueTab
    } = props;
    const classes = Clases();
    const dispatch = useDispatch();
    const {
        openDialog,
        titolsCarta,
        titolsVins,
        openMedis,
        cartaGeneral,
        itemsActivosCat,
        produccio,
        parades
    } = useSelector(store => store.variablesApp);
    const [itemsOrdenables, setItemsOrdenables] = useState(null);
    const [anchorElMenu, setAnchorElMenu] = useState(null);

    //useEffect

    useEffect(() => {
        if (items) {
            setItemsOrdenables(items.map((item, index) => ({
                ...item,
                id: `item-${index}`,
                realId: item.id,
                index: index + 1
            })));
        };
    }, [items]);

    //funciones    


    const handleToggleMenu = (e) => {
        setAnchorElMenu(anchorElMenu ? null : e.currentTarget)
    };

    const handleCloseMenu = () => {
        setAnchorElMenu(null)
    };

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) {
            return;
        };
        if (destination.index === source.index) {
            return;
        };
        const destino = (destination.index > (itemsActivosCat - 1)) ? (itemsActivosCat - 1) : destination.index;
        const itemsNew = [...itemsOrdenables];
        const removed = itemsNew.splice(source.index, 1);
        itemsNew.splice(destino, 0, ...removed);
        const nuevoArr = itemsNew.map((item, index) => ({ ...item, id: `item-${index}` }));
        setItemsOrdenables(nuevoArr);
        const arrActualizar = nuevoArr.map((item, index) => ({
            ...item,
            id: item.realId,
            ordre: item.ordre > 0 ? index + 1 : 0
        }));
        setTimeout(() => {
            dispatch(actualizarCategoria(estemAPlats ? "plats" : "vins", arrActualizar, cartaGeneral.tipus));
        }, 200);
    };

    if (!itemsOrdenables) {
        return null
    };

    return (
        <div>
            <Stack direction="row" alignItems="center" spacing={2} mt={1} mb={4}>
                <Box sx={{ width: "75%" }}>
                    <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Chip
                            color="secondary"
                            label={
                                <Fragment>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                        style={{ marginLeft: 20, marginRight: 10 }}
                                    >
                                        Títol imatge carta:
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        component="span"
                                        style={{ marginRight: 20 }}
                                    >
                                        {estemAPlats ? titolsCarta[valueTab][`titol_ca`] : titolsVins[valueTab][`titol_ca`]}
                                    </Typography>
                                </Fragment>
                            } />
                    </Box>
                </Box>
                <Box sx={{ width: "25%" }}>
                    <FormControl
                        className={classes.form}
                        fullWidth
                    >
                        <Button
                            variant="contained"
                            color={cartaGeneral?.tipus === "nadal" ? "custom" : "primary"}
                            onClick={handleToggleMenu}
                        >
                            Accions carta
                        </Button>
                        <StyledMenu
                            anchorEl={anchorElMenu}
                            keepMounted
                            open={Boolean(anchorElMenu)}
                            onClose={handleCloseMenu}
                        >
                            <MenuItem
                                onClick={() => { handleCloseMenu(); dispatch(setOpenDialog("principal")) }}
                            >
                                <ListItemText primary="Editar títol carta" />
                            </MenuItem>
                            <MenuItem
                                onClick={() => { handleCloseMenu(); dispatch(setOpenDialog("titols")) }}
                            >
                                <ListItemText primary="Editar títol categoria" />
                            </MenuItem>
                            <MenuItem
                                onClick={() => { handleCloseMenu(); dispatch(setModeDialog("creacio")); dispatch(setOpenDialog("item")) }}
                                disabled={estemAPlats && valueTab === 0}
                            >
                                <ListItemText primary="Crear registre" />
                            </MenuItem>
                            <MenuItem
                                onClick={() => { handleCloseMenu(); dispatch(setOpenDialog("produccio")) }}
                                disabled={Boolean(estemAVins)}
                            >
                                <ListItemText primary="Gestionar producció" />
                            </MenuItem>
                            <MenuItem
                                onClick={() => { handleCloseMenu(); dispatch(setOpenDialog("parades")) }}
                                disabled={Boolean(estemAVins)}
                            >
                                <ListItemText primary="Gestionar parades" />
                            </MenuItem>
                        </StyledMenu>
                    </FormControl>
                </Box>
            </Stack>
            {items.length === 0 ? (
                <Typography variant="body1">No hi ha ítems.</Typography>
            ) : (
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="list" type="list" direction="vertical">
                        {(provided) => (
                            <div ref={provided.innerRef}>
                                {itemsOrdenables.map((item, index) => {
                                    return (
                                        <Box mb={2} key={index}>
                                            <Item
                                                item={item}
                                                index={index}
                                                estemAPlats={estemAPlats}
                                                estemAVins={estemAVins}
                                                valueTab={valueTab}
                                                cartaGeneral={cartaGeneral}
                                                produccio={produccio}
                                                parades={parades}
                                            />
                                        </Box>
                                    )
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            )}
            {openDialog === "titols" && (
                <DialogTitols
                    estemAPlats={estemAPlats}
                    estemAVins={estemAVins}
                    valueTab={valueTab}
                />
            )}
            {openMedis && (
                <Medis />
            )}
            {openDialog === "item" && (
                <DialogItem
                    estemAPlats={estemAPlats}
                    estemAVins={estemAVins}
                    valueTab={valueTab}
                />
            )}
            {openDialog === "produccio" && (
                <DialogEditable element={"produccio"} />
            )}
             {openDialog === "parades" && (
                <DialogEditable element={"parades"} />
            )}
        </div>
    )
}

export default Panel