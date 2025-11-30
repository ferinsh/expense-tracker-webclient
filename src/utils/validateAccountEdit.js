export function validateAccountEdit (data) {
    console.log("data: ", data)
    let errorStatus = false; // True if error exists
    const errors = {
        username: [],
        email: [],
    };

    if(!data.username || data.username.trim().length <= 3) {
        errors.username.push("Username must be longer than 3 characters");
        errors.username.push("Username must be longer than 3 characters");
        errorStatus = true;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        errors.email.push("Invalid email format");
        errorStatus = true;
    }
    console.log("Validation complete");
    return {errors, errorStatus};
}