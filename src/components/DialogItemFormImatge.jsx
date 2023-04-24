import { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import {
    Box,
    Button,
    InputLabel,
    FormControl,
    Input,
    CardMedia,
    Stack
} from '@mui/material';

//carga componentes
import Lightbox from './Lightbox';

//estilos
import Clases from "../clases";

//importacion acciones
import {
    setOpenMedis
} from '../redux/appDucks';

const DialogItemFormImatge = (props) => {
    const {
        rutaImatges,
        cartaGeneral,
        valuesFormItem       
    } = props;
    const classes = Clases();
    const dispatch = useDispatch();
    const [lightboxOpen, setLightboxOpen] = useState(false);

    //funciones

    return (
        <Fragment >           
            <Box px={3} mb={2}>
                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                >
                    <FormControl
                        className={classes.form}
                        sx={{
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            width: '70%'
                        }}
                    >
                        <InputLabel style={{ marginLeft: "-10px" }}>Imatge</InputLabel>
                        <Input
                            fullWidth
                            disabled
                            className={classes.formInput}
                            id="form-titols_4"
                            value={valuesFormItem.imatge}
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
                <Box className={classes.imageContainerDialogItem}>
                    {valuesFormItem.imatge && (
                        <CardMedia
                            component="img"
                            className={classes.image}
                            style={{ padding: 0 }}
                            image={`${rutaImatges}${valuesFormItem.imatge}`}
                            alt=""
                            onClick={() => setLightboxOpen(true)}
                        />
                    )}
                </Box>
                <Lightbox isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} image={`${rutaImatges}${valuesFormItem.imatge}`} />
            </Box>
        </Fragment>
    )
}

export default DialogItemFormImatge
