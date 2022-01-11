import axios from 'axios';
import * as serviceWorkerRegistration from '../serviceWorkerRegistration';
const { REACT_APP_WEBPUSH, PUBLIC_VAPID_KEY} = process.env;

export const subscription = async (data) => {
    
    const reg = await serviceWorkerRegistration.register()

    const suscribe = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: PUBLIC_VAPID_KEY.replace,
    });


    await axios.post(REACT_APP_WEBPUSH, suscribe);

    console.log('suscribed!')

}

