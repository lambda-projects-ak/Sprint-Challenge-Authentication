### What is the purpose of using sessions?

- Sessions are a method of authentication and authorization which allow users to login and access user specific information. Session data is stored on the server - it’s a server side authentication. The client side does not have to send verification data with their requests.

### What does bcrypt do to help us store passwords in a secure manner.

- Bcrpt uses a hashing algorithm to secure variables. It’s a one way cryptographic method that that stores the password in a new output with layered secrets. This means the original data is stored in the hash, but difficult to access.

### What does bcrypt do to slow down attackers?

- It introduces the time variable, meaning it hashes many times so an attacker will not know how many times a variable (likely a password) has been hashed.

### What are the three parts of the JSON Web Token?

- Header (options for encoding), payload (information/data), signature (used to verify permissions).
