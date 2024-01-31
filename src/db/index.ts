import { JSONFile, JSONFilePreset } from 'lowdb/node'
import { EventEmitter } from 'events';
import { Low } from 'lowdb/lib';

export interface Structure {
    tests : Tests;
};

export type Tests = Record<string, Test>;

export interface Test {
    times : number;
    name : string;
    description : string;
    questions : Question[];
};

export interface Question {
    question : string;
    answer : string;
    good : number;
    bad : number;
};

export default class Database {

    private static readonly FILES : string = __dirname + "/files";
    private static readonly structure : Structure = {
        tests : {}
    };

    private static events : EventEmitter = new EventEmitter();
    public static db : Low<Structure>;

    public static emit(event : string, msg? : any){
        this.events.emit(event, msg);
    };

    public static on(event : string, cb : (msg? : any) => void){
        this.events.on(event, cb);
    };

    public static async load() : Promise<void> {
        this.db = await JSONFilePreset(this.FILES + '/tests.json', this.structure)
        this.emit("loaded");
        /*// Update db.json
        await db.update(({ posts }) => posts.push('hello world'))

        // Alternatively you can call db.write() explicitely later
        // to write to db.json
        db.data.posts.push('hello world')
        await db.write()*/
    };
};