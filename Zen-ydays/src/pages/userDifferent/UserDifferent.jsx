import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UserDifferent = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        setUserData(userData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    if (userData) {
      console.log('User data:', userData);
    }
  }, [userData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>Failed to load user data</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>Display Name: {userData.displayName}</p>
      <p>Followers: {userData.followers}</p>
      <p>Following: {userData.following}</p>
    </div>
  );
};

export default UserDifferent;
