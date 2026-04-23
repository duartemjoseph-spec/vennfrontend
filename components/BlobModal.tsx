import React, { useState } from 'react'
import Modal from '@/components/Modal';
import { Button } from 'flowbite-react';
import { fetchBlob } from '@/lib/blobservices';

type BlobModalProps = {
    isOpen: boolean;
    onClose: () => void;
    uploadImage: string | undefined;
    setUploadImage: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const BlobModal = ({ isOpen, onClose, uploadImage, setUploadImage }: BlobModalProps) => {
    // const [isLoading, setIsLoading] = useState(false)

    const [file, setFile] = useState<File | null>(null);
    const [isFileError, setIsFileError] = useState(false)
    // const [uploadImage, setUploadImage] = useState<string | undefined>(undefined)

    const handleClose = () => {
        onClose();
    }

    // Function that grabs our file
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setIsFileError(false)
        }
    }

    const handleSubmit = async (e: React.SubmitEvent) => {
        // To prevent refreshing the page on submit
        e.preventDefault();
        console.log("submit button invoked!")

        //check if our file is in our useState
        if (!file) {
            console.log("No file selected")
            setIsFileError(true);
            return;
        }
        console.log(file)
        // we are using DateTime Now to prevent duplicate files within our blob
        const uniqueFile = `${Date.now()}-${file.name}`

        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", uniqueFile);

        const uploadedBlobUrl = await fetchBlob(formData);
        if (uploadedBlobUrl) {
            console.log('File has been uploaded this is the file path: ' + uploadedBlobUrl);
            setUploadImage(uploadedBlobUrl);
        }
        // from here we will save our url into our database!
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <form className='space-y-4' onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label htmlFor='file' className="text-2xl font-bold text-zinc-900">Upload Image Here</label>
                    {isFileError &&
                        (<p className="mt-2 text-sm text-red-600">
                            No File has been selected!
                        </p>)
                    }
                </div>

                {/* <div className="relative mb-5"> */}
                <input onChange={handleFileChange} className={`text-black h-20 border rounded-sm ${isFileError ? "border-red-500 border-2" : "border-black "}`} type="file" id='file' name='file' />

                <Button type='submit' className=''>Upload</Button>
                {/* </div> */}

            </form>

            <div className='bg-gray-200'>
                <h1 className='text-black'>Image Uploaded!</h1>
                <img src={uploadImage} alt="Image uploaded" />
            </div>

        </Modal>
    )
}

export default BlobModal