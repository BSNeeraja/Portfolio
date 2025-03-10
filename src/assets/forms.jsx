import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './forms.css';

function FormsPage() {
    const [formData, setFormData] = useState({ id: '', name: '', age: '' });
    const [people, setPeople] = useState(() => {
        const savedPeople = localStorage.getItem('people');
        return savedPeople ? JSON.parse(savedPeople) : [];
    });
    const [nameError, setNameError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false); // Form validity
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('people', JSON.stringify(people));
    }, [people]);

    // Validate form whenever input changes
    useEffect(() => {
        validateForm();
    }, [formData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'name') validateName(value); // Validate name on input change
    };

    const validateName = (name) => {
        name = name.trim();
        if (!name) {
            setNameError('Name cannot be empty.');
        } else if (!/^[A-Za-z\s]+$/.test(name)) {
            setNameError('Name should contain only alphabets.');
        } else if (name.length < 3 || name.length > 50) {
            setNameError('Name should be between 3 and 50 characters.');
        } else {
            setNameError(''); // Clear error if valid
        }
    };

    const validateForm = () => {
        const isIdValid = formData.id.trim() !== '';
        const isNameValid = formData.name.trim() && !nameError;
        const isAgeValid = formData.age.trim() !== '';
        setIsFormValid(isIdValid && isNameValid && isAgeValid); // Check all fields
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            setPeople([...people, formData]);
            setFormData({ id: '', name: '', age: '' });
            alert('Details added successfully!');
        } else {
            alert('Please fill out all fields correctly.');
        }
    };

    const handleBackClick = () => {
        navigate('/'); // Navigate back to the homepage
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <header>
                <h1>Form</h1>
            </header>
            <p>Enter the details of a person:</p>
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding:'5px' }}>
                <div className='inputdiv'>
                    <input
                        className="input_field"
                        type="text"
                        name="id"
                        value={formData.id}
                        onChange={handleInputChange}
                        placeholder="ID Number"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onBlur={() => validateName(formData.name)}
                        className="input_field"
                        placeholder="Name"
                    />
                    {nameError && <p className="error_message">{nameError}</p>}
                </div>
                <div>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        className="input_field"
                        placeholder="Age"
                    />
                </div>
                <button
                    className="button"
                    type="submit"
                    disabled={!isFormValid} // Button is disabled if form is invalid
                >
                    Submit
                </button>
            </form>
            <button className="button" onClick={handleBackClick}>
                Back to Home
            </button>
        </div>
    );
}

export default FormsPage;
