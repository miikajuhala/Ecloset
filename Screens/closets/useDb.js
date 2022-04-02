import { useState, useEffect } from 'react';
import { storage } from '../../firebase';

export default function useDb(collection) {
  const [docs, setDocs] = useState([]);

//   useEffect(() => {
//     const unsub = storage.collection(collection)
//       .onSnapshot(snap => {
//         let documents = [];
//         snap.forEach(doc => {
//           documents.push({...doc.data(), id: doc.id});
//         });
//         setDocs(documents);
//       });

//     // return () => unsub();
//     // this is a cleanup function that react will run when
//     // a component using the hook unmounts
//   }, [collection]);

  return { docs };
}