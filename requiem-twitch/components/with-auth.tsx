import AuthForm from "./(browser)/_components/AuthForm/AuthForm";

const withAuth = Component => {
    const Auth = (props) => {
      const { isLoggedIn } = props;
      if (!isLoggedIn) {
        return (
          <AuthForm form={"login"}/>
        );
      }
  
      // If user is logged in, return original component
      return (
        <Component {...props} />
      );
    };
  
    // Copy getInitial props so it will run as well
    if (Component.getInitialProps) {
      Auth.getInitialProps = Component.getInitialProps;
    }
  
    return Auth;
  };
  
  export default withAuth;