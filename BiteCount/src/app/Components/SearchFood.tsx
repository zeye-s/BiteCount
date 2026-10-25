import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../styles/global';
import Scan from './Scan';

interface Product {
    code?: string;
    product_name?: string;
    nutriments?: {
        'energy-kcal_100g'?: number;
        'carbohydrates_100g'?: number;
        'proteins_100g'?: number;
        'fat_100g'?: number;
        'sugars_100g'?: number;
        'sodium_100g'?: number;
        'potassium_100g'?: number;
        'iron_100g'?: number;
    };
}

type SearchProps = {
    onSelectProduct: (product: Product) => void;
}

export default function Search({onSelectProduct}:SearchProps){
    const [recipeFound, setRecipeFound] = useState(false);
    const [query, setQuery] = useState('');
    const[recipe, setRecipe] = useState<Product[]>([]);
    const[scanning, setScanning] = useState(false);
    const[ratio, setRatio] = useState('');

    const searchRecipe = async(searchTerm = query) =>{
        try{
            setRecipeFound(true);
            const searchQuery = searchTerm.trim() === '' ? 3017624010701 : searchTerm.trim()
            const result = await fetch(`https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(searchQuery)}?&page_size=20&fields=code,product_name,nutriments`,
            {
                headers: {
                        'User-Agent': 'MyFoodApp/1.0 (ziyishen2010@gmail.com)',
                    },
            });
            
            if(!result.ok){
                throw new Error;
            }
            const data = await result.json();
            if(data.product){
                setRecipe([data.product]);
                return (data); 
            }
            else{
                setRecipe([]);
            }
            }
        catch(error){
            console.error('could not fetch this', error);
        }
        finally{
            setRecipeFound(false);
        }
    }

    const handleBarcodeScanned = (data: string) => {
        setQuery(data);
        setScanning(false);
        void searchRecipe(data);
    }

    const handleAmountEaten = (product:Product) =>{
        const amountEaten = Number(ratio) || 100;
        const factor = amountEaten/ 100;
        const nutrients = product.nutriments || {};
        const scaledProduct = {
            ...product,
            product_name: `${product.product_name} per ${amountEaten}g`,
            nutriments:{
                'energy-kcal_100g': (nutrients['energy-kcal_100g'] || 0) * factor,
                'carbohydrates_100g': (nutrients['carbohydrates_100g'] || 0) * factor,
                'proteins_100g': (nutrients['proteins_100g'] || 0) * factor,
                'fat_100g': (nutrients['fat_100g'] || 0 ) * factor,
                'sugars_100g': (nutrients['sugars_100g'] || 0) * factor,
                'sodium_100g':(nutrients['sodium_100g'] || 0) * factor ,
                'potassium_100g': (nutrients['potassium_100g'] || 0) * factor,
                'iron_100g': (nutrients['iron_100g'] || 0) * factor,
            }
        };
        onSelectProduct(scaledProduct);
    };

if(scanning){
        return (
            <View style={styles.container}>
                <Scan onScan={handleBarcodeScanned} onClose={() => setScanning(false)} />
                   
            </View>
            
        );
    }

    return (
        <View style={styles.container}>
                <Text style={styles.title}>Search Food</Text>

                <View>
                    <TextInput 
                        style={styles.search}
                        placeholder="Enter food Barcode(ex. 3017624010701)"
                        placeholderTextColor={colors.textSecondary}
                        value={query}
                        onChangeText={setQuery}
                        />
                </View>
               
                <View style = {styles.searchButton}>
                    <TouchableOpacity onPress={() => void searchRecipe()}>
                        <Text style={styles.text}>{recipeFound ? 'Searching...' : 'Search'}</Text>
                    </TouchableOpacity>
                        <TouchableOpacity  onPress={() => setScanning(true)} style = {{marginRight:10, }}>
                            <Ionicons name = "camera-outline" size = {20} color={colors.text}/>
                        </TouchableOpacity>
                </View>
                <View>
                    <TextInput 
                        style = {styles.userInput}
                        placeholder = 'Enter the amount you ate (default is 100g)'
                        placeholderTextColor={colors.textSecondary}
                        keyboardType='numeric'
                        value = {ratio}
                        onChangeText={setRatio}
                    ></TextInput>
                </View>
                {/* Results List */}
                    <FlatList<Product>
                    data={recipe}
                    keyExtractor={(item, index) => item.code || index.toString()}
                    nestedScrollEnabled
                    keyboardShouldPersistTaps="handled"
                    style={styles.results}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress = {() => handleAmountEaten(item)}>
                        <View style={styles.card}>
                            <Text style={styles.productName}>{(item.product_name || 'Unknown Food') + ' Per 100g'}</Text>
                            <Text style={styles.itemName}>Calories: {Math.round((item.nutriments?.['energy-kcal_100g'] || 0))} kcal</Text>
                            <Text style={styles.itemName}>Carbs: {Math.round((item.nutriments?.carbohydrates_100g || 0))}g</Text>
                            <Text style={styles.itemName}>Protein: {Math.round((item.nutriments?.proteins_100g || 0))}g</Text>
                            <Text style={styles.itemName}>Fat: {Math.round((item.nutriments?.fat_100g || 0))}g</Text>
                            <Text style={styles.itemName}>Sugar: {Math.round((item.nutriments?.sugars_100g || 0))}g</Text>
                            <Text style={styles.itemName}>Sodium: {Math.round(1000 * (item.nutriments?.sodium_100g || 0))} mg</Text>
                            <Text style={styles.itemName}>Potassium: {Math.round(1000 * (item.nutriments?.potassium_100g || 0))}mg</Text>
                            <Text style={styles.itemName}>Iron: {Math.round(1000 * (item.nutriments?.iron_100g|| 0) )}mg</Text>
                            <Text style = {styles.itemName}>Information provided by Open Food Facts API</Text>
                        </View>
                        </TouchableOpacity>
                    )}
                />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    userInput:{
        backgroundColor: colors.header,
        marginBottom: 16,
        borderRadius: 10,
        color: colors.text,
        paddingLeft: 10,
    },
    results: {
        maxHeight: 240,
        flexGrow: 0,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.text,
     },
    search: {
        backgroundColor: colors.header,
        borderRadius: 10,
        color: colors.text,
        padding: 10,
        marginBottom: 10,
    },
    searchButton: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'50%',
        backgroundColor: colors.surface,
        borderRadius: 15,
        padding: 10,
        marginBottom: 15,
    },
    text: {
        color: colors.text,
        marginLeft:10,
    },
    card: {
        backgroundColor: colors.header,
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
    },
    productName: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
        color: colors.text,
    },

    itemName:{
        fontSize: 16,
        marginBottom: 4,
        color: colors.textSecondary,
    }
});