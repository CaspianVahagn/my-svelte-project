
import {Plugins} from "@capacitor/core";
export const {Storage} = Plugins



export class storageService{

    static saveString(key:string,value:string){
        Storage.set({key,value})

    }


    static loadString(key:string): Promise<object> {
        return Storage.get({key});
    }
}
