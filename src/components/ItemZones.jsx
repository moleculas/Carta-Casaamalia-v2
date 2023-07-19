import {
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Tooltip,
    Typography
} from '@mui/material';
import {
    BorderColor,
    Delete as DeleteIcon
} from '@mui/icons-material';

import { Draggable } from "react-beautiful-dnd";

//estilos
import Clases from "../clases";

const ItemZones = (props) => {
    const {
        item,
        index,
        handleClickItem,
        handleEliminar
    } = props;
    const classes = Clases();

    //funciones

    // const handleClickItem = (item) => {
    //     setModeDialogZones('edicio');
    //     setItem(item);
    //     const obj = {
    //         titol_ca: item.titol_ca,
    //         titol_es: item.titol_es,
    //         titol_en: item.titol_en,
    //         titol_fr: item.titol_fr,
    //         imatge: item.imatge
    //     };
    //     setValuesFormZones(obj);
    //     setInitialStateValuesFormZones(obj);
    // };

    // const handleEliminar = (event, id) => {
    //     const funcionsSi = (id) => {
    //         dispatch(eliminarEditable("zones", id));
    //     };
    //     dispatch(setCustomDialog({
    //         abierto: true,
    //         titulo: "Advertència",
    //         mensaje: "Estàs segur que vols eliminar el registre?",
    //         funcionSi: () => funcionsSi(id)
    //     }));
    // };

    return (
        <Draggable
            draggableId={String(item.id)}
            index={index}
            type="list"
        >
            {(provided, snapshot) => (
                <div
                    className={snapshot.isDragging ? classes.dragItem : ""}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <ListItem
                        key={`list-zones-${index}`}
                        className={classes.casilla}
                        {...provided.dragHandleProps}
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
                                    onClick={(event) => handleEliminar(event, item.realId)}
                                    sx={{ cursor: 'pointer', ml: 1, opacity: 0.7 }}
                                />
                            </Tooltip>
                        </ListItemSecondaryAction>
                    </ListItem >
                </div>
            )}
        </Draggable>
    )
}

export default ItemZones
