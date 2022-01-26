import React, {useState} from 'react';
import { FaUpload } from 'react-icons/fa';
import ClientDataService from '../services/Service';

interface IProps {
    _id: string;
}

const FileUpload = (props: IProps) => {
    const [selectedFile, setSelectedFile] = useState<File>();
	const [isFilePicked, setIsFilePicked] = useState(false);

	const changeHandler = (event:any) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	const handleSubmission = () => {
        if(selectedFile) {
            const formData = new FormData();

            formData.append('file', selectedFile);
    
            ClientDataService.upload(formData, props._id)
                .then((response) => console.log(response))
                .then((result) => {
                    console.log('Success:', result);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
    
        };
    }
		
    return (
            <div>
                <form>
                    <div className="field">
                        <label className="label" htmlFor="selectedFile">Foto 1</label>
                        <div className={"file" + (selectedFile ? " has-name":"")}>
                            <label className="file-label">
                                <input className="file-input" onChange={changeHandler} type="file" name="file"/>
                                <span className="file-cta">
                                    <span className="file-icon">
                                        <FaUpload/>
                                    </span>
                                    <span className="file-label">
                                        <div>Vybrať...</div>
                                    </span>
                                </span>
                                {selectedFile ? (
                                    <span className="file-name">
                                        <div>{selectedFile.name}</div>
                                        {/* <div>{selectedFile.type}</div>
                                        <div>{selectedFile.size}</div> */}
                                    </span>
                                ) : (
                                    <></>
                                )
                                }
                            </label>
                        </div>
                    </div>
                </form>            
                <div className="buttons mt-4">
                    <button 
                        className="button is-rounded is-info" 
                        onClick={handleSubmission}
                        disabled={selectedFile ? false:true}
                    >
                        Upload
                    </button>
                </div>
		    </div>
    )       
}

export default FileUpload