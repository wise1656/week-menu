import React from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); // Переход на предыдущую страницу в истории
    };

    return (
        <IconButton onClick={handleBackClick} aria-label="Назад">
            <ArrowBackIcon />
        </IconButton>
    );
};

export default BackButton;
