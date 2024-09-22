import { verify } from "hono/jwt";

export async function authMiddleware(c: any, next: any) {


    // Retrieve the authorization header
    const header = c.req.header("authorization") || "";
    
    // Check if the token is provided and properly formatted
    if (!header || !header.startsWith("Bearer ")) {
        c.status(401);
        return c.json({ error: "Authorization header missing or invalid" });
    }

    // Extract the token
    const token = header.split(" ")[1];
    console.log("JWT Token:", token);

    try {
        // Verify the token
        const response = await verify(token, c.env.secret);
        console.log(response)
        // Check if the response contains a valid id (indicating successful verification)
        if (response.id) {
            c.set('userId', response.id);
            await next(); 
          // Proceed to the next middleware or route handler
        } else {
            c.status(403);
            return c.json({ error: "Unauthorized" });
        }

    } catch (error) {
        // Handle verification errors
        console.error("JWT verification error:", error);
        c.status(403);
        return c.json({ error: "Invalid JWT token" });
    }
}
