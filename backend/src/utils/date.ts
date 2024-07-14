export const oneYearFromNow =() =>
    new Date(Date.now() + 31536000000); // 1 year from now in milliseconds

export const thirtyDaysFromNow =() => 
    new Date(Date.now() + 2592000000); // 30 days from now in milliseconds

export const fifteenMinutesFromNow =() =>
    new Date(Date.now() + 9000000); // 15 days from now in milliseconds

// src\utils\date.utils.ts
// src\routes\auth.routes.ts