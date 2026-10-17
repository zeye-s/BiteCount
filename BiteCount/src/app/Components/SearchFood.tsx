import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native';
import {useState} from 'react';
import {colors, globalStyles} from '../../../styles/global';

export default function Search(){
    const [recipeFound, setRecipeFound] = useState(false);
    const [query, setQuery] = useState('');
    const[recipe, setRecipe] = useState<any[]>([]);

    
    const searchRecipe = async(query: any): Promise<any> =>{
        try{
            const result = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&json=1`);
            if(!result.ok){
                throw new Error;
            }
            const data = await result.json();
            setRecipeFound(true);
            setRecipe(data);
            return (data); 
            
            }
        catch(error){
            console.error(error);
        }
        finally{
            setRecipeFound(false);
        }
    }

    return(
       <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Search Food</Text>

      {/* Search Input and Button */}
      <View>
        <TextInput
          
          placeholder="Search for a food (e.g., banana, oats)..."
          placeholderTextColor={colors.textSecondary}
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity  onPress={searchRecipe}>
          <Text >{recipeFound ? 'Searching...' : 'Search'}</Text>
        </TouchableOpacity>
      </View>

      {/* Results List */}
      <FlatList
        data={recipe}
        keyExtractor={(item, index) => item.code || index.toString()}
        renderItem={({ item }) => (
          <View >
            <Text >{item.product_name || 'Unknown Food'}</Text>
            <Text>
              Calories: {item.nutriments?.['energy-kcal_100g'] || 'N/A'} kcal per 100g
            </Text>
          </View>
        )}
      />
    </View>
    )
    
    
}