import path from "path";

export function getAddress(url){
    const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
    const fileName=url.split('/')[4]
    return (path.join(UPLOAD_DIR,fileName))
}