const Button = ({ label, onClick, type = "button", variant = "primary", className = "" }) => {
   
    const baseStyles = "px-6 py-2 rounded transition duration-300 ease-in-out";
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "border border-gray-300 text-gray-700 hover:bg-gray-50",
    };
  
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {label}
      </button>
    );
  };
  
  export default Button;
  