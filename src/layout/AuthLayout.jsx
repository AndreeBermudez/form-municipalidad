export const AuthLayout = ({ children }) => {
    return (
      <div className='min-h-screen grid lg:grid-cols-2'>
        {children}
      </div>
    );
  };