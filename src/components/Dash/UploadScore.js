import React, {useContext, useState} from 'react';
import ApplicationContext from "../../context/ApplicationContext.js";

const UploadScore = ({ examName }) => {
    const [file, setFile] = useState(null);
    const { testScore, handleTestChange } = useContext(ApplicationContext);
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            console.log(`File selected for ${examName}:`, selectedFile.name);
        }
    };

    const handleUpload = () => {
        if (file) {
            // // Perform upload logic here (e.g., API call)
            // console.log(`Uploading file for ${examName}:`, file.name);
            handleTestChange('testScore',{
                ...testScore,
                [examName]: file
            } );
            // alert(`File uploaded for ${examName}: ${file.name}`);
        } else {
            alert('Please select a file to upload.');
        }

    };

    return (
        <div className="upload-score">
            <h4>{examName}</h4>
            <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
            />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default UploadScore;