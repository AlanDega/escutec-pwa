import firebase from 'firebase/app'
import 'firebase/firestore'

// Get a Firestore instance
export const db = firebase
  .initializeApp({ 
      projectId: 'escutec-84dfe',
      apiKey: "AIzaSyAjkPQm8yJDzckoh9Cm_Yufd5WUj7wpCHA",
        })
  .firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }
