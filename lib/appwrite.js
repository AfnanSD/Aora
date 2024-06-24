import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';
import { Platform } from "react-native";

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.tmp.aora',
    projectId: '666a93d8002ed7dbc635',
    databaseId: '666a957500393c6707d9',
    userCollectionId: '666a9597002b9de7eee5',
    videoCollectionId: '666a95de002f795edf79',
    storageId: '666a9e82002a2a7fde68'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);

        await signIn(email,password);

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )

        return newUser;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export async function signIn(email, password){
    try {
        const session = await account.createEmailPasswordSession(email,password);
        return session;
    } catch (error) {
        throw new Error(error);
    }
}

// export const getCurrentUser = async () =>{
//     try {
//         const currentAccount = await account.get();

//         if(!currentAccount) throw Error;

//         const currentUser = await databases.listDocuments(
//             appwriteConfig.databaseId,
//             appwriteConfig.userCollectionId,
//             [Query.equal('accountId',currentAccount.$id)]
//         );

//         if(!currentUser) throw Error;

//         return currentUser.documents[0];
//     } catch (error) {
//         console.log(error);
//     }
// }
export async function getCurrentUser() {
    try {
      const currentAccount = await getAccount();
      if (!currentAccount) throw Error;
  
      const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("accountId", currentAccount.$id)]
      );
  
      if (!currentUser) throw Error;
  
      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

export const getAllPosts = async ()=>{
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const getLatestPosts = async ()=>{
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            //not really latest video but for better UI ;)
            [Query.orderAsc('$createdAt', Query.limit(7))]
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const searchPosts = async (query)=>{  
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            //not really latest video but for better UI ;)
            [Query.search('title', query)]
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}