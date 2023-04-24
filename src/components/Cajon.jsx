import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';

//carga componentes
import Menu from './Menu';

//estilos
import Clases from "../clases";

const Cajon = (props) => {
    const classes = Clases();

    return (
        <Drawer
            className={classes.drawer}
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
            variant={props.variant}
            open={props.open}
            onClose={props.onClose ? props.onClose : null}
        >
            <div className={classes.toolbar}></div>
            <Divider />
            <Menu />
        </Drawer>
    )
}

export default Cajon
