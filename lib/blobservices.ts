
// VENN API link
const url = 
// "https://venngroupapi-emashqggf5gphwax.westus3-01.azurewebsites.net";
"https://vennbackendapi-akghachgbhgdccfe.westus3-01.azurewebsites.net";
// "http://localhost:5131"

const blobUrl = 
"https://vennblobstorage.blob.core.windows.net/vennblobimages";

export const fetchBlob = async (params: FormData) => {
    const response = await fetch(url + "/blob/uploadfile", {
        "method": "POST",
         // Since our Params is of type FormData, we do not have to stringify it!
        body: params
    });
    
    console.log(response)
    if(response.ok){
        // so we are extracting the file name from our file as a string
        const fileName = params.get("fileName") as string;

        // we are constructing the Blob File name
        const uploadFileUrl = `${blobUrl}/${fileName}`;

        return uploadFileUrl; // this string will be saved into our database!
    }else{
        return null;
    }
}
