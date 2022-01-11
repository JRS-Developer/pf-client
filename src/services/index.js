import axios from 'axios'
const { REACT_APP_WEBPUSH, PUBLIC_VAPID_KEY} = process.env

export const subscription = async (data) => {
    
    const reg = await navigator.serviceWorker.register('./webPush.js', {
        scope:'/'
    });
    console.log('register!')

    const suscribe = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: PUBLIC_VAPID_KEY.replace,
    });


    await axios.post(REACT_APP_WEBPUSH, suscribe);

    console.log('suscribed!')

}

