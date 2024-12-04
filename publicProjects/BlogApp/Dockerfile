# Step 1: Start with the official Node.js image
FROM node:16

# Step 2: Set the working directory inside the container
WORKDIR /BlogApp

# Step 3: Copy package.json and package-lock.json (if you have it) into the container
COPY package*.json ./

# Step 4: Install dependencies inside the container
RUN npm install

# Step 5: Copy the rest of your app's files into the container
COPY . .

# Step 6: Expose port 3001 so the app can be accessed outside the container
EXPOSE 3001

# Step 7: Command to run your application when the container starts
CMD ["npm", "start"]