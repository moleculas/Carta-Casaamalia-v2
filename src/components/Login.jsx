import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Grid,
    Button,
    OutlinedInput,
    InputLabel,
    InputAdornment,
    FormControl,
    Paper,
    IconButton,
    Snackbar
} from '@mui/material';
import {
    Visibility,
    VisibilityOff
} from '@mui/icons-material';

//estilos
import Clases from "../clases";

//importaciones acciones
import { ingresoUsuarioAccion } from '../redux/usuarioDucks';
import { setAlertaAccion } from '../redux/appDucks';
import { Alert } from '../logica/logicaApp';

const Login = (props) => {
    const classes = Clases();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const errorDeAcceso = useSelector(store => store.variablesUsuario.errorDeAcceso);
    const logged = useSelector(store => store.variablesUsuario.activo);
    const alerta = useSelector(store => store.variablesApp.alerta);
    const [openSnack, setOpenSnack] = useState(false);
    const [alert, setAlert] = useState({});
    const [valuesForm, setValuesForm] = useState({
        nom: '',
        password: '',
        showPassword: false,
    });

    //useEffect

    useEffect(() => {
        if (logged) {
            navigate('/');           
        };
    }, [logged]);

    useEffect(() => {
        if (alerta.abierto) {
            setAlert({
                mensaje: alerta.mensaje,
                tipo: alerta.tipo
            })
            setOpenSnack(true);
        }
    }, [alerta]);

    useEffect(() => {
        if (errorDeAcceso) {
            dispatch(setAlertaAccion({
                abierto: true,
                mensaje: "Dades incorrectes. Torna a provar.",
                tipo: 'error',
                posicio: 'esquerra'
            }));
            setValuesForm({
                nom: '',
                password: '',
                showPassword: false,
            });
        }
    }, [errorDeAcceso]);

    //funciones

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
        dispatch(setAlertaAccion({
            abierto: false,
            mensaje: "",
            tipo: '',
            posicio: ''
        }));  
    };

    const handleChangeForm = (prop) => (event) => {
        setValuesForm({ ...valuesForm, [prop]: event.target.value });
    };

    const handleClickShowPasswordForm = () => {
        setValuesForm({ ...valuesForm, showPassword: !valuesForm.showPassword });
    };

    const handleMouseDownPasswordForm = (event) => {
        event.preventDefault();
    };

    const procesarDatos = (e) => {
        e.preventDefault();
        if (!valuesForm.nom.trim() || !valuesForm.password.trim()) {
            dispatch(setAlertaAccion({
                abierto: true,
                mensaje: "Completa el formulari correctament, falten dades.",
                tipo: 'error',
                posicio: 'esquerra'
            }));
            return
        };
        dispatch(ingresoUsuarioAccion(valuesForm.nom, valuesForm.password));
    };

    return (
        <div>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={4}
                style={{ minHeight: '60vh' }}
            >
                <Grid item xs={12} md={6} lg={4}>
                    <Paper elevation={3}>
                        <Box
                            p={5}
                            mt={2}
                            textAlign="center"
                        >
                            <form onSubmit={procesarDatos}>
                                <FormControl
                                    variant="outlined"
                                    className={classes.form}
                                    fullWidth
                                    color="secondary"
                                >
                                    <InputLabel>Usuari</InputLabel>
                                    <OutlinedInput
                                        className={classes.formInput}
                                        id="form-usuari"
                                        value={valuesForm.nom}
                                        onChange={handleChangeForm('nom')}
                                        label="Usuari"
                                    />
                                </FormControl>
                                <FormControl
                                    variant="outlined"
                                    className={classes.form}
                                    fullWidth
                                    color="secondary"
                                >
                                    <InputLabel>Password</InputLabel>
                                    <OutlinedInput
                                        className={classes.formInput}
                                        id="form-password"
                                        type={valuesForm.showPassword ? 'text' : 'password'}
                                        value={valuesForm.password}
                                        onChange={handleChangeForm('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPasswordForm}
                                                    onMouseDown={handleMouseDownPasswordForm}
                                                >
                                                    {valuesForm.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                                <Button
                                    fullWidth
                                    className={classes.formButton}
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    type="submit"
                                >
                                    Login
                                </Button>

                            </form>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert severity={alert.tipo} onClose={handleCloseSnack}>
                    {alert.mensaje}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Login
