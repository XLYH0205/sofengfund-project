import { LogOut } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authUser';
import { set } from 'mongoose';
import toast from 'react-hot-toast';
import axios from 'axios';

const DiscoverPage = () => {
  const { role, logout } = useAuthStore();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getAllRecipes = async () => {
      try {
        const response = await axios.get("/api/v1/recipe/all");
        
        setRecipes(response.data.data);
      } catch (error) {
        console.log("Error in getAllRecipes DiscoverPage", error);
        toast.error(error.response.message);
      }
    };
    getAllRecipes();
    
  }, []);
  console.log("recipes: ", recipes);

  return (
    <div>
      <h1>DiscoverPage</h1>
      {
        role ?
          <Link to="/"><LogOut className='size-6 cursor-pointer' onClick={logout} /></Link>
          : null
      }
    </div>

  )
}

export default DiscoverPage