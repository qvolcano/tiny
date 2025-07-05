import Control from "./Control";
export default class Context {
    controls: {
        [key: string]: Control;
    };
    registerControl(): void;
}
