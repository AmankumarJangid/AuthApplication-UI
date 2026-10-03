import { handleLoginWithGithub, handleLoginWithGoogle } from "@/utils/handleAuthRequeset";
import { useEffect } from "react";

export function AuthInterceptor({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      // Find the closest button element to handle cases where the SVG or text is clicked
      const button = (event.target as HTMLElement).closest("button");
      
      if (!button) return;

      // Extract and clean the text content inside the button
      const buttonText = button.textContent?.trim().toLowerCase() || "";

      if (buttonText.includes("continue with github")) {
        // Prevent default form submissions if the button is inside a form
        event.preventDefault(); 
        console.log("GitHub Login Intercepted!");
        
        handleLoginWithGithub(window.location.href);
        // --- Place your GitHub auth request here ---
        // example: signIn("github") or window.location.href = "/api/auth/github"

      } else if (buttonText.includes("continue with google")) {
        event.preventDefault();
        console.log("Google Login Intercepted!");

        handleLoginWithGoogle(window.location.href);
        // --- Place your Google auth request here ---
        // example: signIn("google") or window.location.href = "/api/auth/google"
      }
    };

    // Attach listener to the window object to catch all clicks globally
    window.addEventListener("click", handleGlobalClick, true);

    return () => {
      // Clean up listener when component unmounts
      window.removeEventListener("click", handleGlobalClick, true);
    };
  }, []);

  return <>{children}</>;
}
