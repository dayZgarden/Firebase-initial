import { useState } from 'react'
import React from 'react';
import './App.css'
import { auth, db } from './firebase/init'
import { collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc, deleteDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword,
          signInWithEmailAndPassword,
          signOut,
          onAuthStateChanged  } from "firebase/auth";
import { async } from '@firebase/util';

function App() {
  const [user, setUser] = React.useState({})
  const [loading, setLoading] = React.useState(true)

  async function updatePost () {
    const hardcodeID = '5wywBYXQIBSQp439J1Ld'
    const docRef = doc(db, 'posts', hardcodeID);
    const post = await getPostById(hardcodeID)
    const newPost = {
      ...post,
      title: 'land a 600k job'
    }
    updateDoc(docRef, newPost)
  }

  function deletePost(){
    const hardcodeID = '5wywBYXQIBSQp439J1Ld'
    const docRef = doc(db, 'posts', hardcodeID);
    deleteDoc(docRef)
  }

  function createPost() {
    const post = {
      title: 'finish interview section',
      description: 'finish FES',
      uid: user.uid
    };
    addDoc(collection(db, 'posts'), post)
  }

  async function getAllPosts () {
    const { docs } = await getDocs(collection(db, 'posts'))
    const posts = docs.map((doc) => ({ ...doc.data(), id: doc.id}));
    }

  async function getPostById(id) {
    const docRef = doc(db, 'posts', id);
    const docSnap = await getDoc(docRef)
    return postSnap.data();
  }

  async function getPostByUid() {
    const postCollectionRef = await query(
      collection(db, 'posts'),
      where('uid', '==', '1')
    )
    const { docs } = await getDocs(postCollectionRef)
  }
  

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => { 
      setLoading(false)
      console.log(user)
      if (user) {
        setUser(user)
      }
    })
  }, [])
  function register() {
    createUserWithEmailAndPassword(auth, 'email@email.com', 'test123')
    .then((user) => {
      console.log(user)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  function login() {
    signInWithEmailAndPassword(auth, 'email@email.com', 'test123')
    .then(( {user} ) => {
      setUser(user);
    })
    .catch((error) => {
      console.log(error)
    })
  }

  function logout() {
    signOut(auth);
    setUser({})
  }

  return (
    <div className="App">
      <button onClick = {register} >Register</button>
      <button onClick = {login} >Login</button>
      <button onClick = {logout} >Log out</button>
      {loading ? 'loading...' :  user.email}
      <button onClick = {createPost} >Create Post</button>
      <button onClick = {getAllPosts} >Get All Posts</button>
      <button onClick = {getPostById} >Get Post By Id</button>
      <button onClick = {getPostByUid} >Get Post By uId</button>
      <button onClick = {updatePost} >Update Posts</button>
      <button onClick = {deletePost} >delete Posts</button>
    </div>
    
  )
  }

export default App
