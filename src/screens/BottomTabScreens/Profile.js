import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Searchbar, TextInput, Button } from "react-native-paper";


const Profile = () => {
	const [isLoading, setLoading] = useState(true);
  	const [data, setData] = useState([]);
	  const [input, setInput] = useState("");
	  const [searchTimer, setSearchTimer] = useState(null);
  	console.log(data);

 async function fetchData(text) {
		 await fetch(
			`https://api.fda.gov/drug/label.json?api_key=YGnrElT0aruhl4Qbc57LH05cJaQHsNm8lDgzITVz&search=${text}`,
		) .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
	}

  return (

    <View style={{ flex: 1, padding: 20, marginTop: 30 }}>
	<TextInput
      label="Search"
      value={input}
      onChangeText={text => setInput(text)}
	  right={<TextInput.Icon name="magnify" 
	  onPress={() => {
            fetchData(input);
         }}  
		 
	  />}
	  
    />
	
      {isLoading ? <Text>Loading...</Text> : 
      ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
          <Text style={{ fontSize: 18, color: 'teal', textAlign: 'center'}}>{input}</Text>
          
          <FlatList
            data={data.results}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
				<View>
              		<Text>{item.indications_and_usage + '                 ' + item.dosage_and_administration}</Text>
			 	 </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default Profile;
