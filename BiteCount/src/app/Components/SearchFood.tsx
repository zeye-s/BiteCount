import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native';
import {useState} from 'react';
import {colors, globalStyles} from '../../../styles/global';

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
            const result = await fetch(`https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(query)}?&page_size=20&fields=code,product_name,nutriments`,
            {
                headers: {
                        // Open Food Facts requires a custom User-Agent header
                        'User-Agent': 'MyFoodApp/1.0 (ziyishen2010@gmail.com)',
                    },
            });
            
            if(!result.ok){
                throw new Error;
            }
            const data = await result.json();
            
            setRecipe([data.product]);
            return (data); 
            
            }
        catch(error){
            console.error('could not fetch this', error);
        }
        finally{
            setRecipeFound(false);
        }
    }

   return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Search Food</Text>

            {/* Search Input and Button */}
            <View>
                <TextInput 
                    style={styles.search}
                    placeholder="Enter a food Barcode(e.g., 3017624010701)..."
                    placeholderTextColor={colors.textSecondary}
                    value={query}
                    onChangeText={setQuery}
                />
            </View>
            
            <TouchableOpacity style={styles.searchButton} onPress={searchRecipe}>
                <Text style={styles.text}>{recipeFound ? 'Searching...' : 'Search'}</Text>
            </TouchableOpacity>

            {/* Results List */}
            <FlatList<Product>
                data={recipe}
                keyExtractor={(item, index) => item.code || index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.productName}>{item.product_name + ' Per 100g'|| 'Unknown Food'}</Text>
                        <Text style={styles.itemName}>Calories: {item.nutriments?.['energy-kcal_100g'] || 'N/A'} kcal</Text>
                        <Text style={styles.itemName}>Carbs: {item.nutriments?.['carbohydrates_100g'] || 'N/A'}g</Text>
                        <Text style={styles.itemName}>Protein: {item.nutriments?.['proteins_100g'] || 'N/A'}g</Text>
                        <Text style={styles.itemName}>Fat: {item.nutriments?.['fat_100g'] || 'N/A'}g</Text>
                        <Text style={styles.itemName}>Sugar: {item.nutriments?.['sugars_100g'] || 'N/A'}g</Text>
                        <Text style={styles.itemName}>Sodium: {item.nutriments?.['sodium_100g'] || 'N/A'}g</Text>
                        <Text style={styles.itemName}>Potassium: {item.nutriments?.['potassium_100g'] || 'N/A'}g</Text>
                        <Text style={styles.itemName}>Iron: {item.nutriments?.['iron_100g'] || 'N/A'}g</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    search: {
        backgroundColor: colors.header,
        borderRadius: 10,
        color: colors.text,
        padding: 10,
        marginBottom: 10,
    },
    searchButton: {
        backgroundColor: colors.surface,
        borderRadius: 20,
        width: 200,
        padding: 10,
        marginBottom: 15,
    },
    text: {
        color: colors.text,
        textAlign: 'center',
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