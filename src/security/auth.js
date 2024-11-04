// Auth.js
const Auth = {
    isAuthenticated() {
        const token = localStorage.getItem("gms-token");
        if(token != null) return true;
        return false;
    },
    userRole: 'student',      // Possible roles: 'admin', 'user', 'guest'
  };
  
  export default Auth;
  