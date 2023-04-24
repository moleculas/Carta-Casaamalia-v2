import { useDispatch } from 'react-redux';
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogContentText
} from '@mui/material';

//importacion acciones
import {
    setCustomDialog
} from '../redux/appDucks';

const DialogComponent = (props) => {
    const {
        abierto,
        mensaje,
        titulo,
        funcionSi
    } = props;
    const dispatch = useDispatch();

    //funciones

    const handleCloseDialogBotones = (respuesta) => {
        if (respuesta === "acuerdo") {
            funcionSi();
        };
        dispatch(setCustomDialog({
            abierto: false,
            titulo: "",
            mensaje: "",
            funcionSi: null
        }))
    };

    return (
        <div>
            <Dialog
                open={abierto}
                onClose={() => { handleCloseDialogBotones('desacuerdo') }}
                fullWidth={true}
                maxWidth={'xs'}
            >
                <DialogTitle>
                    <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        {titulo}
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {mensaje}
                    </DialogContentText>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: "15px" }}>
                        <Button
                            color="inherit"
                            onClick={() => { handleCloseDialogBotones('acuerdo') }}
                        >
                            D'acord
                        </Button>
                        <Button
                            color="error"
                            onClick={() => { handleCloseDialogBotones('desacuerdo') }}
                        >
                            No
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DialogComponent
