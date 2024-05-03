import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Constantes from "../constantes";
import {
    Box,
    InputLabel,
    FormControl,
    Input,
    MenuItem,
    Select,
    Stack,
    TextField
} from '@mui/material';

//carga componentes
import DialogItemFormImatge from './DialogItemFormImatge';

//estilos
import Clases from "../clases";

//importacion acciones
import {
    TabPanel
} from '../logica/logicaApp';


//constantes
const {
    RUTA_SERVER: rutaServer,
} = Constantes;

const DialogItemFormVins = (props) => {
    const {
        valueTab,
        valueTab2,
        valuesFormItem,
        setValuesFormItem,
        categoria
    } = props;
    const classes = Clases();
    const {
        modeDialog,
        titolsCocktails,
        cartaGeneral
    } = useSelector(store => store.variablesApp);
    const rutaImatges = `${rutaServer}images/cocktails_imatges/`;

    //funciones

    const handleChangeFormItem = (prop) => (event) => {
        //console.log(event.target.value)
        setValuesFormItem({
            ...valuesFormItem,
            [prop]: event.target.value
        });
    };

    return (
        <Fragment>
            <TabPanel value={valueTab2} index={0}>
                <FormControl
                    className={classes.form}
                    fullWidth
                >
                    <InputLabel style={{ marginLeft: "-10px" }}>Nom</InputLabel>
                    <Input
                        className={classes.formInput}
                        defaultValue={valuesFormItem.nom}
                        onInput={handleChangeFormItem('nom')}
                    />
                </FormControl>
                <FormControl
                    className={classes.form}
                    fullWidth
                    sx={{ paddingX: "2px", marginTop: "-4px" }}
                >
                    <TextField
                        className={classes.formInput}
                        label="Descripció [Ca]"
                        multiline
                        maxRows={4}
                        variant="standard"
                        defaultValue={valuesFormItem.descripcio_ca}
                        onInput={handleChangeFormItem('descripcio_ca')}
                    />
                </FormControl>
            </TabPanel>
            <TabPanel value={valueTab2} index={1}>
                <FormControl
                    className={classes.form}
                    fullWidth
                    disabled={true}
                >
                    <InputLabel style={{ marginLeft: "-10px" }}>Nom</InputLabel>
                    <Input
                        className={classes.formInput}
                        defaultValue={valuesFormItem.nom}
                        onInput={handleChangeFormItem('nom')}
                    />
                </FormControl>
                <FormControl
                    className={classes.form}
                    fullWidth
                    sx={{ paddingX: "2px", marginTop: "-4px" }}
                >
                    <TextField
                        className={classes.formInput}
                        label="Descripció [Es]"
                        multiline
                        maxRows={4}
                        variant="standard"
                        defaultValue={valuesFormItem.descripcio_es}
                        onInput={handleChangeFormItem('descripcio_es')}
                    />
                </FormControl>
            </TabPanel>
            <TabPanel value={valueTab2} index={2}>
                <FormControl
                    className={classes.form}
                    fullWidth
                    disabled={true}
                >
                    <InputLabel style={{ marginLeft: "-10px" }}>Nom</InputLabel>
                    <Input
                        className={classes.formInput}
                        defaultValue={valuesFormItem.nom}
                        onInput={handleChangeFormItem('nom')}
                    />
                </FormControl>
                <FormControl
                    className={classes.form}
                    fullWidth
                    sx={{ paddingX: "2px", marginTop: "-4px" }}
                >
                    <TextField
                        className={classes.formInput}
                        label="Descripció [En]"
                        multiline
                        maxRows={4}
                        variant="standard"
                        defaultValue={valuesFormItem.descripcio_en}
                        onInput={handleChangeFormItem('descripcio_en')}
                    />
                </FormControl>
            </TabPanel>
            <TabPanel value={valueTab2} index={3}>
                <FormControl
                    className={classes.form}
                    fullWidth
                    disabled={true}
                >
                    <InputLabel style={{ marginLeft: "-10px" }}>Nom</InputLabel>
                    <Input
                        className={classes.formInput}
                        defaultValue={valuesFormItem.nom}
                        onInput={handleChangeFormItem('nom')}
                    />
                </FormControl>
                <FormControl
                    className={classes.form}
                    fullWidth
                    sx={{ paddingX: "2px", marginTop: "-4px" }}
                >
                    <TextField
                        className={classes.formInput}
                        label="Descripció [Fr]"
                        multiline
                        maxRows={4}
                        variant="standard"
                        defaultValue={valuesFormItem.descripcio_fr}
                        onInput={handleChangeFormItem('descripcio_fr')}
                    />
                </FormControl>
            </TabPanel>
            <Box px={3} sx={{ marginTop: "-5px" }}>
                <Stack
                    direction="row"
                    spacing={1}
                >
                    <Box width="60%">
                        <FormControl
                            className={classes.form}
                            fullWidth
                        >
                            <InputLabel style={{ marginLeft: "-10px" }}>Preu (S'ha de posar el preu inclòs el símbol d'€)</InputLabel>
                            <Input
                                className={classes.formInput}
                                id="form-pre"
                                defaultValue={valuesFormItem.preu}
                                onInput={handleChangeFormItem('preu')}
                            />
                        </FormControl>
                        <FormControl
                            fullWidth
                            className={classes.form}
                            sx={{ mt: 1, mb: 3 }}
                            variant="standard"
                            disabled={Boolean(modeDialog === "creacio")}
                        >
                            <InputLabel>Canvi de categoria</InputLabel>
                            <Select
                                fullWidth
                                //displayEmpty
                                value={modeDialog === "creacio" ? ((valueTab + 1) - 10) : valuesFormItem.categoria}
                                onChange={handleChangeFormItem('categoria')}
                            >
                                {titolsCocktails.map(categoria => (
                                    <MenuItem
                                        key={`categoria-${categoria.id - 10}`}
                                        value={cartaGeneral.tipus === "nadal" ? categoria.id - 22 : categoria.id - 10} //parche categoria
                                    >
                                        {categoria.titol_ca}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box width="40%">
                        <DialogItemFormImatge
                            rutaImatges={rutaImatges}
                            cartaGeneral={cartaGeneral}
                            valuesFormItem={valuesFormItem}
                        />
                    </Box>
                </Stack>
            </Box>
        </Fragment>
    )
}

export default DialogItemFormVins
