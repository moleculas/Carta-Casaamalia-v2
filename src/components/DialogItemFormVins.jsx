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
    PUNTUACIO: puntuacio
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
        titolsVins,
        cartaGeneral,
        zones,
        subcategoriesVins
    } = useSelector(store => store.variablesApp);
    const rutaImatges = `${rutaServer}images/vins_imatges/`;
    const arrZones = zones.filter((obj) => obj.categoria === categoria);

    //funciones

    const handleChangeFormItem = (prop) => (event) => {       
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
                    sx={{ marginTop: "-4px" }}
                >
                    <InputLabel style={{ marginLeft: "-10px" }}>Denominació</InputLabel>
                    <Input
                        className={classes.formInput}
                        defaultValue={valuesFormItem.denominacio}
                        onInput={handleChangeFormItem('denominacio')}
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
                <FormControl
                    className={classes.form}
                    fullWidth
                    sx={{ paddingX: "2px", marginTop: "18px" }}
                >
                    <TextField
                        className={classes.formInput}
                        label="Descripció Subcategoria [Ca]"
                        multiline
                        maxRows={4}
                        variant="standard"
                        defaultValue={valuesFormItem.descripcio_sub_ca}
                        onInput={handleChangeFormItem('descripcio_sub_ca')}
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
                    sx={{ marginTop: "-4px" }}
                    disabled={true}
                >
                    <InputLabel style={{ marginLeft: "-10px" }}>Denominació</InputLabel>
                    <Input
                        className={classes.formInput}
                        defaultValue={valuesFormItem.denominacio}
                        onInput={handleChangeFormItem('denominacio')}
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
                <FormControl
                    className={classes.form}
                    fullWidth
                    sx={{ paddingX: "2px", marginTop: "18px" }}
                >
                    <TextField
                        className={classes.formInput}
                        label="Descripció Subcategoria [Es]"
                        multiline
                        maxRows={4}
                        variant="standard"
                        defaultValue={valuesFormItem.descripcio_sub_es}
                        onInput={handleChangeFormItem('descripcio_sub_es')}
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
                    sx={{ marginTop: "-4px" }}
                    disabled={true}
                >
                    <InputLabel style={{ marginLeft: "-10px" }}>Denominació</InputLabel>
                    <Input
                        className={classes.formInput}
                        defaultValue={valuesFormItem.denominacio}
                        onInput={handleChangeFormItem('denominacio')}
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
                <FormControl
                    className={classes.form}
                    fullWidth
                    sx={{ paddingX: "2px", marginTop: "18px" }}
                >
                    <TextField
                        className={classes.formInput}
                        label="Descripció Subcategoria [En]"
                        multiline
                        maxRows={4}
                        variant="standard"
                        defaultValue={valuesFormItem.descripcio_sub_en}
                        onInput={handleChangeFormItem('descripcio_sub_en')}
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
                    sx={{ marginTop: "-4px" }}
                    disabled={true}
                >
                    <InputLabel style={{ marginLeft: "-10px" }}>Denominació</InputLabel>
                    <Input
                        className={classes.formInput}
                        defaultValue={valuesFormItem.denominacio}
                        onInput={handleChangeFormItem('denominacio')}
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
                <FormControl
                    className={classes.form}
                    fullWidth
                    sx={{ paddingX: "2px", marginTop: "18px" }}
                >
                    <TextField
                        className={classes.formInput}
                        label="Descripció Subcategoria [Fr]"
                        multiline
                        maxRows={4}
                        variant="standard"
                        defaultValue={valuesFormItem.descripcio_sub_fr}
                        onInput={handleChangeFormItem('descripcio_sub_fr')}
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
                        {/* <FormControl
                            fullWidth
                            className={classes.form}
                            sx={{ mt: -1 }}
                            variant="standard"
                        >
                            <InputLabel>Puntuació Parker</InputLabel>
                            <Select
                                fullWidth
                                //displayEmpty
                                value={valuesFormItem.puntuacio_pr}
                                onChange={handleChangeFormItem('puntuacio_pr')}
                            >
                                {puntuacio.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
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
                            <InputLabel>Puntuació Peñín</InputLabel>
                            <Select
                                fullWidth
                                //displayEmpty
                                value={valuesFormItem.puntuacio_pe}
                                onChange={handleChangeFormItem('puntuacio_pe')}
                            >
                                {puntuacio.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl> */}
                        <FormControl
                            fullWidth
                            className={classes.form}
                            sx={{ mt: -1 }}
                            variant="standard"
                        >
                            <InputLabel>Subcategoria</InputLabel>
                            <Select
                                fullWidth
                                //displayEmpty
                                value={valuesFormItem.subcategoria}
                                onChange={handleChangeFormItem('subcategoria')}
                            >
                                <MenuItem value="No">
                                    No
                                </MenuItem>
                                {subcategoriesVins.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                            {option.nom_ca}
                                            <Box
                                                sx={{
                                                    width: 20,
                                                    height: 20,
                                                    marginRight: "10px",
                                                    borderRadius: '50%',
                                                    backgroundColor: option.color,
                                                    marginLeft: 'auto',
                                                    border: '1px solid rgba(0, 0, 0, 0.2)'
                                                }}
                                            />
                                        </Box>
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
                            <InputLabel>Zona</InputLabel>
                            <Select
                                fullWidth
                                //displayEmpty
                                value={valuesFormItem.zona}
                                onChange={handleChangeFormItem('zona')}
                            >
                                <MenuItem value="No">
                                    No
                                </MenuItem>
                                {arrZones.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.titol_ca}
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
                                value={modeDialog === "creacio" ? ((valueTab + 1) - 5) : valuesFormItem.categoria}
                                onChange={handleChangeFormItem('categoria')}
                            >
                                {titolsVins.map(categoria => (
                                    <MenuItem
                                        key={`categoria-${categoria.id - 5}`}
                                        value={cartaGeneral.tipus === "nadal" ? categoria.id - 18 : categoria.id - 5} //parche categoria
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
