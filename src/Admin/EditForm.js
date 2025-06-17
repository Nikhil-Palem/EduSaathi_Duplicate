import React, { forwardRef, useImperativeHandle, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './EditForm.css';

const EditForm = forwardRef(({ file }, ref) => {
    const { register, handleSubmit, setValue } = useForm();
    const [data, setData] = useState({
        username: '',
        name: '',
        college_link: '',
        contactNumber: '',
        acronym: '',
        address: '',
        collegeType: '',
        city: '',
        email: '',
        state: '',
    });
    const navigate = useNavigate();
    const [id, setId] = useState('');

    useImperativeHandle(ref, () => ({
        submitForm: () => {
            handleSubmit(submit)();
        }
    }));

    const getAdmin = async () => {
        return await axios.get("http://localhost:8080/api/v1/admin/verify", {
            withCredentials: true
        });
    };

    useEffect(() => {
        getAdmin().then((res) => {
            const fetchData = res.data.data;
            setId(fetchData._id);
            setData({
                username: fetchData.username,
                name: fetchData.name,
                college_link: fetchData.college_link,
                contactNumber: fetchData.contactNumber,
                acronym: fetchData.acronym,
                address: fetchData.address,
                collegeType: fetchData.collegeType,
                city: fetchData.city,
                state: fetchData.state,
                email: fetchData.email,
            });
            setValue('collegeType', fetchData.collegeType);
        }).catch((e) => {
            console.log(e);
        });
    }, [setValue]);

    const submit = async (formData) => {
        try {
            const formDataWithFile = new FormData();

            // Append all form fields
            for (const key in formData) {
                formDataWithFile.append(key, formData[key]);
            }

            // Append file if exists
            if (file) {
                formDataWithFile.append('profileImage', file);
            }

            await axios.put(`http://localhost:8080/api/v1/admin/edit/${id}`, formDataWithFile, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            navigate('/admin-profile');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleRadioChange = (value) => {
        setData(prev => ({
            ...prev,
            collegeType: value
        }));
        setValue('collegeType', value);
    };

    return (
        <div className="flex-center">
            <form onSubmit={handleSubmit(submit)} className="edit-form">
                <label className="form-label">
                    Username:
                    <input
                        className="form-input"
                        {...register("username", { required: true })}
                        defaultValue={data.username}
                    />
                </label>

                <label className="form-label">
                    Name of College:
                    <input
                        className="form-input"
                        type="text"
                        {...register("name", { required: true })}
                        defaultValue={data.name}
                    />
                </label>

                <label className="form-label">
                    Email:
                    <input
                        className="form-input"
                        type="email"
                        defaultValue={data.email}
                        {...register("email", { required: true })}
                    />
                </label>

                <label className="form-label">
                    Contact Number:
                    <input
                        className="form-input"
                        defaultValue={data.contactNumber}
                        {...register("contactNumber", { required: true })}
                    />
                </label>

                <div className="radio-group">
                    <div className="radio-container">
                        <input
                            type="radio"
                            value="Public"
                            {...register("collegeType", { required: true })}
                            id="public"
                            className="radio-input"
                            checked={data.collegeType === 'Public'}
                            onChange={() => handleRadioChange('Public')}
                        />
                        <label htmlFor="public" className="radio-label">Public</label>
                    </div>
                    <div className="radio-container">
                        <input
                            type="radio"
                            id="private"
                            {...register("collegeType", { required: true })}
                            value="Private"
                            className="radio-input"
                            checked={data.collegeType === 'Private'}
                            onChange={() => handleRadioChange('Private')}
                        />
                        <label htmlFor="private" className="radio-label">Private</label>
                    </div>
                </div>

                <label className="form-label">
                    College Address:
                    <input
                        className="form-input"
                        type="text"
                        defaultValue={data.address}
                        {...register("address", { required: true })}
                    />
                </label>

                <label className="form-label">
                    City:
                    <input
                        className="form-input"
                        type="text"
                        defaultValue={data.city}
                        {...register("city", { required: true })}
                    />
                </label>

                <label className="form-label">
                    State:
                    <input
                        className="form-input"
                        type="text"
                        defaultValue={data.state}
                        {...register("state", { required: true })}
                    />
                </label>

                <label className="form-label">
                    Acronym for College:
                    <input
                        className="form-input"
                        type="text"
                        defaultValue={data.acronym}
                        {...register("acronym", { required: true })}
                    />
                </label>

                <label className="form-label">
                    College Website link:
                    <input
                        className="form-input"
                        type="url"
                        defaultValue={data.college_link}
                        {...register("college_link", { required: true })}
                    />
                </label>
            </form>
        </div>
    );
});

export default EditForm;