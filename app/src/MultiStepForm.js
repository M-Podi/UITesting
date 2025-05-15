import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import './FormStyles.css';

// Form step components
const PersonalInfoStep = ({ formData, errors, handleChange }) => {
    const [passwordStrength, setPasswordStrength] = useState(0);

    const checkPasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        return strength;
    };

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setPasswordStrength(checkPasswordStrength(password));
        handleChange(e);
    };

    return (
        <div className="form-section">
            <h2 className="section-title">Personal Information</h2>

            <div className="form-group">
                <label htmlFor="firstName" className="form-label">
                    First Name*
                </label>
                <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`form-input ${errors.firstName ? 'error-input' : ''}`}
                    placeholder="Enter your first name"
                />
                {errors.firstName && (
                    <p className="error-message">
                        <AlertCircle className="error-icon" />
                        {errors.firstName}
                    </p>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="lastName" className="form-label">
                    Last Name*
                </label>
                <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`form-input ${errors.lastName ? 'error-input' : ''}`}
                    placeholder="Enter your last name"
                />
                {errors.lastName && (
                    <p className="error-message">
                        <AlertCircle className="error-icon" />
                        {errors.lastName}
                    </p>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="username" className="form-label">
                    Username*
                </label>
                <div className="input-with-icon">
                    <span className="input-icon">@</span>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        className={`form-input with-icon ${errors.username ? 'error-input' : ''}`}
                        placeholder="johndoe123"
                    />
                </div>
                {errors.username && (
                    <p className="error-message">
                        <AlertCircle className="error-icon" />
                        {errors.username}
                    </p>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="password" className="form-label">
                    Password*
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handlePasswordChange}
                    className={`form-input ${errors.password ? 'error-input' : ''}`}
                    placeholder="Create a password"
                />
                <div className="password-meter">
                    <div
                        className={`password-meter-bar strength-${passwordStrength}`}
                    ></div>
                </div>
                <p className="password-strength">
                    {passwordStrength === 0 ? 'Enter password' :
                        passwordStrength === 1 ? 'Weak' :
                            passwordStrength === 2 ? 'Fair' :
                                passwordStrength === 3 ? 'Good' :
                                    'Strong'}
                </p>
                {errors.password && (
                    <p className="error-message">
                        <AlertCircle className="error-icon" />
                        {errors.password}
                    </p>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="dob" className="form-label">
                    Date of Birth*
                </label>
                <input
                    id="dob"
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                    className={`form-input ${errors.dob ? 'error-input' : ''}`}
                />
                {errors.dob && (
                    <p className="error-message">
                        <AlertCircle className="error-icon" />
                        {errors.dob}
                    </p>
                )}
            </div>

            <div className="form-group">
                <label className="form-label">Gender*</label>
                <div className="radio-group">
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={formData.gender === 'male'}
                            onChange={handleChange}
                        />
                        Male
                    </label>
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={formData.gender === 'female'}
                            onChange={handleChange}
                        />
                        Female
                    </label>
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="gender"
                            value="other"
                            checked={formData.gender === 'other'}
                            onChange={handleChange}
                        />
                        Other
                    </label>
                </div>
                {errors.gender && (
                    <p className="error-message">
                        <AlertCircle className="error-icon" />
                        {errors.gender}
                    </p>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="profilePhoto" className="form-label">
                    Profile Photo
                </label>
                <div className="photo-upload">
                    <div className="photo-preview">
                        {formData.profilePhotoPreview ? (
                            <img
                                src={formData.profilePhotoPreview}
                                alt="Profile preview"
                                className="preview-image"
                            />
                        ) : (
                            <span className="photo-placeholder">Photo</span>
                        )}
                    </div>
                    <label className="upload-button">
                        <span>Upload Photo</span>
                        <input
                            id="profilePhoto"
                            name="profilePhoto"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                handleChange({
                                    target: {
                                        name: 'profilePhoto',
                                        value: e.target.files[0]
                                    }
                                });

                                // Create preview
                                if (e.target.files[0]) {
                                    const reader = new FileReader();
                                    reader.onload = (e) => {
                                        handleChange({
                                            target: {
                                                name: 'profilePhotoPreview',
                                                value: e.target.result
                                            }
                                        });
                                    };
                                    reader.readAsDataURL(e.target.files[0]);
                                }
                            }}
                            className="hidden-input"
                        />
                    </label>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="bio" className="form-label">
                    Bio (Markdown supported)
                </label>
                <div className="markdown-editor">
                    <div className="editor-toolbar">
                        <button
                            type="button"
                            onClick={() => {
                                const textarea = document.getElementById('bio');
                                const start = textarea.selectionStart;
                                const end = textarea.selectionEnd;
                                const text = textarea.value;
                                const before = text.substring(0, start);
                                const selection = text.substring(start, end);
                                const after = text.substring(end);

                                const newText = before + '**' + selection + '**' + after;
                                handleChange({
                                    target: {
                                        name: 'bio',
                                        value: newText
                                    }
                                });

                                // Set cursor position
                                setTimeout(() => {
                                    textarea.focus();
                                    textarea.selectionStart = textarea.selectionEnd = start + 2 + selection.length;
                                }, 0);
                            }}
                            className="toolbar-button"
                            title="Bold"
                        >
                            B
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                const textarea = document.getElementById('bio');
                                const start = textarea.selectionStart;
                                const end = textarea.selectionEnd;
                                const text = textarea.value;
                                const before = text.substring(0, start);
                                const selection = text.substring(start, end);
                                const after = text.substring(end);

                                const newText = before + '_' + selection + '_' + after;
                                handleChange({
                                    target: {
                                        name: 'bio',
                                        value: newText
                                    }
                                });

                                // Set cursor position
                                setTimeout(() => {
                                    textarea.focus();
                                    textarea.selectionStart = textarea.selectionEnd = start + 1 + selection.length;
                                }, 0);
                            }}
                            className="toolbar-button italic"
                            title="Italic"
                        >
                            I
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                const textarea = document.getElementById('bio');
                                const start = textarea.selectionStart;
                                const text = textarea.value;
                                const before = text.substring(0, start);
                                const after = text.substring(start);

                                const newText = before + '- ' + after;
                                handleChange({
                                    target: {
                                        name: 'bio',
                                        value: newText
                                    }
                                });

                                // Set cursor position
                                setTimeout(() => {
                                    textarea.focus();
                                    textarea.selectionStart = textarea.selectionEnd = start + 2;
                                }, 0);
                            }}
                            className="toolbar-button"
                            title="List"
                        >
                            •
                        </button>
                    </div>
                    <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows="4"
                        className="markdown-textarea"
                        placeholder="Tell us about yourself..."
                    ></textarea>
                </div>
                <p className="helper-text">Max 500 characters</p>
            </div>
        </div>
    );
};

const ContactInfoStep = ({ formData, errors, handleChange }) => {
    return (
        <div className="form-section">
            <h2 className="section-title">Contact Information</h2>

            <div className="form-group">
                <label htmlFor="email" className="form-label">
                    Email Address*
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? 'error-input' : ''}`}
                    placeholder="your.email@example.com"
                />
                {errors.email && (
                    <p className="error-message">
                        <AlertCircle className="error-icon" />
                        {errors.email}
                    </p>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="phone" className="form-label">
                    Phone Number*
                </label>
                <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`form-input ${errors.phone ? 'error-input' : ''}`}
                    placeholder="(123) 456-7890"
                />
                {errors.phone && (
                    <p className="error-message">
                        <AlertCircle className="error-icon" />
                        {errors.phone}
                    </p>
                )}
            </div>

            <div className="two-column">
                <div className="form-group">
                    <label htmlFor="preferredTime" className="form-label">
                        Preferred Contact Time
                    </label>
                    <input
                        id="preferredTime"
                        name="preferredTime"
                        type="time"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="timezone" className="form-label">
                        Timezone
                    </label>
                    <select
                        id="timezone"
                        name="timezone"
                        value={formData.timezone}
                        onChange={handleChange}
                        className="form-select"
                    >
                        <option value="">Select timezone</option>
                        <option value="GMT-8">Pacific Time (GMT-8)</option>
                        <option value="GMT-7">Mountain Time (GMT-7)</option>
                        <option value="GMT-6">Central Time (GMT-6)</option>
                        <option value="GMT-5">Eastern Time (GMT-5)</option>
                        <option value="GMT+0">Greenwich Mean Time (GMT+0)</option>
                        <option value="GMT+1">Central European Time (GMT+1)</option>
                        <option value="GMT+8">China Standard Time (GMT+8)</option>
                        <option value="GMT+9">Japan Standard Time (GMT+9)</option>
                    </select>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="country" className="form-label">
                    Country*
                </label>
                <div className="datalist-wrapper">
                    <input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        list="countryOptions"
                        className={`form-input ${errors.country ? 'error-input' : ''}`}
                        placeholder="Start typing to search"
                    />
                    <datalist id="countryOptions">
                        <option value="United States" />
                        <option value="Canada" />
                        <option value="United Kingdom" />
                        <option value="Australia" />
                        <option value="Germany" />
                        <option value="France" />
                        <option value="Japan" />
                        <option value="China" />
                        <option value="India" />
                        <option value="Brazil" />
                        <option value="Mexico" />
                        <option value="South Africa" />
                    </datalist>
                </div>
                {errors.country && (
                    <p className="error-message">
                        <AlertCircle className="error-icon" />
                        {errors.country}
                    </p>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="address" className="form-label">
                    Address
                </label>
                <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    className={`form-textarea ${errors.address ? 'error-input' : ''}`}
                    placeholder="Enter your full address"
                ></textarea>
                {errors.address && (
                    <p className="error-message">
                        <AlertCircle className="error-icon" />
                        {errors.address}
                    </p>
                )}
            </div>

            <div className="two-column">
                <div className="form-group">
                    <label htmlFor="city" className="form-label">
                        City*
                    </label>
                    <input
                        id="city"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleChange}
                        className={`form-input ${errors.city ? 'error-input' : ''}`}
                        placeholder="Enter city"
                    />
                    {errors.city && (
                        <p className="error-message">
                            <AlertCircle className="error-icon" />
                            {errors.city}
                        </p>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="zipCode" className="form-label">
                        Zip/Postal Code*
                    </label>
                    <input
                        id="zipCode"
                        name="zipCode"
                        type="text"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className={`form-input ${errors.zipCode ? 'error-input' : ''}`}
                        placeholder="12345"
                    />
                    {errors.zipCode && (
                        <p className="error-message">
                            <AlertCircle className="error-icon" />
                            {errors.zipCode}
                        </p>
                    )}
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="locationMap" className="form-label">
                    Pin Your Location
                </label>
                <div className="map-container">
                    <div className="map-wrapper">
                        <img src="https://via.placeholder.com/400x320" alt="Map placeholder" className="map-image" />
                        <div className="map-pin">
                            <div className="pin-marker">
                                <div className="pin-pulse"></div>
                            </div>
                        </div>
                    </div>
                    <div className="map-controls">
                        <button
                            type="button"
                            className="location-button"
                            onClick={() => {
                                handleChange({
                                    target: {
                                        name: 'location',
                                        value: { lat: 40.7128, lng: -74.0060 }
                                    }
                                });
                            }}
                        >
                            Use Current Location
                        </button>
                    </div>
                </div>
                <p className="helper-text">Click on the map to set your location or use the button.</p>
            </div>
        </div>
    );
};

const PreferencesStep = ({ formData, errors, handleChange }) => {
    const [currentTag, setCurrentTag] = useState('');

    const handleTagKeyDown = (e) => {
        if (e.key === 'Enter' && currentTag.trim()) {
            e.preventDefault();
            if (!formData.skills.includes(currentTag.trim())) {
                handleChange({
                    target: {
                        name: 'skills',
                        value: [...formData.skills, currentTag.trim()]
                    }
                });
            }
            setCurrentTag('');
        }
    };

    const removeTag = (tag) => {
        handleChange({
            target: {
                name: 'skills',
                value: formData.skills.filter(t => t !== tag)
            }
        });
    };

    return (
        <div className="form-section">
            <h2 className="section-title">Preferences</h2>

            <div className="form-group">
                <label className="form-label">
                    Interests (Select at least one)*
                </label>
                <div className="checkbox-group">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            name="interests"
                            value="technology"
                            checked={formData.interests.includes('technology')}
                            onChange={handleChange}
                        />
                        Technology
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            name="interests"
                            value="sports"
                            checked={formData.interests.includes('sports')}
                            onChange={handleChange}
                        />
                        Sports
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            name="interests"
                            value="arts"
                            checked={formData.interests.includes('arts')}
                            onChange={handleChange}
                        />
                        Arts & Culture
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            name="interests"
                            value="science"
                            checked={formData.interests.includes('science')}
                            onChange={handleChange}
                        />
                        Science
                    </label>
                </div>
                {errors.interests && (
                    <p className="error-message">
                        <AlertCircle className="error-icon" />
                        {errors.interests}
                    </p>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="themeColor" className="form-label">
                    Preferred UI Theme Color
                </label>
                <div className="color-picker">
                    <input
                        id="themeColor"
                        name="themeColor"
                        type="color"
                        value={formData.themeColor}
                        onChange={handleChange}
                        className="color-input"
                    />
                    <span className="color-value">{formData.themeColor}</span>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="experienceLevel" className="form-label">
                    Experience Level
                </label>
                <div className="segmented-control">
                    {[1, 2, 3, 4, 5].map((level) => (
                        <button
                            key={level}
                            type="button"
                            onClick={() => {
                                handleChange({
                                    target: {
                                        name: 'experienceLevel',
                                        value: level
                                    }
                                });
                            }}
                            className={`segment-button ${formData.experienceLevel === level ? 'active' : ''}`}
                        >
                            {level === 1 ? 'Beginner' :
                                level === 2 ? 'Novice' :
                                    level === 3 ? 'Intermediate' :
                                        level === 4 ? 'Advanced' : 'Expert'}
                        </button>
                    ))}
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="skills" className="form-label">
                    Skills/Keywords (Press Enter to add)
                </label>
                <div className="tags-container">
                    {formData.skills.map((tag) => (
                        <span key={tag} className="tag">
                            {tag}
                            <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="tag-remove"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
                <input
                    id="skills"
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    className="form-input"
                    placeholder="Type a skill and press Enter"
                />
            </div>

            <div className="form-group">
                <label htmlFor="preferredContact" className="form-label">
                    Preferred Contact Method*
                </label>
                <select
                    id="preferredContact"
                    name="preferredContact"
                    value={formData.preferredContact}
                    onChange={handleChange}
                    className={`form-select ${errors.preferredContact ? 'error-input' : ''}`}
                >
                    <option value="">Select an option</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="text">Text Message</option>
                </select>
                {errors.preferredContact && (
                    <p className="error-message">
                        <AlertCircle className="error-icon" />
                        {errors.preferredContact}
                    </p>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="frequency" className="form-label">
                    Communication Frequency
                </label>
                <div className="range-slider">
                    <span className="range-label">Less</span>
                    <input
                        id="frequency"
                        name="frequency"
                        type="range"
                        min="1"
                        max="5"
                        value={formData.frequency}
                        onChange={handleChange}
                        className="range-input"
                    />
                    <span className="range-label">More</span>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="satisfactionRating" className="form-label">
                    Rate Your Overall Satisfaction with Our Services
                </label>
                <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => {
                                handleChange({
                                    target: {
                                        name: 'satisfactionRating',
                                        value: star
                                    }
                                });
                            }}
                            className="star-button"
                        >
                            {star <= formData.satisfactionRating ? '★' : '☆'}
                        </button>
                    ))}
                </div>
                <p className="rating-text">
                    {formData.satisfactionRating === 0 ? 'Not rated' :
                        formData.satisfactionRating === 1 ? 'Poor' :
                            formData.satisfactionRating === 2 ? 'Fair' :
                                formData.satisfactionRating === 3 ? 'Good' :
                                    formData.satisfactionRating === 4 ? 'Very Good' : 'Excellent'}
                </p>
            </div>

            <div className="form-group">
                <div className="toggle-container">
                    <label htmlFor="newsletter" className="form-label">
                        Subscribe to Newsletter
                    </label>
                    <div
                        onClick={() => {
                            handleChange({
                                target: {
                                    name: 'newsletter',
                                    value: !formData.newsletter
                                }
                            });
                        }}
                        className={`toggle-switch ${formData.newsletter ? 'active' : ''}`}
                    >
                        <span className="toggle-slider"></span>
                    </div>
                </div>
            </div>

            <div className="form-group">
                <label className="checkbox-label terms-label">
                    <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className={errors.agreeTerms ? 'error-checkbox' : ''}
                    />
                    I agree to the Terms and Conditions*
                </label>
                {errors.agreeTerms && (
                    <p className="error-message">
                        <AlertCircle className="error-icon" />
                        {errors.agreeTerms}
                    </p>
                )}
            </div>
        </div>
    );
};

const SummaryStep = ({ formData }) => {
    return (
        <div className="summary-container">
            <div className="success-icon">
                <CheckCircle2 className="check-icon" />
            </div>
            <h2 className="summary-title">Registration Complete!</h2>
            <p className="summary-subtitle">Thank you for providing your information.</p>

            <div className="summary-card">
                <h3 className="summary-section-title">Summary</h3>

                <div className="summary-content">
                    <div className="summary-section">
                        <h4 className="summary-heading">Personal Information</h4>
                        <p>Name: {formData.firstName} {formData.lastName}</p>
                        <p>Username: @{formData.username}</p>
                        <p>Date of Birth: {formData.dob}</p>
                        <p>Gender: {formData.gender}</p>
                        {formData.bio && <p>Bio: {formData.bio.substring(0, 100)}{formData.bio.length > 100 ? '...' : ''}</p>}
                    </div>

                    <div className="summary-section">
                        <h4 className="summary-heading">Contact Information</h4>
                        <p>Email: {formData.email}</p>
                        <p>Phone: {formData.phone}</p>
                        {formData.preferredTime && formData.timezone &&
                            <p>Preferred Contact Time: {formData.preferredTime} ({formData.timezone})</p>
                        }
                        <p>Country: {formData.country}</p>
                        {formData.city && <p>City: {formData.city}</p>}
                        <p>Address: {formData.address}</p>
                        <p>Zip Code: {formData.zipCode}</p>
                    </div>

                    <div className="summary-section">
                        <h4 className="summary-heading">Preferences</h4>
                        <p>Interests: {formData.interests.join(', ')}</p>
                        <p>Preferred Contact: {formData.preferredContact}</p>
                        <p>Communication Frequency: {formData.frequency}/5</p>
                        {formData.themeColor &&
                            <div className="color-display">
                                <span>Theme Color: </span>
                                <div
                                    className="color-swatch"
                                    style={{ backgroundColor: formData.themeColor }}
                                ></div>
                                <span className="color-code">{formData.themeColor}</span>
                            </div>
                        }
                        {formData.experienceLevel &&
                            <p>Experience Level: {
                                formData.experienceLevel === 1 ? 'Beginner' :
                                    formData.experienceLevel === 2 ? 'Novice' :
                                        formData.experienceLevel === 3 ? 'Intermediate' :
                                            formData.experienceLevel === 4 ? 'Advanced' : 'Expert'
                            }</p>
                        }
                        {formData.skills.length > 0 &&
                            <div className="skills-section">
                                <p>Skills:</p>
                                <div className="skills-tags">
                                    {formData.skills.map(skill => (
                                        <span key={skill} className="skill-tag">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        }
                        {formData.satisfactionRating > 0 &&
                            <p>Satisfaction Rating: {formData.satisfactionRating}/5</p>
                        }
                        <p>Newsletter: {formData.newsletter ? 'Subscribed' : 'Not subscribed'}</p>
                    </div>
                </div>
            </div>

            <div className="next-steps">
                <h4 className="next-steps-title">What happens next?</h4>
                <ul className="steps-list">
                    <li className="step-item">
                        <span className="step-number">1.</span>
                        <span>You'll receive a confirmation email at {formData.email}</span>
                    </li>
                    <li className="step-item">
                        <span className="step-number">2.</span>
                        <span>Our team will review your information</span>
                    </li>
                    <li className="step-item">
                        <span className="step-number">3.</span>
                        <span>We'll contact you via your preferred method ({formData.preferredContact})</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

// Main Form Component
const MultiStepForm = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const [formData, setFormData] = useState({
        // Personal Information
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        dob: '',
        gender: '',
        profilePhoto: null,
        profilePhotoPreview: null,
        bio: '',

        // Contact Information
        email: '',
        phone: '',
        preferredTime: '',
        timezone: '',
        country: '',
        address: '',
        city: '',
        zipCode: '',
        location: null,

        // Preferences
        interests: [],
        themeColor: '#3b82f6',
        experienceLevel: 3,
        skills: [],
        preferredContact: '',
        frequency: 3,
        satisfactionRating: 0,
        newsletter: false,
        agreeTerms: false
    });

    const [errors, setErrors] = useState({});

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            if (name === 'agreeTerms' || name === 'newsletter') {
                setFormData({
                    ...formData,
                    [name]: checked
                });
            } else if (name === 'interests') {
                let updatedInterests = [...formData.interests];
                if (checked) {
                    updatedInterests.push(value);
                } else {
                    updatedInterests = updatedInterests.filter(interest => interest !== value);
                }
                setFormData({
                    ...formData,
                    interests: updatedInterests
                });
            }
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }

        // Clear error when field is modified
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    // Validation functions
    const validatePersonalInfo = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        } else if (formData.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (!formData.dob) {
            newErrors.dob = 'Date of birth is required';
        } else {
            const birthDate = new Date(formData.dob);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            if (age < 18) {
                newErrors.dob = 'You must be at least 18 years old';
            }
        }

        if (!formData.gender) {
            newErrors.gender = 'Please select your gender';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateContactInfo = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        if (!formData.country.trim()) {
            newErrors.country = 'Country is required';
        }

        if (!formData.city?.trim()) {
            newErrors.city = 'City is required';
        }

        if (!formData.zipCode.trim()) {
            newErrors.zipCode = 'Zip code is required';
        } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
            newErrors.zipCode = 'Please enter a valid zip code';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validatePreferences = () => {
        const newErrors = {};

        if (formData.interests.length === 0) {
            newErrors.interests = 'Please select at least one interest';
        }

        if (!formData.preferredContact) {
            newErrors.preferredContact = 'Please select a preferred contact method';
        }

        if (!formData.agreeTerms) {
            newErrors.agreeTerms = 'You must agree to the terms and conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Navigation functions
    const nextStep = () => {
        let isValid = false;

        switch (currentStep) {
            case 0:
                isValid = validatePersonalInfo();
                break;
            case 1:
                isValid = validateContactInfo();
                break;
            case 2:
                isValid = validatePreferences();
                break;
            default:
                isValid = true;
        }

        if (isValid) {
            setCurrentStep(currentStep + 1);
            window.scrollTo(0, 0);
        }
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
        window.scrollTo(0, 0);
    };

    // Render form steps
    const renderFormStep = () => {
        switch (currentStep) {
            case 0:
                return <PersonalInfoStep formData={formData} errors={errors} handleChange={handleChange} />;
            case 1:
                return <ContactInfoStep formData={formData} errors={errors} handleChange={handleChange} />;
            case 2:
                return <PreferencesStep formData={formData} errors={errors} handleChange={handleChange} />;
            case 3:
                return <SummaryStep formData={formData} />;
            default:
                return null;
        }
    };

    return (
        <div className="form-container">
            {/* Progress bar */}
            {currentStep < 3 && (
                <div className="progress-container">
                    <div className="progress-labels">
                        <span className="progress-label">Personal</span>
                        <span className="progress-label">Contact</span>
                        <span className="progress-label">Preferences</span>
                    </div>
                    <div className="progress-bar-bg">
                        <div
                            className="progress-bar-fill"
                            style={{ width: `${((currentStep + 1) / 3) * 100}%` }}
                        ></div>
                    </div>
                </div>
            )}

            {/* Form */}
            <div className="form-card">
                {renderFormStep()}
            </div>

            {/* Navigation buttons */}
            {currentStep < 3 ? (
                <div className="form-nav">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className={`nav-button prev ${currentStep === 0 ? 'disabled' : ''}`}
                    >
                        <ArrowLeft className="button-icon" />
                        Previous
                    </button>
                    <button
                        onClick={nextStep}
                        className="nav-button next"
                    >
                        {currentStep === 2 ? 'Submit' : 'Next'}
                        <ArrowRight className="button-icon" />
                    </button>
                </div>
            ) : (
                <div className="form-nav-center">
                    <button
                        onClick={() => {
                            setCurrentStep(0);
                            setFormData({
                                // Personal Information
                                firstName: '',
                                lastName: '',
                                username: '',
                                password: '',
                                dob: '',
                                gender: '',
                                profilePhoto: null,
                                profilePhotoPreview: null,
                                bio: '',

                                // Contact Information
                                email: '',
                                phone: '',
                                preferredTime: '',
                                timezone: '',
                                country: '',
                                address: '',
                                city: '',
                                zipCode: '',
                                location: null,

                                // Preferences
                                interests: [],
                                themeColor: '#3b82f6',
                                experienceLevel: 3,
                                skills: [],
                                preferredContact: '',
                                frequency: 3,
                                satisfactionRating: 0,
                                newsletter: false,
                                agreeTerms: false
                            });
                            setErrors({});
                        }}
                        className="restart-button"
                    >
                        Start Over
                    </button>
                </div>
            )}
        </div>
    );
};

export default MultiStepForm;