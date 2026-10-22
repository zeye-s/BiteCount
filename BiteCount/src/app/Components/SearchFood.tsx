import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native';
import {useState} from 'react';
import {colors} from '../../../styles/global';
import { Ionicons } from '@expo/vector-icons';

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

export default function Search(){
    const [recipeFound, setRecipeFound] = useState(false);
    const [query, setQuery] = useState('');
    const[recipe, setRecipe] = useState<Product[]>([]);

    
    const searchRecipe = async() =>{
        try{
            setRecipeFound(true);
            const searchQuery = query.trim() === '' ? 3017624010701 : query.trim()
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
            setQuery('');
        }
    }

   return (
        <View style={styles.container}>
            <Text style={styles.title}>Search Food</Text>

            {/* Search Input and Button */}
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
                <TouchableOpacity  onPress={searchRecipe}>
                    <Text style={styles.text}>{recipeFound ? 'Searching...' : 'Search'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {{marginRight:10,}}>
                    <Ionicons name = "camera-outline" size = {20} color={colors.text}/>
                </TouchableOpacity>
            </View>

            {/* Results List */}
            <FlatList<Product>
                data={recipe}
                keyExtractor={(item, index) => item.code || index.toString()}
                nestedScrollEnabled
                keyboardShouldPersistTaps="handled"
                style={styles.results}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.productName}>{(item.product_name || 'Unknown Food') + ' Per 100g'}</Text>
                        <Text style={styles.itemName}>Calories: {item.nutriments?.['energy-kcal_100g'] || 'N/A'} kcal</Text>
                        <Text style={styles.itemName}>Carbs: {item.nutriments?.['carbohydrates_100g'] || 'N/A'}g</Text>
                        <Text style={styles.itemName}>Protein: {item.nutriments?.['proteins_100g'] || 'N/A'}g</Text>
                        <Text style={styles.itemName}>Fat: {item.nutriments?.['fat_100g'] || 'N/A'}g</Text>
                        <Text style={styles.itemName}>Sugar: {item.nutriments?.['sugars_100g'] || 'N/A'}g</Text>
                        <Text style={styles.itemName}>Sodium: {item.nutriments?.['sodium_100g'] || 'N/A'} g</Text>
                        <Text style={styles.itemName}>Potassium: {item.nutriments?.['potassium_100g'] || 'N/A'}g</Text>
                        <Text style={styles.itemName}>Iron: {item.nutriments?.['iron_100g'] || 'N/A'}g</Text>
                        <Text style = {styles.itemName}>Information provided by Open Food Facts API</Text>
                    </View>
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