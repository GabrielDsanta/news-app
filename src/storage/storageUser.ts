import AsyncStorage from "@react-native-async-storage/async-storage"

import { USER_STORAGE } from "./storageConfig";


export async function StorageUserSave(username: string, password: string){
    await AsyncStorage.setItem(USER_STORAGE, JSON.stringify({ username, password }))
}

export async function StorageUserGet(){
    const storage = await AsyncStorage.getItem(USER_STORAGE)

    const user = storage ? JSON.parse(storage) : {}

    return user
}

export async function StorageUserRemove(){
    await AsyncStorage.removeItem(USER_STORAGE)
}