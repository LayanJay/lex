import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import create from 'zustand'
import { auth, db } from '../firebaseConfig'
import { AuthSliceType } from '../types'

export const useAuth = create<AuthSliceType>(set => ({
  user: null,
  loading: true,
  setUser: user => set({ user }),
  setLoading: loading => set({ loading }),

  // Auth actions
  signIn: async ({ email, password }) => {
    return await signInWithEmailAndPassword(auth, email, password)
      .then(async userCred => {
        return userCred['user']
      })
      .catch(err => {
        throw err
      })
  },

  signUp: async ({ firstname, lastname, occupation, nic, email, password }) => {
    return await createUserWithEmailAndPassword(auth, email, password)
      .then(async userCred => {
        await updateProfile(userCred['user'], {
          displayName: `${firstname} ${lastname}`,
        })

        const docRef = doc(db, 'users', userCred.user.uid)
        await setDoc(docRef, {
          email,
          firstname,
          lastname,
          occupation,
          nic,
          joinedDate: serverTimestamp(),
          role: 'user',
          uid: userCred.user.uid,
        })

        const newUserCred = await userCred.user.getIdTokenResult(true)
        set({ user: { ...userCred.user, ...newUserCred }, loading: false })
        return userCred['user']
      })
      .catch(err => {
        throw err
      })
  },

  signOut: async () => {
    await signOut(auth).catch(err => {
      throw err
    })
  },
}))
