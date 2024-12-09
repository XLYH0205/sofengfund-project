import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddRecipePage = () => {
    const [formData, setFormData] = useState({
        title: '',
        image: null,
        ingredients: [],
        instructions: [],
        tags: [],
        cookingHour: '',
        servings: ''
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData({ ...formData, image: files[0] }); 
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleIngredientChange = (index, field, value) => {
        const newIngredients = [...formData.ingredients];
        newIngredients[index] = { ...newIngredients[index], [field]: value };
        setFormData({ ...formData, ingredients: newIngredients });
    };

    const addIngredient = () => {
        setFormData({ ...formData, ingredients: [...formData.ingredients, { name: '', quantity: '', unit: '' }] });
    };

    const removeIngredient = (index) => {
        const newIngredients = formData.ingredients.filter((_, i) => i !== index);
        setFormData({ ...formData, ingredients: newIngredients });
    };

    const handleInstructionChange = (index, value) => {
        const newInstructions = [...formData.instructions];
        newInstructions[index] = value;
        setFormData({ ...formData, instructions: newInstructions });
    };

    const addInstruction = () => {
        setFormData({ ...formData, instructions: [...formData.instructions, ''] });
    };

    const removeInstruction = (index) => {
        const newInstructions = formData.instructions.filter((_, i) => i !== index);
        setFormData({ ...formData, instructions: newInstructions });
    };

    const handleTagChange = (index, value) => {
        const newTags = [...formData.tags];
        newTags[index] = value;
        setFormData({ ...formData, tags: newTags });
    };

    const addTag = () => {
        setFormData({ ...formData, tags: [...formData.tags, ''] });
    };

    const removeTag = (index) => {
        const newTags = formData.tags.filter((_, i) => i !== index);
        setFormData({ ...formData, tags: newTags });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        for (const key in formData) {
            if (Array.isArray(formData[key])) {
                formData[key].forEach((item, index) => {
                    if (typeof item === 'object') {
                        for (const subKey in item) {
                            data.append(`${key}[${index}][${subKey}]`, item[subKey]);
                        }
                    } else {
                        data.append(`${key}[${index}]`, item);
                    }
                });
            } else {
                data.append(key, formData[key]);
            }
        }

        try {
            const response = await axios.post('/api/v1/recipe/', data);
            toast.success("Recipe created successfully.");
            console.log(response);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Upload Recipe</h1>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-4">
                        <input
                            type="text"
                            name="title"
                            placeholder="Recipe Title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    {/* Ingredients Section */}
                    <h2 className="text-lg font-bold mb-2">Ingredients</h2>
                    {formData.ingredients.map((ingredient, index) => (
                        <div key={index} className="flex mb-2">
                            <input
                                type="text"
                                placeholder="Name"
                                value={ingredient.name}
                                onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                                className="w-1/3 p-2 border border-gray-300 rounded mr-2"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Quantity"
                                value={ingredient.quantity}
                                onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                                className="w-1/3 p-2 border border-gray-300 rounded mr-2"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Unit"
                                value={ingredient.unit}
                                onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                                className="w-1/3 p-2 border border-gray-300 rounded"
                                required
                            />
                            <button type="button" onClick={() => removeIngredient(index)} className="ml-2 text-red-500">Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={addIngredient} className="mb-4 bg-blue-500 text-white p-2 rounded">Add Ingredient</button>

                    {/* Instructions Section */}
                    <h2 className="text-lg font-bold mb-2">Instructions</h2>
                    {formData.instructions.map((instruction, index) => (
                        <div key={index} className="flex mb-2">
                            <input
                                type="text"
                                placeholder="Instruction"
                                value={instruction}
                                onChange={(e) => handleInstructionChange(index, e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mr-2"
                                required
                            />
                            <button type="button" onClick={() => removeInstruction(index)} className="ml-2 text-red-500">Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={addInstruction} className="mb-4 bg-blue-500 text-white p-2 rounded">Add Instruction</button>

                    {/* Tags Section */}
                    <h2 className="text-lg font-bold mb-2">Tags</h2>
                    {formData.tags.map((tag, index) => (
                        <div key={index} className="flex mb-2">
                            <input
                                type="text"
                                placeholder="Tag"
                                value={tag}
                                onChange={(e) => handleTagChange(index, e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mr-2"
                                required
                            />
                            <button type="button" onClick={() => removeTag(index)} className="ml-2 text-red-500">Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={addTag} className="mb-4 bg-blue-500 text-white p-2 rounded">Add Tag</button>

                    <div className="mb-4">
                        <input
                            type="number"
                            name="cookingHour"
                            placeholder="Cooking Hour"
                            value={formData.cookingHour}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="number"
                            name="servings"
                            placeholder="Servings"
                            value={formData.servings}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                        Create Recipe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddRecipePage;