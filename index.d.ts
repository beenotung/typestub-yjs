/// <reference path="./node_modules/typestub-ipfs/index.d.ts" />


export class YConfig<YShare> {
    options: Options;
    share: YShare;
}

export type ConnectorType = "webrtc" | "websockets-client" | "ipfs";
export type RoleType = "master";
export type DBType = "memory" | "indexeddb";
export type DataType = "Array" | "Map" | "Text";

export interface Options {
    connector: {
        ipfs?: ipfs;
        name: ConnectorType;
        role: RoleType;
        room: string;
    };
    db: {
        name: DBType;
    };
    share: {
        [key: string]: DataType;
    }
    types: any[];
}

export class YShare {
    [key: string]: DataType;
}

export interface YEventBase<O> {
    name: string;
    object: O;
}

export interface YEvent<O, A>extends YEventBase<O> {
    type: "add" | "update" | "delete";
    value: A;
}

export interface YArrayEvent<O, A>extends YEventBase<O> {
    type: "insert" | "delete";
    index: number;
    values: A[];
    length: number;
}

type YObserver<O, Event extends YEventBase<O>> = (event: Event) => any;

export class YMap<O, A> {
    get(key: string): A;

    set(key: string, value: A);

    delete(key: string);

    keys(): string[];

    observe(observer: YObserver<O, YEvent<O, A>>);

    observeDeep(f: (event: YEvent<O, A>) => any);

    /**@deprecated*/
    observePath(path: string[], observer: YObserver<O, YEvent<O, A>>);

    unobserve(f: YObserver<O, YEvent<O, A>>);
}

export class YArray<O, A> {
    insert(position, contents: A[]);

    push(content: A);

    delete(position: number, length: number);

    toArray(): A[];

    get(position: number): A;

    observe(f: YObserver<O, YArrayEvent<O, A>>);

    observeDeep(f: YObserver<O, YArrayEvent<O, A>>);

    unobserve(f: YObserver<O, YArrayEvent<O, A>>);
}

export namespace Y {
}
