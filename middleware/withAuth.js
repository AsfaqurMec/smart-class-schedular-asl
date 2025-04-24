"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react'; // Or your own session logic
import toast, { Toaster } from 'react-hot-toast';


const withAuth = (WrappedComponent, allowedRoles) => {
  const Auth = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true); // To handle the loading state
    const [isAuthorized, setIsAuthorized] = useState(false); // To track authorization
    useEffect(() => {
      const checkAuthorization = async () => {
        const session = await getSession(); // Fetch session data
        // console.log('sss',session);
         
        if (!session) {
          //alert('You need to log in first!'); 
          toast.error('You need to log in first!');
          router.push('/login'); // Redirect to login if no session
          return;
        }

        const userRole = session?.user?.role; // Assuming role is stored in session data
        if (allowedRoles.includes(userRole)) {
         // alert('Unauthorized access!');
          setIsAuthorized(true); // User is authorized
          //router.push('/login'); // Redirect to login if unauthorized
          //toast.success("welcome to dashboard")
        } else {
            //alert('Unauthorized access!');
            toast.error('Unauthorized access!');
            router.push('/login'); // Redirect to login if unauthorized
          }
          setLoading(false); // Finished loading
      };

      checkAuthorization();
    }, [router]);

    //Show loading spinner or message while session is being checked
    if (loading) {
      return <div>Loading...</div>; // You can replace this with a spinner
    }

    // Render the component only if the user is authorized
    return isAuthorized ? (
        <>
          
          <WrappedComponent {...props} />
        </>
      ) : null;
    
  };

  
  return Auth;
};

export default withAuth;
