import { useState, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Constantes from "../constantes";
import {
    Box,
    Button,
    InputLabel,
    FormControl,
    Input,
    IconButton,
    CardMedia,
    Stack
} from '@mui/material';
import {
    Delete as DeleteIcon
} from '@mui/icons-material';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../App.css';

//carga componentes
import Lightbox from './Lightbox';

//estilos
import Clases from "../clases";

//importacion acciones
import {
    setOpenMedis,
    setImatgeSeleccionada
} from '../redux/appDucks';

//constantes
const { RUTA_SERVER: rutaServer } = Constantes;

const DialogEditableFormImatge = (props) => {
    const {
        element,
        valuesFormEditable,
        setValuesFormEditable
    } = props;
    const classes = Clases();
    const dispatch = useDispatch();
    const {
        imatgeSeleccionada,
        cartaGeneral
    } = useSelector(store => store.variablesApp);
    const [lightboxOpen, setLightboxOpen] = useState({ estado: false, image: null });
    const rutaImatges = `${rutaServer}images/${element}/`;
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: true,
        swipe: false
    };

    //useEffect

    useEffect(() => {
        if (imatgeSeleccionada && !valuesFormEditable.imatges.includes(imatgeSeleccionada)) {
            setValuesFormEditable(prevState => ({
                ...prevState,
                imatges: [...prevState.imatges, imatgeSeleccionada]
            }));
            dispatch(setImatgeSeleccionada(null));
        };
    }, [imatgeSeleccionada]);

    //funciones

    const eliminarImatge = (imatge) => {
        setValuesFormEditable(prevState => ({
            ...prevState,
            imatges: prevState.imatges.filter(img => img !== imatge)
        }));
    };

    return (
        <Fragment >
            <Box px={3} mb={2} mt={-3}>
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
                        <InputLabel style={{ marginLeft: "-10px" }}>Imatges</InputLabel>
                        <Input
                            fullWidth
                            disabled
                            className={classes.formInput}
                            value={valuesFormEditable.imatges.join(', ')}
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
                <Box className={classes.imageContainerDialogProduccio}>
                    {valuesFormEditable.imatges.length > 0 && (
                        <Slider {...settings} className={classes.slider}>
                            {valuesFormEditable.imatges.map((image, index) => (
                                <div className={classes.slide} key={`image-${index}`}>
                                    <CardMedia
                                        component="img"
                                        className={classes.imageSlide}
                                        image={`${rutaImatges}${image}`}
                                        alt=""
                                        onClick={() => setLightboxOpen({ estado: true, image: `${rutaImatges}${image}` })}
                                    />
                                    <IconButton
                                        className={classes.btnError}
                                        style={{ top: 5, position: 'absolute' }}
                                        size="small"
                                        onClick={() => eliminarImatge(image)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            ))}
                        </Slider>
                    )}
                </Box>
                <Lightbox isOpen={lightboxOpen.estado} onClose={() => setLightboxOpen({ estado: false, image: null })} image={lightboxOpen.image} />
            </Box>
        </Fragment>
    )
}

export default DialogEditableFormImatge
