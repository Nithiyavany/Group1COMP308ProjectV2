import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const SIGNUP_MUTATION = gql`
  mutation Signup($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    signup(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      patient {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

const SignupForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION);

  const handleSignup = async () => {
    try {
      const { data } = await signup({
        variables: { firstName, lastName, email, password }
      });
      console.log(data); // Log the response data
      // Optionally, you can redirect the user to a new page after successful signup
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Patient Sign Up</h2>
      <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup} disabled={loading}>Sign Up</button>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default SignupForm;