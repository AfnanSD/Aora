import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';
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
const storage = new Storage(client);

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

        await signIn(email, password);

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

export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password);
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
        //   const currentAccount = await getAccount();
        const currentAccount = await account.get();
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

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.orderAsc('$createdAt')]
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            //not really latest video but for better UI ;)
            [Query.orderAsc('$createdAt', Query.limit(5))]
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.search('title', query)]
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.equal('creator', userId)]
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const signOut = async () => {
    // console.log('sign out');
    try {
        // console.log('sign out try 1');
        // const session = await account.deleteSession("current");
        // // console.log('sign out try 2');

        // return session;
        const session = await account.deleteSession("current");

        return session;
    } catch (error) {
        // console.log('sign out catch');

        throw new Error(error);
    }
}

export const getFilePreview = async (fileId, type) =>{
    let fileUrl;
    try {

        if (type === 'video') {
            fileUrl = storage.getFileView(appwriteConfig.storageId,fileId);
        } else if(type==='image'){
            fileUrl = storage.getFilePreview(appwriteConfig.storageId,fileId,2000,2000,'top',100);
        }else{
            throw new Error('Invalid file type');
        }

        if (!fileUrl) throw Error;

        return fileUrl;
        
    } catch (error) {
        throw new Error(error);
    }
}

 export const uploadFile = async (file,type) =>{
    if (!file) return;

    // const {mimeType,...rest} = file;
    const asset = {
        name:file.fileName,
        type:file.mimeType,
        size:file.fileSize,
        uri:file.uri,
    };

    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            asset
        );
         const fileUrl = await getFilePreview(uploadedFile.$id,type);
         return fileUrl;
    } catch (error) {
        throw new Error(error);
    }
 }

export const createVideo = async (form) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail,'image'),
            uploadFile(form.video,'video')
        ])

        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            ID.unique(),
            {
                title: form.title,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                creator: form.userId
            }
        )

        return newPost;
    } catch (error) {
        throw new Error(error);
    }
}