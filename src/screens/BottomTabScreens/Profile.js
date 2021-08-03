import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Searchbar } from "react-native-paper";

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

    <View style={{ flex: 1, padding: 24 }}>
	<Searchbar
				placeholder="Search"
				onChangeText={(text) => {
					if (searchTimer) {
						clearTimeout(searchTimer);
					}
					setInput(text);
					setSearchTimer(
						setTimeout(() => {
							fetchData(text);
							
						}, 4000),
					);
				}}
				value={input}
			/>
      {isLoading ? <Text>Loading...</Text> : 
      ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
          <Text style={{ fontSize: 18, color: 'teal', textAlign: 'center'}}>{data.results[0].openfda.generic_name[0]}</Text>
          
          <FlatList
            data={data.results}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Text>{item.purpose + '... ' + item.dosage_and_administration}</Text>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default Profile;
