import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Grid,
    CardMedia,
    Card,
    CardActions,
    CardContent,
    Button,
    Typography
} from '@mui/material';

//carga componentes
import Lightbox from './Lightbox';

//estilos
import Clases from "../clases";

//importacion acciones
import {
    setCustomDialog,
    eliminarImatge,
    setImatgeSeleccionada,
    setOpenMedis
} from '../redux/appDucks';

const ImatgesMedis = (props) => {
    const {
        dir,
        configDir
    } = props;
    const classes = Clases();
    const dispatch = useDispatch();
    const {
        imatges,
    } = useSelector(store => store.variablesApp);

    //funciones

    if (!imatges) {
        return null
    };

    return (
        <div>
            <Grid container spacing={2} pb={5} justify="center" alignItems="center" style={{ width: '100%' }}>
                {imatges.map((imatge) => {
                    const LaCard = (props) => {
                        const { imatge } = props;
                        const [lightboxOpenMedis, setLightboxOpenMedis] = useState(false);
                        return (
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={imatge}>
                                <Card className={classes.efectoHover}>
                                    <CardMedia
                                        component="img"
                                        className={classes.imatgeMedis}
                                        image={`${dir}${imatge}`}
                                        alt=""
                                        onClick={() => setLightboxOpenMedis(true)}
                                    />
                                    <Lightbox isOpen={lightboxOpenMedis} onClose={() => setLightboxOpenMedis(false)} image={`${dir}${imatge}`} />
                                    <CardContent sx={{ marginBottom: "-15px" }}>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            className={classes.fuentePequena}
                                            sx={{
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
                                            }}>
                                            {imatge}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            size="small"
                                            color="inherit"
                                            onClick={() => (dispatch(setImatgeSeleccionada(imatge)), dispatch(setOpenMedis({ estado: false, dir: null })))}
                                        >
                                            Selecciona
                                        </Button>
                                        <Button
                                            size="small"
                                            color='error'
                                            onClick={() => dispatch(setCustomDialog({
                                                abierto: true,
                                                titulo: "Advertència",
                                                mensaje: "Estàs segur que vols eliminar la imatge?",
                                                funcionSi: () => dispatch(eliminarImatge(`${dir}${imatge}`, configDir))
                                            }))}
                                        >
                                            Elimina
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    };
                    return <LaCard imatge={imatge} key={imatge} />
                })}
            </Grid>
        </div>
    )
}

export default ImatgesMedis
