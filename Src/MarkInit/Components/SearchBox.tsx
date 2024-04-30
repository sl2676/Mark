import React, { useRef, useState } from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native';
import { useSearchBox } from 'react-instantsearch-hooks';


export function SearchBox(props) {
  const { query, refine } = useSearchBox(props);
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef(null);
  const [ searchText, setSearchText ] = useState('');
  //console.log(inputValue);
  function setQuery(newQuery) {
    setInputValue(newQuery);
    refine(newQuery);
	
  }

  // Track when the InstantSearch query changes to synchronize it with
  // the React state.
  // We bypass the state update if the input is focused to avoid concurrent
  // updates when typing.
  if (query !== inputValue && !inputRef.current?.isFocused()) {
    setInputValue('');
  }


  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={inputValue}
        onChangeText={(value) => {
			setQuery(value);
			setSearchText(value);
			console.log(searchText);
		}}
		text = {searchText}
        clearButtonMode="while-editing"
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
        autoCompleteType="off"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#252b33',
    padding: 18,
  },
  input: {
    height: 48,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});
