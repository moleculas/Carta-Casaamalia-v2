import { makeStyles } from "@mui/styles";
import { blueGrey, green, red, yellow } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';

const Clases = makeStyles((theme) => ({
    //contenedor
    rootCont: {
        display: 'flex'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    //navbar   
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: `none !important`,
        },
    },
    simpleButton: {
        marginLeft: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${240}px) !important`,
            marginLeft: 240,
        },
    },
    logo: {
        width: 30
    },
    fonsLogo: {
        borderRadius: 60,
        backgroundColor: alpha(theme.palette.common.white, 0.55),
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 7,
        paddingBottom: 7,
        marginRight: 15,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    //cajon
    drawer: {
        width: 240,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 240,
    },
    toolbar: theme.mixins.toolbar,
    //loading
    loading: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    root1: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
        },
    },
    root11: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            alignItems: 'flex-end',
        },
    },
    root11_2: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            alignItems: 'center',
        },
    },
    root: {
        width: '100%',
    },
    //tabs
    root2: {
        flexGrow: 1
    },
    root4: {
        cursor: 'default'
    },
    root5: {
        marginRight: '10px'
    },
    btnError: {
        backgroundColor: `${theme.palette.error.main}!important`,
        color: `${theme.palette.error.contrastText}!important`,
        "&:hover": {
            backgroundColor: `${theme.palette.error.dark}!important`,
        },
        "&:disabled": {
            backgroundColor: `${theme.palette.error.light}!important`,
        },
        marginLeft: '5px!important'
    },
    //form
    form: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    form2: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.2),
        },
    },
    formTipo: {
        display: 'flex',
        marginRight: -10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0),
        },
    },
    formTipo2: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0),
        },
    },
    formInput: {
        marginBottom: '20px',
    },
    //tabla   
    scrollable: {
        overflowY: 'auto',
        overflowX: 'hidden',
        scrollbarWidth: 'thin',
        scrollbarColor: '#B7B7B7 transparent',
        '&::-webkit-scrollbar': {
            width: 6,
            height: 6,
            backgroundColor: 'transparent',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
            marginTop: 27, //modificador
            marginBottom: 10, //modificador
        },
        '&::-webkit-scrollbar-thumb': {
            borderRadius: 6,
            backgroundColor: '#B7B7B7',
            minHeight: 24,
            minWidth: 24,
        },
        '&::-webkit-scrollbar-thumb:focus': {
            backgroundColor: '#adadad',
        },
        '&::-webkit-scrollbar-thumb:active': {
            backgroundColor: '#adadad',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#adadad',
        },
        '&::-webkit-scrollbar-corner': {
            backgroundColor: 'transparent',
        },
    },
    sinScroll: {
        overflowY: 'hidden !important',
    },
    conScroll: {
        overflowY: 'auto !important',
    },
    blanc: {
        color: 'white'
    },
    mb15: {
        marginBottom: 15,
    },
    mb10: {
        marginBottom: 10,
    },
    mb5: {
        marginBottom: 5,
    },
    mb25: {
        marginBottom: 25,
    },
    mb20: {
        marginBottom: 20,
    },
    mt15: {
        marginTop: 15,
    },
    mt10: {
        marginTop: 10,
    },
    mt20: {
        marginTop: 20,
    },
    mt5: {
        marginTop: 5,
    },
    mt_5: {
        marginTop: -5,
    },
    mt_25: {
        marginTop: -25,
    },
    mr15: {
        marginRight: 15,
    },
    mr10: {
        marginRight: 10,
    },
    displayNone: {
        display: 'none !important'
    },
    displayBlock: {
        display: 'block !important'
    },
    alignRight: {
        display: 'flex',
        flexDirection: 'row-reverse',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
    },
    centrado: {
        minHeight: "20vh",
        display: "flex",
        alignItems: "center",
    },
    fuentePequena: {
        fontSize: '0.7rem'
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    },
    inline: {
        display: 'inline'
    },
    cursorDefault: {
        cursor: 'default'
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    colorText: {
        color: 'rgba(0, 0, 0, 0.54)'
    },
    floatRight: {
        display: 'flex',
        flexDirection: 'row-reverse'
    },
    casillaCompte: {
        width: '100%',
        marginBottom: 8,
        marginRight: 10,
        paddingRight: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
            backgroundColor: `${yellow[50]} !important`,
        },
    },
    efectoHover: {
        transition: 'transform ease 300ms',
        "&:hover": {
            transform: 'translate(0, -2px)'
        },
    },
    sombraBox: {
        boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)'
    },
    boxStl: {
        minHeight: 43,
        height: 'auto',
        paddingTop: 9,
        paddingLeft: 10,
        paddingBottom: 9,
        paddingRight: 8,
    },
    boxStl2: {
        height: 'auto',
        paddingTop: 6,
        paddingLeft: 5,
        paddingRight: 8,
        backgroundColor: `${blueGrey[50]} !important`,
    },
    boxStl3: {
        height: 'auto',
        paddingTop: 6,
        paddingLeft: 5,
        paddingRight: 8,
        backgroundColor: `${green[50]} !important`,
    },
    ressenyaDia: {
        height: 'auto',
        width: '100%',
        padding: 10,
        marginBottom: 15,
        transition: 'transform ease 300ms',
        "&:hover": {
            transform: 'translate(0, -2px)'
        },
    },
    textVerd: {
        color: `${green[600]} !important`
    },
    img_dialog: {
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '300px',
        },
    },
    box80: {
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '80%',
        },
    },
    box20: {
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20%',
        },
    },
    box70: {
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '70%',
        },
    },
    box30: {
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '30%',
        },
    },
    pl_dialog: {
        paddingLeft: '0px',
        [theme.breakpoints.up('sm')]: {
            paddingLeft: '15px',
        },
    },
    casellaTitol: {
        marginBottom: 30,
        padding: 13
    },
    paddLef: {
        paddingLeft: '15px'
    },
    bgr1: {
        backgroundColor: theme.palette.background.default,
    },
    alarma: {
        color: 'red'
    },
    avtRed: {
        backgroundColor: `${red[500]}!important`
    },
    avtGreen: {
        backgroundColor: `${green[500]}!important`
    },
    imageContainerItem: {
        width: 200,
        height: 200,
        overflow: 'hidden',
        position: 'relative',
    },
    imageContainerTitols: {
        width: '100%',
        height: 200,
        overflow: 'hidden',
        position: 'relative',
    },
    imageContainerDialogItem: {
        width: '100%',
        height: 223,
        overflow: 'hidden',
        position: 'relative',
    },   
    imageContainerDialogProduccio: {
        width: '100%',
        height: 190,
        overflow: 'hidden',
        position: 'relative',
    },   
    slider: {
        width: '100%',
        height: 165,
    },
    slide: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    imageSlide: {
        height: '100%',
        maxWidth: '100%',
        cursor: 'pointer'
    },   
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        cursor: 'pointer'
    },
    imatgeMedis: {
        cursor: 'pointer',
        width: '100%',
        height: 200,
        objectFit: 'cover'
    },
    tabsStl: {
        minHeight: '35px!important',
        maxHeight: '35px!important',
    },
    dragItem: {
        boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.3)!important'
    },
    ombra: {
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)!important'
    },
    casilla: {        
        backgroundColor: theme.palette.background.default,
        marginBottom: 5,
        marginRight: 10,
        paddingRight: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
            backgroundColor: `${yellow[50]} !important`,
        },
    },
}), { index: 1 });

export default Clases;