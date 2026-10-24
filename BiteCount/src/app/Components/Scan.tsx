import { CameraView, useCameraPermissions } from 'expo-camera'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../../../styles/global'

type ScanProps = {
    onScan: (data: string) => void;
    onClose: () => void;
}

export default function Scan({ onScan, onClose }: ScanProps) {
    const [permission, requestPermission] = useCameraPermissions();
    const [permissionError, setPermissionError] = useState<string | null>(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        requestPermission().catch((error: unknown) => {
            setPermissionError(
                error instanceof Error ? error.message : 'Unable to request camera permission.'
            );
        });
    }, [requestPermission]);

    const handleBarcodeScanned = ({ data }: { data: string }) => {
        setScanned(true);
        onScan(data);
    }

    if (!permission) {
        return <Text style={styles.message}>Checking camera permission...</Text>;
    }

    if (!permission.granted) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.message}>
                    {permissionError ?? 'Camera access is needed to scan a food barcode.'}
                </Text>
                <TouchableOpacity style={styles.button} onPress={() => {
                    setPermissionError(null);
                    requestPermission().catch((error: unknown) => {
                        setPermissionError(
                            error instanceof Error ? error.message : 'Unable to request camera permission.'
                        );
                    });
                }}>
                    <Text style={styles.buttonText}>Try Again</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onClose}>
                    <Text style={styles.closeText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing="back"
                onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
            />
            <TouchableOpacity style={styles.button} onPress={onClose}>
                <Text style={styles.buttonText}>Close scanner</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 420,
        width: '100%',
        backgroundColor: colors.background,
    },
    camera: {
        flex: 1,
        width: '100%',
    },
    permissionContainer: {
        minHeight: 180,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
        padding: 20,
        backgroundColor: colors.background,
    },
    message: {
        color: colors.text,
        textAlign: 'center',
    },
    button: {
        alignItems: 'center',
        backgroundColor: colors.header,
        padding: 12,
    },
    buttonText: {
        color: colors.text,
        fontWeight: 'bold',
    },
    closeText: {
        color: colors.text,
        padding: 8,
    },
});