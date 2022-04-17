import React from 'react';
import { useAuth } from '../Context/authContext';
import DeleteIcon from '@mui/icons-material/Delete';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { EditModal } from './Edit';
import './Delete.css';
import { MenuEditDelete } from './MenuEditDelete';

export const Delete = ({ id, avatar, setPosts }) => {
  const postsCollectionRef = collection(db, 'Posts');
  //Eliminar Post
  const deletePost = async (id) => {
    console.log(id);
    try {
      //Eliminar
      await deleteDoc(doc(db, 'Posts', id));
      console.log('Document deleted with ID: ', id);
      //Actualizar estado
      getAllData();
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  //Traer nueva data actualizada
  const getAllData = async () => {
    const data = await getDocs(postsCollectionRef);
    //Actualizar estado
    setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  return (
    <div>
      <DeleteIcon onClick={() => deletePost(id)} className="DeletePost" />
    </div>
  );
};
