import {useState,useEffect} from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import {Camera, CameraView} from 'expo-camera'

type scanProps = {
    onScan: (data:string) => void;
}

export default function Scan({onScan}:scanProps) {
    const[permission, setPermission] = useState<boolean | null>(null);
    const[scanned,setScanned] = useState(false);

    useEffect(() => {
        const getBarCode = async() => {
            const {status} = await Camera.requestCameraPermissionsAsync();
            setPermission(status === 'granted');
        };
        getBarCode();
    }, []);

    const handleBarcodeScanned = ({data}: {data:string}) => {
        setScanned(true);
        alert(`Barcode Scanned Successfully ${data}`);
        onScan(data);
    }
    if(!permission || permission === null){
        return(<Text>no access to camera</Text>);
    }

    return(
        <View>
            <CameraView
            onBarcodeScanned={scanned ? undefined: handleBarcodeScanned}
            />
            <button>Confirm</button>
        </View>
    )
}