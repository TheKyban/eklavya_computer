export default function ToCapitalize(name: string): string {
    let newName: string = "";
    for (let str of name.split(" ")) {
        newName += str.charAt(0).toUpperCase() + str.slice(1) + " ";
    }
    return newName;
}
