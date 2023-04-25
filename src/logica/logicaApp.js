import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Menu,
    Typography
} from '@mui/material';
import { withStyles } from '@mui/styles';
import MuiAlert from '@mui/material/Alert';

export const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component={'span'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

export const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};

export const useForceUpdate = () => {
    let [value, setState] = useState(true);
    return () => setState(!value);
};

export const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const useWebSocket = (usuariActiu) => {
    const websocketRef = useRef(null);
    useEffect(() => {
        const wsUri = 'ws://127.0.0.1:8080/reactphp-project/server.php';
        const websocket = new WebSocket(wsUri);
        websocketRef.current = websocket;
        websocket.onopen = (ev) => {
            console.log('Websocket connectat!');
        };
        websocket.onmessage = (ev) => {
            const response = JSON.parse(ev.data);
            const resType = response.type;
            const userName = response.name;
            switch (resType) {
                case 'usermsg':
                    if (userName !== usuariActiu) {
                        window.location.reload();
                    } else {
                        console.log(`Actualització de: ${userName}`)
                    };
                    break;
                default:
                    break;
            };
        };
        websocket.onerror = (ev) => {
            console.log('Error de connexió Websocket');
        };
        websocket.onclose = () => {
            console.log('Connexió Websocket tancada');
        };
        return () => {
            websocket.close();
        };
    }, []);
    const sendMessageWebSocket = (usuari) => {
        const msg = {
            type: 'usermsg',
            name: usuari
        };
        websocketRef.current.send(JSON.stringify(msg));
    };

    return {
        websocket: websocketRef.current,
        sendMessageWebSocket
    };
};

export const orientacioTabs = (esDesktop) => {
    if (esDesktop) {
        return "horizontal";
    } else {
        return "vertical";
    };
};

export const StyledMenu = withStyles({
    paper: (props) => ({
        border: '1px solid #d3d4d5',
        width: props.anchorEl ? props.anchorEl.getBoundingClientRect().width : null,
    }),
})((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

export const replaceSingleQuotes = (obj) => {
    for (let key in obj) {
        if (typeof obj[key] === 'string') {
            obj[key] = obj[key].replace(/'/g, '’');
        } else if (typeof obj[key] === 'object') {
            obj[key] = replaceSingleQuotes(obj[key]);
        };
    };
    return obj;
};