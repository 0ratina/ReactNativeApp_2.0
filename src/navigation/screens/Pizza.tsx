import { Text } from '@react-navigation/elements';
import { StaticScreenProps } from '@react-navigation/native';
import { StyleSheet, View, ScrollView, Image, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

type Book = {
  id: string;
  title: string;
  author: string;
  coverUri: string;
};

export function Pizza() {
  const [books, setBooks] = useState<Book[]>([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [coverUri, setCoverUri] = useState<string | null>(null);

  // Load saved books
  useEffect(() => {
    (async () => {
      const jsonValue = await AsyncStorage.getItem('books');
      if (jsonValue) setBooks(JSON.parse(jsonValue));
    })();
  }, []);

  const saveBooks = async (updatedBooks: Book[]) => {
    setBooks(updatedBooks);
    await AsyncStorage.setItem('books', JSON.stringify(updatedBooks));
  };

  const addBook = async () => {
    if (!title || !author || !coverUri) return alert('Please fill all fields and pick a cover');
    const newBook: Book = {
      id: Date.now().toString(),
      title,
      author,
      coverUri,
    };
    const updated = [...books, newBook];
    await saveBooks(updated);
    setTitle('');
    setAuthor('');
    setCoverUri(null);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setCoverUri(result.assets[0].uri);
    }
  };

    // 🗑️ Delete a book
  const deleteBook = async (id: string) => {
    const updated = books.filter((book) => book.id !== id);
    await saveBooks(updated);
  };



  return (
    <View style={styles.container}>
      <Text style={styles.header}>📚 My Book Collection</Text>

      <TextInput
        style={styles.input}
        placeholder="Book Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Author"
        value={author}
        onChangeText={setAuthor}
      />
      <Button title="Pick Cover Image" onPress={pickImage} />
      {coverUri && <Image source={{ uri: coverUri }} style={styles.image} />}
      <Button title="Add Book" onPress={addBook} />

      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Image source={{ uri: item.coverUri }} style={styles.bookImage} />
            <View>
              <Text style={styles.bookTitle}>{item.title}</Text>
              <Text>{item.author}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteBook(item.id)} style={styles.deleteButton}>
              <Text style={{ color: 'white' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  image: { width: 120, height: 160, marginVertical: 10, borderRadius: 8 },
  bookItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  bookImage: { width: 50, height: 70, marginRight: 10, borderRadius: 5 },
  bookTitle: { fontWeight: 'bold' },
  deleteButton: {
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
});



// type User = {
//   name: string;
//   age: number;
// };

// type Book = {
//   id: string;
//   title: string;
//   author: string;
//   coverUri: string; // URI to image
// };

// const saveBooks = async (books: Book[]) => {
//   try {
//     await AsyncStorage.setItem('books', JSON.stringify(books));
//   } catch (e) {
//     console.error('Error saving books', e);
//   }
// };

// const getBooks = async (): Promise<Book[]> => {
//   try {
//     const jsonValue = await AsyncStorage.getItem('books');
//     return jsonValue != null ? JSON.parse(jsonValue) : [];
//   } catch (e) {
//     console.error('Error loading books', e);
//     return [];
//   }
// };

// import * as ImagePicker from 'expo-image-picker';

// const addBook = async () => {
//   const result = await ImagePicker.launchImageLibraryAsync({
//     mediaTypes: ImagePicker.MediaTypeOptions.Images,
//     allowsEditing: true,
//     quality: 1,
//   });

//   if (!result.canceled) {
//     const books = await getBooks();
//     const newBook: Book = {
//       id: Date.now().toString(),
//       title: 'My Book',
//       author: 'Author Name',
//       coverUri: result.assets[0].uri,
//     };
//     books.push(newBook);
//     await saveBooks(books);
//     <FlatList
//   data={books}
//   keyExtractor={(item) => item.id}
//   renderItem={({ item }) => (
//     <View>
//       <Image source={{ uri: item.coverUri }} style={{ width: 100, height: 150 }} />
//       <Text>{item.title}</Text>
//       <Text>{item.author}</Text>
//     </View>
//   )}
// />
//   }
// };

// export function Pizza() {
//   const [user, setUser] = useState<User>({ name: '', age: 0 });
//   const [nameInput, setNameInput] = useState<string>('');
//   const [ageInput, setAgeInput] = useState<string>(''); // store as string for input field

//   // Load user from AsyncStorage
//   const loadUser = async () => {
//     try {
//       const jsonValue = await AsyncStorage.getItem('user');
//       if (jsonValue != null) {
//         const storedUser: User = JSON.parse(jsonValue);
//         setUser(storedUser);
//         setNameInput(storedUser.name);
//         setAgeInput(storedUser.age.toString());
//       }
//     } catch (e) {
//       console.error('Error loading user', e);
//     }
//   };

//   // Save user to AsyncStorage
//   const saveUser = async () => {
//     try {
//       const updatedUser: User = { name: nameInput, age: Number(ageInput) };
//       await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
//       setUser(updatedUser);
//     } catch (e) {
//       console.error('Error saving user', e);
//     }
//   };

//   useEffect(() => {
//     loadUser();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={pizzastyle.label}>Name:</Text>
//       <TextInput
//         style={styles.input}
//         value={nameInput}
//         onChangeText={setNameInput}
//         placeholder="Enter name"
//       />
//       <Text style={pizzastyle.label}>Age:</Text>
//       <TextInput
//         style={styles.input}
//         value={ageInput}
//         onChangeText={setAgeInput}
//         keyboardType="numeric"
//         placeholder="Enter age"
//       />
//       <Button title="Save User" onPress={saveUser} />
//       <View style={{ marginTop: 20 }}>
//         <Text>Saved User: {user.name ? `${user.name}, ${user.age}` : 'No user saved'}</Text>
//       </View>
//     </View>
//   );
// }

// const pizzastyle = StyleSheet.create({
//   container: { padding: 20 },
//   label: { fontWeight: 'bold', marginTop: 10 },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginTop: 5,
//     borderRadius: 5,
//   },
// });


// type Props = StaticScreenProps<{
//   user: string;
// }>;

// type User = {
//   name: string;
//   age: number;
// };

// const storeUser = async (user: User) => {
//   try {
//     const jsonValue = JSON.stringify(user);
//     await AsyncStorage.setItem('user', jsonValue);
//     console.log('User saved');
//   } catch (e) {
//     console.error('Error saving user', e);
//   }
// };

// const getUser = async (): Promise<User | null> => {
//   try {
//     const jsonValue = await AsyncStorage.getItem('user');
//     return jsonValue != null ? JSON.parse(jsonValue) as User : null;
//   } catch (e) {
//     console.error('Error reading user', e);
//     return null;
//   }
// };

// const removeUser = async () => {
//   try {
//     await AsyncStorage.removeItem('user');
//     console.log('User removed');
//   } catch (e) {
//     console.error('Error removing user', e);
//   }
// };

// export function Pizza() {
//   const [user, setUser] = useState<User | null>(null);

//   const saveUser = async () => {
//     const newUser: User = { name: 'Alice', age: 25 };
//     await storeUser(newUser);
//   };

//   const loadUser = async () => {
//     const storedUser = await getUser();
//     setUser(storedUser);
//   };

//   useEffect(() => {
//     loadUser();
//   }, []);

//   return (
//     <View style={{ padding: 20 }}>
//       <Text>User: {user ? `${user.name}, ${user.age}` : 'No user found'}</Text>
//       <Button title="Save User" onPress={saveUser} />
//       <Button title="Reload User" onPress={loadUser} />
//     </View>
//   );
// }






// export function Pizza({ route }: Props) {
//   const [text, setText] = useState('');
  
//   return (
//     <View style={styles.container}>
//       <Image
//           source={{
//             uri: 'https://i.pinimg.com/736x/3d/11/d1/3d11d1e94a816f510d86be9790ef1a73.jpg',
//           }}
//           style={{width: 200, height: 200}}
//         />
//       <ScrollView>
//       <TextInput
//         style={{height: 40, padding: 5}}
//         placeholder="Type to get Pizza!"
//         onChangeText={newText => setText(newText)}
//         defaultValue={text}
//       />
//       <Text style={{padding: 10, fontSize: 42}}>
//         {text
//           .split(' ')
//           .map(word => word && '🍕')
//           .join(' ')}
//       </Text>
//     </ScrollView>
//       <Text>{route.params.user}working?</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: 10,
//     paddingTop:50
//   },
// });

export default Pizza;

