export const MIN_HEIGHT = "min-h-[calc(100vh-433px)]";
export const MAX_WIDTH = "max-w-[1280px]";

export const LinkStyle =
    "flex gap-2 items-center hover:bg-primary/10 px-3 py-2 rounded transition hover:underline";
export const LinkStyle2 = "text-base font-medium gap-4 py-4 px-3";
export const LinkStyle3 =
    "text-lg font-medium flex items-center gap-3 hover:bg-primary/10 px-3 py-3 rounded-md hover:underline";

export function TO_CAPITALIZE(name: string): string {
    let newName: string = "";
    for (let str of name.split(" ")) {
        newName += str.charAt(0).toUpperCase() + str.slice(1) + " ";
    }
    return newName;
}
