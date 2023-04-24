import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { TabPanel } from '../logica/logicaApp';
import { setAlertaAccion } from '../redux/appDucks';

//constantes
const {
    RUTA_SERVER: rutaServer,
    ALERGENS: alergens
} = Constantes;

const DialogItemFormPlats = (props) => {
    const {
        valueTab,
        valueTab2,
        valuesFormItem,
        setValuesFormItem
    } = props;
    const classes = Clases();
    const dispatch = useDispatch();
    const {
        modeDialog,
        titolsCarta,
        cartaGeneral,
        produccio,
        parades
    } = useSelector(store => store.variablesApp);
    const rutaImatges = `${rutaServer}images/plats_imatges/`;

    //funciones

    const handleChangeFormItem = (prop) => (event) => {
        setValuesFormItem({
            ...valuesFormItem,
            [prop]: event.target.value
        });
    };

    const handleChangeSelect = (event) => {
        const {
            target: { value, name },
        } = event;
        const alerta = {
            abierto: true,
            mensaje: "",
            tipo: 'warning',
            posicio: 'esquerra'
        };
        switch (name) {
            case 'parada':
                if (valuesFormItem.parada.length >= 3) {
                    alerta.mensaje = "No pot haver més de 3 parades per registre. Configuració incompatible.";
                    dispatch(setAlertaAccion(alerta));
                    return;
                };
                if (valuesFormItem.produccio.length >= 1 && valuesFormItem.produccio[0] !== "No") {
                    alerta.mensaje = "El registre ja té producte, no es pot seleccionar parada. Configuració incompatible.";
                    dispatch(setAlertaAccion(alerta));
                    return;
                };
                break;
            case 'produccio':
                if (valuesFormItem.produccio.length >= 3) {
                    alerta.mensaje = "No pot haver més de 3 productes per registre. Configuració incompatible.";
                    dispatch(setAlertaAccion(alerta));
                    return;
                };
                if (valuesFormItem.parada.length >= 1 && valuesFormItem.parada[0] !== "No") {
                    alerta.mensaje = "El registre ja té parades, no es pot seleccionar producte. Configuració incompatible.";
                    dispatch(setAlertaAccion(alerta));
                    return;
                };
                break;
        };
        let valueRev = typeof value === 'string' ? value.split(',') : value;
        const gestionarNo = (array) => {
            if (array.length > 1) {
                const index = array.indexOf('No');
                if (index !== -1) {
                    array.splice(index, 1);
                }
            } else if (array.length === 0) {
                array = ['No'];
            };
            return array;
        };
        valueRev = gestionarNo(valueRev);
        setValuesFormItem({
            ...valuesFormItem,
            [name]: valueRev
        });
    };

    return (
        <Fragment >
            <TabPanel value={valueTab2} index={0}>
                <FormControl
                    className={classes.form}
                    fullWidth
                >
                    <InputLabel style={{ marginLeft: "-10px" }}>Nom [Ca]</InputLabel>
                    <Input
                        className={classes.formInput}
                        id="form-nom-ca"
                        defaultValue={valuesFormItem.nom_ca}
                        onInput={handleChangeFormItem('nom_ca')}
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
                >
                    <InputLabel style={{ marginLeft: "-10px" }}>Nom [Es]</InputLabel>
                    <Input
                        className={classes.formInput}
                        id="form-nom-es"
                        defaultValue={valuesFormItem.nom_es}
                        onInput={handleChangeFormItem('nom_es')}
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
                >
                    <InputLabel style={{ marginLeft: "-10px" }}>Nom [En]</InputLabel>
                    <Input
                        className={classes.formInput}
                        id="form-nom-en"
                        defaultValue={valuesFormItem.nom_en}
                        onInput={handleChangeFormItem('nom_en')}
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
                >
                    <InputLabel style={{ marginLeft: "-10px" }}>Nom [Fr]</InputLabel>
                    <Input
                        className={classes.formInput}
                        id="form-nom-fr"
                        defaultValue={valuesFormItem.nom_fr}
                        onInput={handleChangeFormItem('nom_fr')}
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
                            sx={{ mt: -1 }}
                            variant="standard"
                        >
                            <InputLabel>Parada</InputLabel>
                            <Select
                                fullWidth
                                name="parada"
                                multiple
                                //displayEmpty
                                value={valuesFormItem.parada}
                                onChange={handleChangeSelect}
                                renderValue={(selected) => selected.join(', ')}
                            >
                                <MenuItem value='No'>
                                    <em>No</em>
                                </MenuItem>
                                {parades.map((parada, index) => (
                                    <MenuItem
                                        key={index}
                                        value={parada.nom_ca}
                                    >
                                        {parada.nom_ca}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl
                            fullWidth
                            className={classes.form}
                            sx={{ mt: 1 }}
                            variant="standard"
                        >
                            <InputLabel>Producció</InputLabel>
                            <Select
                                fullWidth
                                name="produccio"
                                multiple
                                //displayEmpty
                                value={valuesFormItem.produccio}
                                onChange={handleChangeSelect}
                                renderValue={(selected) => selected.join(', ')}
                            >
                                <MenuItem value='No'>
                                    <em>No</em>
                                </MenuItem>
                                {produccio.map((producte, index) => (
                                    <MenuItem
                                        key={index}
                                        value={producte.nom_ca}
                                    >
                                        {producte.nom_ca}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl
                            fullWidth
                            className={classes.form}
                            sx={{ mt: 1 }}
                            variant="standard"
                        >
                            <InputLabel>Al·lèrgens</InputLabel>
                            <Select
                                fullWidth
                                name="alergens"
                                multiple
                                //displayEmpty
                                value={valuesFormItem.alergens}
                                onChange={handleChangeSelect}
                                renderValue={(selected) => selected.join(', ')}
                            >
                                {alergens.map((alergen, index) => (
                                    <MenuItem
                                        key={index}
                                        value={alergen}
                                    >
                                        {alergen}
                                    </MenuItem>
                                ))}
                            </Select>
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
                                value={modeDialog === "creacio" ? valueTab + 1 : valuesFormItem.categoria}
                                onChange={handleChangeFormItem('categoria')}
                            >
                                {titolsCarta.map(categoria => {
                                    if (categoria.id !== 1) {
                                        return (
                                            <MenuItem
                                                key={`categoria-${categoria.id}`}
                                                value={categoria.id}
                                            >
                                                {categoria.titol_ca}
                                            </MenuItem>
                                        )
                                    }
                                })}
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

export default DialogItemFormPlats
