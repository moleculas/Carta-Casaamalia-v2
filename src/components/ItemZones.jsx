import {
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Tooltip,
    Typography
} from '@mui/material';
import { BorderColor } from '@mui/icons-material';
import { Draggable } from "react-beautiful-dnd";

//importacion acciones
import { CustomDeleteIcon } from '../logica/logicaApp';

//estilos
import Clases from "../clases";

const ItemZones = (props) => {
    const {
        item,
        index,
        handleClickItem,
        handleEliminar,
        items
    } = props;
    const classes = Clases();

    //funciones   
    
    const habilitatEliminar = () => {
        return items.some(obj => obj.zona === item.realId);
    };

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
                            <CustomDeleteIcon
                                disabled={habilitatEliminar()}
                                handleEliminar={handleEliminar}
                                id={item.realId}
                            />
                        </ListItemSecondaryAction>
                    </ListItem >
                </div>
            )}
        </Draggable>
    )
}

export default ItemZones
